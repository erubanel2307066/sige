import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ClassView from './pages/ClassView';
import StudentProfile from './pages/StudentProfile';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Sidebar from './components/layout/Sidebar';
import { supabase } from './services/supabaseClient';

export default function App() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutos

  const handleOpenProfile = (student) => {
    setSelectedStudent(student);
    navigate('/student');
  };

  useEffect(() => {
    let authListener = null;

    const initializeAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setAuthChecked(true);

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
      authListener = listener;
    };

    initializeAuth();

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    let timeoutId;
    const resetInactivityTimer = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(() => {
        supabase.auth.signOut();
      }, INACTIVITY_TIMEOUT_MS);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach((event) => window.addEventListener(event, resetInactivityTimer));
    resetInactivityTimer();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      events.forEach((event) => window.removeEventListener(event, resetInactivityTimer));
    };
  }, [user]);

  if (!authChecked) {
    return (
      <div className="w-full min-h-screen bg-[#1a1a1a] font-sans flex justify-center items-center text-white">
        <p>Cargando autenticación...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full min-h-screen bg-brand-primary/95 font-sans flex items-center justify-center p-4 text-white">
        <div className="w-full max-w-4xl rounded-[32px] overflow-hidden shadow-glow bg-white/90 backdrop-blur-xl border border-white/30">
          <Login />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-background text-brand-text font-sans">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col md:flex-row">
        <Sidebar
          active={activePath}
          onNavigate={(path) => {
            if (path === '/') {
              setSelectedGroup(null);
            }
            navigate(path);
          }}
          onSignOut={() => supabase.auth.signOut()}
        />

        <main className="flex-1 p-4 md:p-8 lg:p-10">
          <div className="space-y-6">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    onSelectGroup={(group) => {
                      setSelectedGroup(group);
                      navigate('/class');
                    }}
                    onSignOut={() => supabase.auth.signOut()}
                    onOpenAdmin={() => navigate('/admin')}
                  />
                }
              />
              <Route
                path="/class"
                element={
                  <ClassView
                    selectedGroup={selectedGroup}
                    onBack={() => navigate('/')}
                    onOpenProfile={handleOpenProfile}
                    onSignOut={() => supabase.auth.signOut()}
                  />
                }
              />
              <Route
                path="/student"
                element={
                  selectedStudent ? (
                    <StudentProfile
                      student={selectedStudent}
                      onBack={() => navigate('/class')}
                      onSignOut={() => supabase.auth.signOut()}
                    />
                  ) : (
                    <Navigate to="/class" replace />
                  )
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminPanel
                    onBack={() => navigate('/')}
                    onSignOut={() => supabase.auth.signOut()}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
