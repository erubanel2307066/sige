import React, { useEffect, useState } from 'react';
import { ChevronLeft, Download, AlertCircle, CheckCircle, HelpCircle, Activity, FileText, ClipboardList } from 'lucide-react';
import Header from '../components/layout/Header';
import { getStudentHistory } from '../services/studentsApi';
import { calculateAttendanceScore, calculateTasksScore, calculateObservationScore, calculateFinalProjectedGrade, getStudentStatus } from '../utils/gradeCalculator';
const StudentProfile = ({ student: studentProp, onBack, onSignOut }) => {
    const student = studentProp || null;
    const alumnoId = student?.id || null;

    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ attendance: 0, tasks: 0, conduct: 10.0, status: 'good', final: 10.0 });
    const [timeline, setTimeline] = useState([]);

    useEffect(() => {
        const load = async () => {
            if (!alumnoId) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const { bitacora, conducta } = await getStudentHistory(alumnoId);

                // Attendance: contar asistencias
                const totalClasses = bitacora.length;
                const attendedClasses = bitacora.filter(b => b.asistencia === true || b.asistencia === 'presente' || b.asistencia === 'Presente' || b.asistencia === 'P' || b.asistencia === 1 || b.asistencia === '1').length;
                const attendanceScore = calculateAttendanceScore(attendedClasses, totalClasses); // 0-10

                // Tasks
                const deliveredTasks = bitacora.filter(b => b.entrega_practica === true || b.entrega_practica === '1' || b.entrega_practica === 1).length;
                const tasksScore = calculateTasksScore(deliveredTasks, totalClasses);

                // Observation / Conducta
                const behaviorTags = conducta.map(c => c.tag_id);
                const observationScore = calculateObservationScore(behaviorTags);

                // Final projection
                const finalProjected = calculateFinalProjectedGrade(attendanceScore, tasksScore, observationScore);
                const status = getStudentStatus(finalProjected);

                // Convert to percentages for progress bars (0-100)
                const attendancePercent = Math.min(100, Math.round(attendanceScore * 10));
                const tasksPercent = Math.min(100, Math.round(tasksScore * 10));

                setStats({ attendance: attendancePercent, tasks: tasksPercent, conduct: observationScore, status, final: finalProjected });

                // Build timeline from both sources (most recent first)
                const timelineItems = [];
                bitacora.forEach(b => {
                    const date = b.fecha ? new Date(b.fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' }) : '';
                    if (b.notas) {
                        timelineItems.push({ date, type: 'Nota', content: b.notas, icon: '📝', rawDate: b.fecha });
                    }
                    if (b.asistencia === false || b.asistencia === 'ausente' || b.asistencia === 'Ausente') {
                        timelineItems.push({ date, type: 'Asistencia', content: 'Ausencia registrada', icon: '⛔', rawDate: b.fecha });
                    } else if (b.asistencia === true || b.asistencia === 'presente' || b.asistencia === 'P') {
                        // only push late or special notes if present
                        if (b.notas && b.notas.toLowerCase().includes('tarde')) {
                            timelineItems.push({ date, type: 'Asistencia', content: b.notas, icon: '⏰', rawDate: b.fecha });
                        }
                    }
                    if (b.entrega_practica) {
                        timelineItems.push({ date, type: 'Práctica', content: 'Práctica entregada', icon: '⭐', rawDate: b.fecha });
                    }
                });

                conducta.forEach(c => {
                    const date = c.fecha ? new Date(c.fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' }) : '';
                    const tag = c.tag_id;
                    let label = tag;
                    let icon = '🗣️';
                    if (tag === 'play') { label = 'Jugó en clase'; icon = '🎮'; }
                    else if (tag === 'talk') { label = 'Platicó en clase'; icon = '🗣️'; }
                    else if (tag === 'out') { label = 'Se salió sin permiso'; icon = '🏃'; }
                    else if (tag === 'lazy') { label = 'No trabajó'; icon = '💤'; }
                    else if (tag === 'star') { label = 'Trabajo destacado'; icon = '⭐'; }

                    timelineItems.push({ date, type: 'Conducta', content: label, icon, rawDate: c.fecha });
                });

                // sort by rawDate desc
                timelineItems.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
                setTimeline(timelineItems);

            } catch (err) {
                console.error('Error loading student history:', err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [alumnoId]);

    const statusConfig = {
        good: { label: 'Rendimiento Óptimo', color: 'bg-emerald-500', icon: <CheckCircle className="text-white" size={20} />, text: 'text-emerald-700' },
        warning: { label: 'Requiere Atención', color: 'bg-amber-500', icon: <HelpCircle className="text-white" size={20} />, text: 'text-amber-700' },
        danger: { label: 'En Riesgo Académico', color: 'bg-rose-500', icon: <AlertCircle className="text-white" size={20} />, text: 'text-rose-700' }
    };

    const currentStatus = statusConfig[stats.status || 'good'];

    return (
        <div className="bg-[#f4f6f8] min-h-screen pb-10 text-left">
            <Header
                title={student ? `LISTA #${student.listNum}` : 'EXPEDIENTE'}
                subtitle={student ? student.name : ''}
                showBack={true}
                onBack={onBack}
                onSignOut={onSignOut}
            />

            {/* Botón de Descarga Flotante/Header */}
            <div className="bg-[#691C32] px-4 pb-6 -mt-1 flex justify-end">
                <button className="flex items-center gap-2 bg-[#BC955C] text-[#691C32] px-5 py-2.5 rounded-xl font-black text-xs shadow-lg uppercase tracking-widest active:scale-95 transition-all">
                    <Download size={18} /> Descargar PDF
                </button>
            </div>

            <div className="p-5 space-y-6">

                {loading && (
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
                        <p className="text-[#691C32] font-black uppercase tracking-widest">Cargando expediente...</p>
                    </div>
                )}

                {/* 1. Semáforo de Estado */}
                <div className={`p-5 rounded-3xl ${currentStatus.color} shadow-lg shadow-black/10 flex items-center justify-between`}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                            {currentStatus.icon}
                        </div>
                        <div className="text-white">
                            <p className="text-[10px] font-black uppercase tracking-[2px] opacity-70">Estado Actual</p>
                            <h3 className="text-xl font-black italic">{currentStatus.label}</h3>
                        </div>
                    </div>
                    <Activity className="text-white/30" size={40} />
                </div>

                {/* 2. Proyección Trimestral (Estilo Excel Oficial) */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <ClipboardList className="text-[#691C32]" size={24} />
                        <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Evaluación Trimestral</h3>
                    </div>

                    <div className="space-y-6">
                        {/* Asistencias */}
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Asistencias</span>
                                <span className="text-lg font-black text-gray-800">{stats.attendance}%</span>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                                <div className="h-full bg-[#10b981] rounded-full" style={{ width: `${stats.attendance}%` }}></div>
                            </div>
                        </div>

                        {/* Prácticas */}
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Prácticas Entregadas</span>
                                <span className="text-lg font-black text-gray-800">{stats.tasks}%</span>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                                <div className="h-full bg-[#1e3a8a] rounded-full" style={{ width: `${stats.tasks}%` }}></div>
                            </div>
                        </div>

                        {/* Guía de Observación */}
                        <div className="pt-4 border-t border-dashed border-gray-200">
                            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Guía de Observación</p>
                                    <p className="text-xs text-rose-500 font-bold mt-0.5">-1.5 pts por conducta</p>
                                </div>
                                <div className="text-3xl font-black text-[#691C32]">
                                    {stats.conduct.toFixed(1)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Timeline de Incidentes */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <FileText className="text-[#691C32]" size={24} />
                        <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Bitácora del Alumno</h3>
                    </div>

                    <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                        {timeline.map((item, idx) => (
                            <div key={idx} className="relative">
                                <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#BC955C] z-10"></div>
                                <div className="flex items-start gap-4">
                                    <span className="text-xl">{item.icon}</span>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[10px] font-black text-[#691C32] uppercase tracking-wider">{item.type}</span>
                                            <span className="text-[10px] font-bold text-gray-400">{item.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StudentProfile;
