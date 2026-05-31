import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import { promoteStudents, bulkInsertStudents, updateActiveTrimester, getActiveTrimester } from '../services/studentsApi';

const AdminPanel = ({ onBack, onSignOut }) => {
  const [currentTrimester, setCurrentTrimester] = useState(1);
  const [loadingTrimester, setLoadingTrimester] = useState(false);
  const [promoting, setPromoting] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [bulkStatus, setBulkStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrimester = async () => {
      const trimestre = await getActiveTrimester();
      setCurrentTrimester(trimestre);
    };
    loadTrimester();
  }, []);

  const selectTrimester = async (value) => {
    setLoadingTrimester(true);
    setError(null);
    try {
      await updateActiveTrimester(value);
      setCurrentTrimester(value);
    } catch (err) {
      setError('No se pudo actualizar el trimestre. Intenta de nuevo.');
    } finally {
      setLoadingTrimester(false);
    }
  };

  const handleAdvanceCycle = async () => {
    const confirmation = window.confirm(
      '¿Estás seguro? Los estudiantes de 3D se graduarán y los alumnos de 2D y 1D avanzarán de grado.'
    );

    if (!confirmation) {
      return;
    }

    setPromoting(true);
    setError(null);
    try {
      const success = await promoteStudents();
      if (!success) {
        throw new Error('Promoción falló');
      }
      window.alert('Ciclo escolar actualizado. 3D graduados, 2D promovidos a 3D y 1D promovidos a 2D.');
    } catch (err) {
      setError('No se pudo avanzar el ciclo. Revisa la consola para más detalles.');
    } finally {
      setPromoting(false);
    }
  };

  const handleBulkInsert = async () => {
    const names = bulkText
      .split(/\r?\n/)
      .map((name) => name.trim())
      .filter(Boolean);

    if (names.length === 0) {
      setBulkStatus('Ingresa al menos un nombre válido para registrar.');
      return;
    }

    setBulkStatus(null);
    setError(null);
    try {
      const inserted = await bulkInsertStudents(names);
      if (inserted.length === 0) {
        throw new Error('Inserción vacía');
      }
      setBulkText('');
      setBulkStatus(`${inserted.length} alumno(s) registrados en 1° D.`);
    } catch (err) {
      setBulkStatus('No se pudieron registrar los alumnos.');
    }
  };

  return (
    <div className="bg-[#f4f6f8] min-h-screen pb-10 text-left">
      <Header
        title="Configuración del Ciclo"
        subtitle="Panel de Administración"
        showBack={true}
        onBack={onBack}
        onSignOut={onSignOut}
      />

      <div className="px-5 -mt-6 relative z-20 space-y-6">
        <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">Trimestre activo</p>
              <h2 className="mt-3 text-2xl font-black text-slate-900">T{currentTrimester}</h2>
            </div>
            <div className="flex gap-3 flex-wrap">
              {[1, 2, 3].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => selectTrimester(value)}
                  disabled={loadingTrimester}
                  className={`rounded-3xl px-5 py-4 text-sm font-black transition ${currentTrimester === value ? 'bg-[#1976D2] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  T{value}
                </button>
              ))}
            </div>
          </div>
          {loadingTrimester && <p className="mt-4 text-sm text-slate-500">Actualizando trimestre...</p>}
        </section>

        <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4 flex-col sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">Promoción masiva</p>
              <h2 className="mt-3 text-2xl font-black text-slate-900">Avanzar Ciclo Escolar</h2>
              <p className="mt-2 text-sm text-slate-500 max-w-2xl">
                Todos los alumnos de 3D se marcarán como graduados, 2D pasará a 3D y 1D a 2D.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAdvanceCycle}
              disabled={promoting}
              className="w-full sm:w-auto rounded-3xl bg-[#D32F2F] px-6 py-4 text-sm font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-[#D32F2F]/20 transition hover:bg-[#C62828] disabled:opacity-60"
            >
              {promoting ? 'Procesando...' : 'Avanzar Ciclo Escolar'}
            </button>
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">Alta rápida</p>
            <h2 className="mt-3 text-2xl font-black text-slate-900">Registrar Alumnos en 1° D</h2>
            <p className="mt-2 text-sm text-slate-500">Pega una lista de nombres separados por salto de línea y registra en 1° D.</p>
          </div>

          <textarea
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            placeholder="Ejemplo:\nAbarca Cruz Juan Carlos\nAvila Mendoza Odari Guadalupe"
            rows={7}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none focus:border-[#1976D2] focus:ring-4 focus:ring-[#26C6DA]/10 transition-all"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleBulkInsert}
              className="w-full sm:w-auto rounded-3xl bg-[#1976D2] px-6 py-4 text-sm font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-[#1976D2]/20 transition hover:bg-[#1565C0]"
            >
              Registrar Alumnos en 1° D
            </button>
            {bulkStatus && <p className="text-sm text-slate-600">{bulkStatus}</p>}
          </div>
        </section>

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
