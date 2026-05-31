import React from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, Settings, LogOut } from 'lucide-react';

const navItems = [
  { label: 'Inicio', icon: Home, key: '/' },
  { label: 'Clases', icon: BookOpen, key: '/class' },
  { label: 'Config', icon: Settings, key: '/admin' },
];

const mobileNavItems = [
  { label: 'Inicio', icon: Home, key: '/' },
  { label: 'Config', icon: Settings, key: '/admin' },
];

const Sidebar = ({ active, onNavigate, onSignOut }) => {
  return (
    <>
      <aside className="hidden md:flex md:w-72 xl:w-80 flex-col bg-white/95 backdrop-blur-[20px] border-r border-brand-border shadow-soft">
        <div className="px-6 py-8 border-b border-slate-200/70">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid place-items-center w-12 h-12 rounded-3xl bg-[#7A1235] text-white shadow-lg shadow-[#7A1235]/10">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400 font-semibold">SIGE</p>
              <h1 className="text-xl font-black text-slate-950">Miguel Hidalgo</h1>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-950">Panel del Profesor</p>
            <p className="mt-1 text-xs">Organiza tu día con claridad y rapidez.</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <motion.button
                whileHover={{ x: 6 }}
                key={item.label}
                onClick={() => onNavigate(item.key)}
                className={`w-full flex items-center gap-3 rounded-3xl px-4 py-3 text-left transition-all ${isActive ? 'bg-[#7A1235] text-white shadow-lg shadow-[#7A1235]/10' : 'text-slate-700 hover:bg-slate-100'}`}>
                <span className={`grid place-items-center w-11 h-11 rounded-2xl ${isActive ? 'bg-white/15 text-white' : 'bg-slate-100 text-[#7A1235]'}`}>
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
            className="w-full rounded-[14px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <LogOut size={18} /> Cerrar sesión
          </button>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around gap-2 border-t border-slate-200/70 bg-white/95 px-3 py-3 shadow-top md:hidden">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.key)}
              className={`flex flex-col items-center justify-center gap-1 rounded-3xl px-3 py-2 text-[11px] font-semibold transition-all ${isActive ? 'bg-[#7A1235] text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
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
