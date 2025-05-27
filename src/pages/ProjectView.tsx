import { useTaskContext } from '../context/TaskContext';
import TaskList from '../components/task/TaskList';

interface ProjectViewProps {
  projectId: string;
}

const ProjectView = ({ projectId }: ProjectViewProps) => {
  const { getTasksByProject, getProject } = useTaskContext();
  const project = getProject(projectId);
  const tasks = getTasksByProject(projectId);
  
  if (!project) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div 
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: project.color }}
        />
        <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
      </div>
      
      {project.description && (
        <p className="text-gray-600">{project.description}</p>
      )}
      
      <TaskList tasks={tasks} title={`${project.name} Tasks`} />
    </div>
  );
};

export default ProjectView;