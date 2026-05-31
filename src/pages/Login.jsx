import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
// Importa tu cliente de supabase de acuerdo a la estructura real de tu proyecto
import { supabase } from '../services/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
      }
    } catch (err) {
      setError('Ocurrió un error al intentar iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0D47A1] font-sans flex items-center justify-center p-4 selection:bg-[#26C6DA] selection:text-white">
      <div className="w-full max-w-[430px] h-full min-h-screen bg-white/95 shadow-2xl relative flex flex-col overflow-hidden rounded-[28px]">
        <div className="bg-gradient-to-br from-[#0D47A1] via-[#1976D2] to-[#26C6DA] px-6 pt-14 pb-24 rounded-b-[45px] shadow-2xl relative overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.35),_transparent_32%)]" />
          <div className="absolute right-[-40px] top-[-20px] h-40 w-40 rounded-full bg-[#43A047]/25 blur-2xl" />
          <div className="absolute left-[-30px] bottom-[-20px] h-32 w-32 rounded-full bg-[#26C6DA]/30 blur-2xl" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-5 inline-flex items-center justify-center rounded-[28px] border border-white/20 bg-white/10 p-4 shadow-xl shadow-[#0D47A1]/15">
              <img src="/sige_vertical.png" alt="SIGE Logo" className="h-40 w-auto" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/80 mb-3">
              Sistema Inteligente de Gestión Escolar
            </p>
            <h1 className="text-3xl font-black text-white leading-tight mb-2">SIGE</h1>
            <p className="text-sm font-semibold text-white/80 px-4">
              Accede al panel docente con seguridad y rapidez.
            </p>
          </div>
        </div>

        <div className="px-5 -mt-16 relative z-20 flex-1 flex flex-col">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_15px_40px_rgb(0,0,0,0.12)] border border-slate-200">
            <div className="mb-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Acceso Docente</h3>
              <p className="text-sm text-slate-500 mt-1 font-medium">Ingresa tus credenciales para continuar.</p>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl bg-[#FFEBEE] border border-[#FFCDD2] px-4 py-3 text-[13px] font-semibold text-[#C62828]">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest pl-1">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="docente@escuela.edu.mx"
                    className="w-full bg-slate-50 text-slate-900 rounded-2xl pl-11 pr-4 py-4 text-[15px] font-medium border border-slate-200 focus:border-[#1976D2] focus:outline-none focus:ring-4 focus:ring-[#26C6DA]/15 transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest pl-1">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 text-slate-900 rounded-2xl pl-11 pr-4 py-4 text-[15px] font-medium border border-slate-200 focus:border-[#1976D2] focus:outline-none focus:ring-4 focus:ring-[#26C6DA]/15 transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 inline-flex justify-center items-center gap-2 rounded-2xl bg-[#1976D2] px-4 py-4 text-[15px] font-black uppercase tracking-wide text-white shadow-lg shadow-[#1976D2]/20 transition-all hover:bg-[#1565C0] active:bg-[#0D47A1] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 size={22} className="animate-spin" />
                ) : (
                  <>
                    Iniciar Sesión <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-auto pt-8 pb-8 text-center px-6">
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Uso exclusivo para el personal docente y administrativo. <br />
              Si olvidó su contraseña, contacte a la dirección escolar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
