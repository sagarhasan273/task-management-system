import { useState, FormEvent } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import Input from '../common/Input';
import Button from '../common/Button';

interface ProjectFormProps {
  onClose: () => void;
}

const ProjectForm = ({ onClose }: ProjectFormProps) => {
  const { addProject } = useTaskContext();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#3b82f6');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    addProject({
      name,
      description,
      color,
    });
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Project Name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
      />
      
      <Input
        label="Description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
      
      <Input
        label="Color"
        id="color"
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="h-10"
      />
      
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
          Create Project
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;