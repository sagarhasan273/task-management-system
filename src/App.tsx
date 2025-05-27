import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import AllTasks from './pages/AllTasks';
import TodayTasks from './pages/TodayTasks';
import ProjectView from './pages/ProjectView';
import Settings from './pages/Settings';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'all-tasks':
        return <AllTasks />;
      case 'today':
        return <TodayTasks />;
      case 'project':
        return activeProjectId ? <ProjectView projectId={activeProjectId} /> : null;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar 
            activeView={activeView}
            setActiveView={setActiveView}
            activeProjectId={activeProjectId}
            setActiveProjectId={setActiveProjectId}
          />
          <main className="flex-1 overflow-y-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;