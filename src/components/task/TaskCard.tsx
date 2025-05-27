import { useState } from 'react';
import { Clock, Tag, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Task, Project, Tag as TagType } from '../../types';
import { useTaskContext } from '../../context/TaskContext';
import { formatDate, getPriorityColor, getStatusText } from '../../utils/helpers';
import Badge from '../common/Badge';
import TaskForm from './TaskForm';
import Modal from '../common/Modal';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { getProject, getTag, deleteTask, updateTask } = useTaskContext();
  const [showMenu, setShowMenu] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const project = getProject(task.projectId);
  
  const handleStatusToggle = () => {
    const newStatus = task.status === 'completed' ? 'todo' : 'completed';
    updateTask(task.id, { status: newStatus });
  };
  
  const handleDeleteTask = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
    setShowMenu(false);
  };
  
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="px-4 py-3 flex items-start gap-3">
        {/* Checkbox */}
        <div className="pt-0.5">
          <button
            onClick={handleStatusToggle}
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
              task.status === 'completed'
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-blue-500'
            }`}
          >
            {task.status === 'completed' && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 
              className={`text-base font-medium ${
                task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>
            
            <div className="relative">
              <button 
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                onClick={() => setShowMenu(!showMenu)}
              >
                <MoreVertical size={16} />
              </button>
              
              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    <button
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setShowMenu(false);
                      }}
                    >
                      <Edit2 size={14} className="mr-2" />
                      Edit
                    </button>
                    <button
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={handleDeleteTask}
                    >
                      <Trash2 size={14} className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {task.description && (
            <p className={`text-sm mt-1 ${
              task.status === 'completed' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
          
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* Priority Badge */}
            <Badge color={getPriorityColor(task.priority)}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
            
            {/* Status Badge (only show if not completed) */}
            {task.status !== 'completed' && (
              <Badge 
                color={task.status === 'in-progress' ? '#3b82f6' : '#6b7280'}
              >
                {getStatusText(task.status)}
              </Badge>
            )}
            
            {/* Project Badge */}
            {project && (
              <Badge color={project.color}>
                {project.name}
              </Badge>
            )}
            
            {/* Due Date */}
            {task.dueDate && (
              <div className={`flex items-center text-xs ${
                task.status === 'completed' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <Clock size={12} className="mr-1" />
                {formatDate(task.dueDate)}
              </div>
            )}
          </div>
          
          {/* Tags */}
          {task.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {task.tags.map((tagId) => {
                const tag = getTag(tagId);
                if (!tag) return null;
                
                return (
                  <div 
                    key={tag.id}
                    className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
                  >
                    <Tag size={10} className="mr-1" />
                    {tag.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Task"
      >
        <TaskForm 
          task={task}
          onClose={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default TaskCard;