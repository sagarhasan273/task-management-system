import { useState } from 'react';
import { Home, FolderIcon, Tag, CheckCircle, Clock, Settings, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import ProjectForm from '../project/ProjectForm';
import ProjectMenu from '../project/ProjectMenu';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  activeProjectId: string | null;
  setActiveProjectId: (id: string | null) => void;
}

const Sidebar = ({ activeView, setActiveView, activeProjectId, setActiveProjectId }: SidebarProps) => {
  const { projects, getTasksByProject } = useTaskContext();
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  
  const handleViewChange = (view: string) => {
    setActiveView(view);
    setActiveProjectId(null);
  };
  
  const handleProjectClick = (projectId: string) => {
    setActiveView('project');
    setActiveProjectId(projectId);
  };

  return (
    <div className="h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        <nav className="space-y-1">
          <button
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeView === 'dashboard' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleViewChange('dashboard')}
          >
            <Home size={18} className="mr-2" />
            Dashboard
          </button>
          
          <button
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeView === 'all-tasks' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleViewChange('all-tasks')}
          >
            <CheckCircle size={18} className="mr-2" />
            All Tasks
          </button>
          
          <button
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeView === 'today' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleViewChange('today')}
          >
            <Clock size={18} className="mr-2" />
            Today
          </button>
          
          {/* Projects Section */}
          <div>
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setProjectsExpanded(!projectsExpanded)}
            >
              <div className="flex items-center">
                <FolderIcon size={18} className="mr-2" />
                Projects
              </div>
              {projectsExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            
            {projectsExpanded && (
              <div className="ml-6 mt-1 space-y-1">
                {projects.map((project) => {
                  const taskCount = getTasksByProject(project.id).length;
                  
                  return (
                    <div
                      key={project.id}
                      className="flex items-center justify-between group"
                    >
                      <button
                        className={`flex-1 flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                          activeView === 'project' && activeProjectId === project.id
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => handleProjectClick(project.id)}
                      >
                        <div className="flex items-center">
                          <span 
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: project.color }}
                          />
                          {project.name}
                        </div>
                        {taskCount > 0 && (
                          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                            {taskCount}
                          </span>
                        )}
                      </button>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ProjectMenu projectId={project.id} />
                      </div>
                    </div>
                  );
                })}
                
                <button
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsProjectModalOpen(true)}
                >
                  <Plus size={16} className="mr-1" />
                  Add Project
                </button>
              </div>
            )}
          </div>
          
          <button
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeView === 'tags' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleViewChange('tags')}
          >
            <Tag size={18} className="mr-2" />
            Tags
          </button>
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button
          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            activeView === 'settings'
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => handleViewChange('settings')}
        >
          <Settings size={18} className="mr-2" />
          Settings
        </button>
      </div>

      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        title="Create New Project"
      >
        <ProjectForm onClose={() => setIsProjectModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Sidebar;