import { useState } from 'react';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';

interface ProjectMenuProps {
  projectId: string;
  onEdit?: () => void;
}

const ProjectMenu = ({ projectId, onEdit }: ProjectMenuProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const { deleteProject } = useTaskContext();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this project? All associated tasks will also be deleted.')) {
      deleteProject(projectId);
    }
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button 
        className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        onClick={() => setShowMenu(!showMenu)}
      >
        <MoreVertical size={16} />
      </button>
      
      {showMenu && (
        <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <div className="py-1">
            {onEdit && (
              <button
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  onEdit();
                  setShowMenu(false);
                }}
              >
                <Edit2 size={14} className="mr-2" />
                Edit
              </button>
            )}
            <button
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={handleDelete}
            >
              <Trash2 size={14} className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectMenu;