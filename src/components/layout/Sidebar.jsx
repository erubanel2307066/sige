import React from 'react';
import { motion } from 'framer-motion';
import { Home, Users2, ClipboardList, BookOpen, Settings, LogOut } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: Home, key: '/' },
  { label: 'Lista de Clase', icon: BookOpen, key: '/class' },
  { label: 'Configuración de Ciclo', icon: Settings, key: '/admin' },
];

const Sidebar = ({ active, onNavigate, onSignOut }) => {
  return (
    <>
      <aside className="hidden md:flex md:w-72 xl:w-80 flex-col bg-white/90 backdrop-blur-xl border-r border-slate-200/70 shadow-soft">
        <div className="px-6 py-8 border-b border-slate-200/70">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid place-items-center w-12 h-12 rounded-3xl bg-brand-primary text-white shadow-lg shadow-brand-primary/10">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-brand-secondary font-semibold">SIGE</p>
              <h1 className="text-xl font-black text-brand-text">Miguel Hidalgo</h1>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-4 text-sm text-slate-500">
            <p className="font-semibold text-brand-text">Panel del Profesor</p>
            <p className="mt-1 text-xs">Administración escolar moderna con enfoque en docencia.</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <motion.button
                whileHover={{ x: 6 }}
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`w-full flex items-center gap-3 rounded-3xl px-4 py-3 text-left transition-all ${isActive ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/10' : 'text-slate-600 hover:bg-slate-100'}`}>
                <span className={`grid place-items-center w-11 h-11 rounded-2xl ${isActive ? 'bg-white/10 text-white' : 'bg-slate-100 text-brand-primary'}`}>
                  <Icon size={20} />
                </span>
                <span className="font-semibold">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="px-6 py-6 border-t border-slate-200/70">
          <button
            type="button"
            onClick={onSignOut}
            className="w-full flex items-center justify-center gap-2 rounded-3xl bg-slate-100 px-4 py-3 font-semibold text-brand-text hover:bg-slate-200 transition-all"
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around gap-2 border-t border-slate-200/70 bg-white/95 px-3 py-3 shadow-top md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`flex flex-col items-center justify-center gap-1 rounded-3xl px-3 py-2 text-[11px] font-semibold transition-all ${isActive ? 'bg-brand-primary text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
