import React from 'react';
import { BookOpen, Clock, GraduationCap, Settings, Users2 } from 'lucide-react';
import { GROUPS_DB, SCHEDULE } from '../utils/constants';

const Dashboard = ({ onSelectGroup, onSignOut, onOpenAdmin }) => {
    const date = new Date();
    const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const dateLabel = `${dayNames[date.getDay()]}, ${date.getDate()} de ${monthNames[date.getMonth()]} de ${date.getFullYear()}`;
    const displayDay = [0, 6].includes(date.getDay()) ? 1 : date.getDay();
    const todaysClasses = SCHEDULE[displayDay] || [];
    const totalStudents = todaysClasses.reduce((sum, cls) => {
        const groupInfo = GROUPS_DB[cls.groupId];
        return sum + (groupInfo?.count || 0);
    }, 0);

    return (
        <div className="bg-brand-background min-h-screen pb-28 text-slate-950">
            <div className="px-4 pt-6 pb-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <p className="text-base font-semibold text-slate-950">¡Buenos días, Profe! 👋</p>
                        <p className="mt-2 text-sm text-slate-500">{dateLabel}</p>
                        <p className="mt-1 text-sm text-slate-500">Esc. Sec. Miguel Hidalgo y Costilla</p>
                    </div>
                    <button
                        onClick={onSignOut}
                        className="rounded-[14px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Cerrar sesión
                    </button>
                </div>

                <div className="relative mt-5 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#7A1235] to-[#A42D56] px-7 py-8 text-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full bg-white/8" />
                    <div className="relative z-10">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                            <p className="text-xs uppercase tracking-[0.35em] text-white/80">SIGE</p>
                            <h1 className="mt-2 text-2xl font-bold leading-tight">Gestión Escolar</h1>
                            <p className="mt-4 max-w-md text-sm leading-6 text-white/90">Herramientas simples para una enseñanza organizada y eficiente.</p>
                        </div>
                        <div className="flex items-center justify-end">
                            <img
                                src="/sige_vertical.png"
                                alt="Logo SIGE"
                                className="h-44 w-auto rounded-[24px] border border-white/25 bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
                            />
                        </div>
                    </div>
                    </div>
                </div>

                <div className="mt-5 space-y-4">
                    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Mis grupos de hoy</p>
                                <h2 className="mt-2 text-lg font-bold text-slate-950">Selecciona un grupo</h2>
                            </div>
                            <div className="rounded-3xl bg-[#EEF2FF] px-3 py-2 text-sm font-semibold text-[#2563EB]">{todaysClasses.length} grupos</div>
                        </div>

                        <div className="mt-4 space-y-3">
                            {todaysClasses.length > 0 ? todaysClasses.map((cls, index) => {
                                const groupInfo = GROUPS_DB[cls.groupId];
                                return (
                                    <button
                                        key={index}
                                        onClick={() => onSelectGroup(groupInfo)}
                                        className="w-full rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:border-slate-300 hover:bg-white"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-700">{groupInfo.name}</p>
                                                <p className="mt-1 text-sm text-slate-500">Tecnología • {groupInfo.count} alumnos</p>
                                            </div>
                                            <span className="text-sm font-semibold text-[#7A1235]">{cls.time}</span>
                                        </div>
                                    </button>
                                );
                            }) : (
                                <div className="rounded-[20px] border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500">No hay grupos disponibles.</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-bold">{todaysClasses.length}</p>
                            <div className="rounded-3xl bg-[#EEF2FF] p-2 text-[#2563EB]">
                                <BookOpen size={18} />
                            </div>
                        </div>
                        <p className="mt-4 text-sm font-semibold text-slate-500">Grupos</p>
                    </div>
                    <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-bold">{totalStudents}</p>
                            <div className="rounded-3xl bg-[#EEF2FF] p-2 text-[#2563EB]">
                                <Users2 size={18} />
                            </div>
                        </div>
                        <p className="mt-4 text-sm font-semibold text-slate-500">Alumnos</p>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Mis grupos en detalle</p>
                            <h2 className="mt-2 text-xl font-bold text-slate-950">Agenda rápida</h2>
                        </div>
                    </div>

                    {todaysClasses.length > 0 ? (
                        todaysClasses.map((cls, index) => {
                            const groupInfo = GROUPS_DB[cls.groupId];
                            return (
                                <button
                                    key={index}
                                    onClick={() => onSelectGroup(groupInfo)}
                                    className="w-full rounded-[24px] border border-slate-200 bg-white p-5 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="grid h-12 w-12 place-items-center rounded-3xl bg-[#F1F5F9] text-[#7A1235]">
                                                <BookOpen size={22} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-500">{groupInfo.name}</p>
                                                <h3 className="mt-1 text-lg font-bold text-slate-950">Tecnología</h3>
                                            </div>
                                        </div>
                                        <span className="rounded-full bg-[#F8FAFC] px-3 py-2 text-sm font-semibold text-slate-600">{groupInfo.count} alumnos</span>
                                    </div>
                                    <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                                        <div className="inline-flex items-center gap-2 rounded-3xl bg-[#F8FAFC] px-3 py-2">
                                            <Clock size={16} />
                                            {cls.time}
                                        </div>
                                        <div className="inline-flex items-center gap-2 rounded-3xl bg-[#F8FAFC] px-3 py-2">
                                            <GraduationCap size={16} />
                                            Aula A-12
                                        </div>
                                    </div>
                                </button>
                            );
                        })
                    ) : (
                        <div className="rounded-[24px] border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
                            No hay clases programadas.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
