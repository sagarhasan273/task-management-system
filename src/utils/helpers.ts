import { Priority, Status } from '../types';

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'No due date';
  
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const taskDate = new Date(date);
  taskDate.setHours(0, 0, 0, 0);
  
  if (taskDate.getTime() === today.getTime()) {
    return 'Today';
  } else if (taskDate.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  } else if (taskDate.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  }
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: today.getFullYear() !== date.getFullYear() ? 'numeric' : undefined,
  });
};

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'high':
      return '#ef4444'; // red
    case 'medium':
      return '#f59e0b'; // amber
    case 'low':
      return '#10b981'; // green
    default:
      return '#6b7280'; // gray
  }
};

export const getStatusColor = (status: Status): string => {
  switch (status) {
    case 'todo':
      return '#6b7280'; // gray
    case 'in-progress':
      return '#3b82f6'; // blue
    case 'completed':
      return '#10b981'; // green
    default:
      return '#6b7280'; // gray
  }
};

export const getStatusText = (status: Status): string => {
  switch (status) {
    case 'todo':
      return 'To Do';
    case 'in-progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    default:
      return status;
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};