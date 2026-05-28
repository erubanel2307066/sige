import * as XLSX from 'xlsx';
import { getStudentHistory } from './studentsApi';
import { calculateAttendanceScore, calculateTasksScore, calculateObservationScore, calculateFinalProjectedGrade } from '../utils/gradeCalculator';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

/**
 * Exporta un concentrado de calificaciones a Excel.
 * @param {string|number} grupoId
 * @param {Array} alumnosData - arreglo de alumnos con al menos { id, name, listNum }
 * @param {Object} historialData - opcional, mapa { alumnoId: { bitacora, conducta } }
 */
export const exportGroupToExcel = async (grupoId, alumnosData = [], historialData = {}) => {
    try {
        const rows = [];

        for (const alumno of alumnosData) {
            const id = alumno.id;

            let history = historialData && historialData[id] ? historialData[id] : null;
            if (!history) {
                // Si no se proveyó historial, lo solicitamos por alumno
                history = await getStudentHistory(id);
            }

            const bitacora = history.bitacora || [];
            const conducta = history.conducta || [];

            const totalClasses = bitacora.length;
            const attendedClasses = bitacora.filter(b => b.asistencia === true || b.asistencia === 'presente' || b.asistencia === 'Presente' || b.asistencia === 'P' || b.asistencia === 1 || b.asistencia === '1').length;
            const attendanceScore = calculateAttendanceScore(attendedClasses, totalClasses);

            const deliveredTasks = bitacora.filter(b => b.entrega_practica === true || b.entrega_practica === '1' || b.entrega_practica === 1).length;
            const tasksScore = calculateTasksScore(deliveredTasks, totalClasses);

            const behaviorTags = conducta.map(c => c.tag_id);
            const observationScore = calculateObservationScore(behaviorTags);

            const finalProjected = calculateFinalProjectedGrade(attendanceScore, tasksScore, observationScore);

            rows.push({
                'No. Lista': alumno.listNum ?? alumno.listNumber ?? '',
                'Nombre del Alumno': alumno.name ?? alumno.nombre_completo ?? '',
                'Asistencia (10)': attendanceScore,
                'Prácticas (10)': tasksScore,
                'Guía de Observación (10)': observationScore,
                'Promedio Final': finalProjected
            });
        }

        const header = ['No. Lista','Nombre del Alumno','Asistencia (10)','Prácticas (10)','Guía de Observación (10)','Promedio Final'];
        const ws = XLSX.utils.json_to_sheet(rows, { header });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Calificaciones');

        // Nombre de archivo solicitado por control administrativo
        const fileName = `Calificaciones_1D_Computacion.xlsx`;
        XLSX.writeFile(wb, fileName);

        return { ok: true, fileName };
    } catch (error) {
        console.error('[exportGroupToExcel] Error:', error);
        return { ok: false, error };
    }
};

export default { exportGroupToExcel };

/**
 * Genera el acta oficial en PDF para un grupo.
 * @param {string|number} grupoId
 * @param {Array} alumnosData
 * @param {Object} historialData
 */
export const exportGroupToPDF = async (grupoId, alumnosData = [], historialData = {}) => {
    try {
        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();

        // Title
        doc.setFontSize(14);
        doc.setTextColor('#691C32');
        doc.setFont('helvetica', 'bold');
        doc.text('ESCUELA SECUNDARIA GENERAL MIGUEL HIDALGO Y COSTILLA', pageWidth / 2, 60, { align: 'center' });

        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.setFont('helvetica', 'normal');
        doc.text('ACTA DE CALIFICACIONES TRIMESTRALES - TECNOLOGÍA COMPUTACIÓN', pageWidth / 2, 82, { align: 'center' });

        // Technical info
        doc.setFontSize(10);
        doc.text(`Grupo: ${grupoId || ''}    Trimestre: Primero    Docente: Prof. Erubanel Gallo Casiano`, pageWidth / 2, 104, { align: 'center' });

        // Build table rows
        const body = [];

        for (const alumno of alumnosData) {
            const id = alumno.id;
            let history = historialData && historialData[id] ? historialData[id] : null;
            if (!history) history = await getStudentHistory(id);

            const bitacora = history.bitacora || [];
            const conducta = history.conducta || [];

            const totalClasses = bitacora.length;
            const attendedClasses = bitacora.filter(b => b.asistencia === true || b.asistencia === 'presente' || b.asistencia === 'Presente' || b.asistencia === 'P' || b.asistencia === 1 || b.asistencia === '1').length;
            const attendanceScore = calculateAttendanceScore(attendedClasses, totalClasses);

            const deliveredTasks = bitacora.filter(b => b.entrega_practica === true || b.entrega_practica === '1' || b.entrega_practica === 1).length;
            const tasksScore = calculateTasksScore(deliveredTasks, totalClasses);

            const behaviorTags = conducta.map(c => c.tag_id);
            const observationScore = calculateObservationScore(behaviorTags);

            const finalProjected = calculateFinalProjectedGrade(attendanceScore, tasksScore, observationScore);

            // Estatus
            let status = '';
            if (finalProjected >= 8.0) status = 'Óptimo';
            else if (finalProjected >= 7.0) status = 'Requiere Atención';
            else status = 'En Riesgo';

            body.push([
                alumno.listNum ?? alumno.listNumber ?? '',
                alumno.name ?? alumno.nombre_completo ?? '',
                attendanceScore.toFixed(1),
                tasksScore.toFixed(1),
                observationScore.toFixed(1),
                finalProjected.toFixed(1),
                status
            ]);
        }

        // Table header
        const head = [[
            { content: 'No.', styles: { halign: 'center', fillColor: '#691C32', textColor: '#FFFFFF' } },
            { content: 'Nombre del Alumno', styles: { fillColor: '#691C32', textColor: '#FFFFFF' } },
            { content: 'Asistencia', styles: { halign: 'center', fillColor: '#691C32', textColor: '#FFFFFF' } },
            { content: 'Prácticas', styles: { halign: 'center', fillColor: '#691C32', textColor: '#FFFFFF' } },
            { content: 'Observación', styles: { halign: 'center', fillColor: '#691C32', textColor: '#FFFFFF' } },
            { content: 'Promedio Final', styles: { halign: 'center', fillColor: '#691C32', textColor: '#FFFFFF' } },
            { content: 'Estatus', styles: { halign: 'center', fillColor: '#691C32', textColor: '#FFFFFF' } }
        ]];

        // AutoTable
        doc.autoTable({
            head: head,
            body: body,
            startY: 130,
            styles: { font: 'helvetica', fontSize: 9 },
            headStyles: { fillColor: '#691C32', textColor: '#FFFFFF' },
            columnStyles: {
                0: { cellWidth: 30 },
                1: { cellWidth: 200 },
                2: { cellWidth: 60 },
                3: { cellWidth: 60 },
                4: { cellWidth: 80 },
                5: { cellWidth: 70 },
                6: { cellWidth: 80 }
            },
            didDrawPage: function (data) {
                // footer or additional per-page drawing can be added here
            }
        });

        // Signatures
        const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 40 : 700;
        const sigX = 40;
        const sigWidth = (pageWidth - 80) / 3;

        doc.setFontSize(10);
        // Sello
        doc.line(sigX, finalY, sigX + sigWidth, finalY);
        doc.text('Sello de la Institución', sigX + 10, finalY + 16);

        // Docente
        const docenteX = sigX + sigWidth + 20;
        doc.line(docenteX, finalY, docenteX + sigWidth, finalY);
        doc.text('Firma Docente', docenteX + 10, finalY + 16);

        // Director
        const dirX = docenteX + sigWidth + 20;
        doc.line(dirX, finalY, dirX + sigWidth, finalY);
        doc.text('Firma Director(a)', dirX + 10, finalY + 16);

        // Save PDF
        const fileName = `Acta_Calificaciones_1D_Computacion.pdf`;
        doc.save(fileName);

        return { ok: true, fileName };
    } catch (error) {
        console.error('[exportGroupToPDF] Error:', error);
        return { ok: false, error };
    }
};

