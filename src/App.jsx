import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import ClassView from './pages/ClassView';
import StudentProfile from './pages/StudentProfile';
import { STUDENTS_1D } from './utils/constants';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard', 'class', 'profile'
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleOpenProfile = (student) => {
    setSelectedStudent(student);
    setCurrentScreen('profile');
  };

  return (
    <div className="w-full min-h-screen bg-[#1a1a1a] font-sans flex justify-center selection:bg-[#BC955C] selection:text-white">
      <div className="w-full max-w-[430px] h-full min-h-screen bg-white shadow-2xl relative overflow-x-hidden">

        {currentScreen === 'dashboard' ? (
          <Dashboard
            onSelectGroup={(group) => {
              setSelectedGroup(group);
              setCurrentScreen('class');
            }}
          />
        ) : currentScreen === 'class' ? (
          <ClassView
            selectedGroup={selectedGroup}
            students={STUDENTS_1D}
            onBack={() => setCurrentScreen('dashboard')}
            onOpenProfile={handleOpenProfile}
          />
        ) : (
          <StudentProfile
            student={selectedStudent}
            onBack={() => setCurrentScreen('class')}
          />
        )}

      </div>
    </div>
  );
}
