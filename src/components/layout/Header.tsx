import { useState } from 'react';
import { Search, Bell, Plus, User } from 'lucide-react';
import Button from '../common/Button';
import TaskForm from '../task/TaskForm';
import Modal from '../common/Modal';

const Header = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-64"
            placeholder="Search tasks..."
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus size={16} />}
          onClick={() => setIsTaskModalOpen(true)}
        >
          New Task
        </Button>
        
        <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors">
          <Bell size={20} />
        </button>
        
        <button className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition-colors">
          <User size={20} />
        </button>
      </div>
      
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Create New Task"
      >
        <TaskForm onClose={() => setIsTaskModalOpen(false)} />
      </Modal>
    </header>
  );
};

export default Header;