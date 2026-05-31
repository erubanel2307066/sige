import React from 'react';
import { ChevronLeft, QrCode } from 'lucide-react';

const Header = ({ title, subtitle, showBack, onBack, rightIcon, onSignOut }) => {
    return (
        <div className="sticky top-0 z-50 shadow-lg">
            {/* Barra de Título Institucional */}
            <div className="bg-[#691C32] px-4 pt-6 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {showBack && (
                            <button
                                onClick={onBack}
                                className="p-1.5 -ml-1 text-white/90 active:bg-white/10 rounded-full transition-colors"
                                aria-label="Volver"
                            >
                                <ChevronLeft size={28} />
                            </button>
                        )}
                        <div className="text-left">
                            <p className="text-[11px] font-bold text-white/70 leading-none uppercase tracking-[2px]">
                                Esc. Sec. Gral.
                            </p>
                            <h1 className="text-lg font-black text-[#BC955C] leading-tight tracking-tight uppercase">
                                Miguel Hidalgo y Costilla
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {onSignOut && (
                            <button
                                onClick={onSignOut}
                                className="bg-white text-[#691C32] px-3 py-2 rounded-xl font-bold text-xs uppercase tracking-[2px] shadow-md active:bg-gray-100 transition-all"
                            >
                                Cerrar Sesión
                            </button>
                        )}
                        {rightIcon && (
                            <button className="bg-[#BC955C] text-[#691C32] p-2 rounded-xl shadow-md active:bg-[#a6824f] transition-all transform active:scale-95">
                                <QrCode size={22} strokeWidth={2.5} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Franja de Título de Pantalla */}
            {title && (
                <div className="bg-[#691C32] border-t border-white/10 px-4 py-2 flex items-center justify-center">
                    <h2 className="text-white text-xs font-bold tracking-[3px] uppercase">
                        {title}
                    </h2>
                </div>
            )}
        </div>
    );
};

export default Header;
