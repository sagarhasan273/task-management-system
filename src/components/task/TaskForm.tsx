import { useState, FormEvent } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { Task, Priority, Status } from '../../types';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Select from '../common/Select';
import Button from '../common/Button';

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

const TaskForm = ({ task, onClose }: TaskFormProps) => {
  const { addTask, updateTask, projects, tags } = useTaskContext();
  
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState<Priority>(task?.priority || 'medium');
  const [status, setStatus] = useState<Status>(task?.status || 'todo');
  const [dueDate, setDueDate] = useState(task?.dueDate?.slice(0, 10) || '');
  const [projectId, setProjectId] = useState(task?.projectId || projects[0]?.id);
  const [selectedTags, setSelectedTags] = useState<string[]>(task?.tags || []);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const taskData = {
      title,
      description,
      priority,
      status,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      projectId,
      tags: selectedTags,
    };
    
    if (task) {
      updateTask(task.id, taskData);
    } else {
      addTask(taskData);
    }
    
    onClose();
  };
  
  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) => 
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
      />
      
      <Textarea
        label="Description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        fullWidth
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Priority"
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
        />
        
        <Select
          label="Status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
          options={[
            { value: 'todo', label: 'To Do' },
            { value: 'in-progress', label: 'In Progress' },
            { value: 'completed', label: 'Completed' },
          ]}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Due Date"
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        
        <Select
          label="Project"
          id="project"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          options={projects.map((project) => ({
            value: project.id,
            label: project.name,
          }))}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedTags.includes(tag.id)
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => handleTagToggle(tag.id)}
            >
              <span 
                className="w-2 h-2 rounded-full mr-1.5"
                style={{ backgroundColor: tag.color }}
              />
              {tag.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
        >
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;