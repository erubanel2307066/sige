import React from 'react';
import Header from '../components/layout/Header';
import { BookOpen, Clock, GraduationCap, Settings } from 'lucide-react';
import { GROUPS_DB, SCHEDULE } from '../utils/constants';
import { getCurrentDayInfo } from '../utils/dateFormats';

const Dashboard = ({ onSelectGroup, onSignOut, onOpenAdmin }) => {
    const { dayIndex, dayName } = getCurrentDayInfo();
    const todaysClasses = SCHEDULE[dayIndex] || [];

    return (
        <div className="bg-[#f4f6f8] min-h-screen pb-10 text-left">
            <Header onSignOut={onSignOut} />

            {/* Banner de Bienvenida */}
            <div className="bg-gradient-to-br from-[#0D47A1] via-[#1976D2] to-[#26C6DA] px-6 pb-12 pt-6 rounded-b-[40px] shadow-inner relative overflow-hidden -mt-1">
                <div className="absolute right-0 top-0 opacity-20 transform translate-x-1/4 -translate-y-1/4">
                    <GraduationCap size={140} color="white" />
                </div>
                <div className="absolute left-[-30px] top-10 h-24 w-24 rounded-full bg-[#43A047]/15 blur-2xl" />
                <div className="relative z-10 flex flex-col gap-4">
                    <div className="absolute right-4 top-4">
                        <button
                            type="button"
                            onClick={onOpenAdmin}
                            className="inline-flex items-center justify-center rounded-2xl bg-white/15 px-3 py-3 text-white transition hover:bg-white/20"
                            aria-label="Ir a Configuración del Ciclo"
                        >
                            <Settings size={20} />
                        </button>
                    </div>
                    <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-3 text-white shadow-lg shadow-slate-900/10 backdrop-blur-sm border border-white/20 w-fit">
                        <img src="/sige_vertical.png" alt="SIGE Logo" className="h-20 w-auto" />
                        <div className="text-left">
                            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/80">SIGE</p>
                            <p className="text-sm font-bold text-white">Gestión Escolar</p>
                        </div>
                    </div>
                    <p className="text-[#ECEFF1] text-xs font-bold uppercase tracking-[0.35em]">Panel del Docente</p>
                    <h2 className="text-2xl font-black text-white leading-tight">¡Buen día, Profe!</h2>
                    <div className="flex items-center gap-2 mt-4 text-white/90 bg-black/20 w-fit px-4 py-2 rounded-full backdrop-blur-sm text-[13px] font-semibold border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-[#43A047] animate-pulse"></span>
                        <span>{dayName} • Horario Activo</span>
                    </div>
                </div>
            </div>

            <div className="px-5 -mt-6 relative z-20 space-y-4">
                <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[3px] ml-1">Mis Grupos de Hoy</h3>

                {todaysClasses.length > 0 ? (
                    todaysClasses.map((cls, index) => {
                        const groupInfo = GROUPS_DB[cls.groupId];
                        return (
                            <div
                                key={index}
                                onClick={() => onSelectGroup(groupInfo)}
                                className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col active:scale-[0.98] transition-all cursor-pointer"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#691C32]/10 flex items-center justify-center">
                                            <BookOpen className="text-[#691C32]" size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-gray-800 leading-none">{groupInfo.name}</h2>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Tecnología • {groupInfo.count} Alumnos</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100">
                                    <Clock size={16} className="text-[#BC955C]" />
                                    <span className="text-sm font-black text-gray-600 uppercase tracking-tight">{cls.time} hr</span>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center p-12 bg-white rounded-3xl shadow-sm border border-gray-100 italic text-gray-400 font-bold">
                        No hay clases programadas.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
