import { Project, Tag, Task } from '../types';

export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'Personal',
    color: '#3b82f6', // blue
    description: 'Personal tasks and errands'
  },
  {
    id: 'project-2',
    name: 'Work',
    color: '#10b981', // green
    description: 'Work-related tasks and deadlines'
  },
  {
    id: 'project-3',
    name: 'Health',
    color: '#8b5cf6', // purple
    description: 'Health and fitness goals'
  },
  {
    id: 'project-4',
    name: 'Learning',
    color: '#f59e0b', // amber
    description: 'Learning new skills and topics'
  }
];

export const tags: Tag[] = [
  { id: 'tag-1', name: 'Urgent', color: '#ef4444' },
  { id: 'tag-2', name: 'Quick', color: '#3b82f6' },
  { id: 'tag-3', name: 'Blocked', color: '#f59e0b' },
  { id: 'tag-4', name: 'Important', color: '#8b5cf6' },
  { id: 'tag-5', name: 'Research', color: '#14b8a6' }
];

// Helper function to get dates relative to today
const getRelativeDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

export const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Complete project proposal',
    description: 'Write and submit the project proposal for the new client',
    priority: 'high',
    status: 'in-progress',
    dueDate: getRelativeDate(2),
    createdAt: getRelativeDate(-5),
    projectId: 'project-2',
    tags: ['tag-4']
  },
  {
    id: 'task-2',
    title: 'Morning run',
    description: '30 minute morning run at the park',
    priority: 'medium',
    status: 'todo',
    dueDate: getRelativeDate(0),
    createdAt: getRelativeDate(-2),
    projectId: 'project-3',
    tags: ['tag-2']
  },
  {
    id: 'task-3',
    title: 'Grocery shopping',
    description: 'Buy groceries for the week',
    priority: 'low',
    status: 'completed',
    dueDate: getRelativeDate(-1),
    createdAt: getRelativeDate(-3),
    projectId: 'project-1',
    tags: ['tag-2']
  },
  {
    id: 'task-4',
    title: 'Learn React hooks',
    description: 'Complete the advanced React hooks tutorial',
    priority: 'medium',
    status: 'todo',
    dueDate: getRelativeDate(5),
    createdAt: getRelativeDate(-1),
    projectId: 'project-4',
    tags: ['tag-5']
  },
  {
    id: 'task-5',
    title: 'Team meeting',
    description: 'Weekly team sync meeting',
    priority: 'high',
    status: 'todo',
    dueDate: getRelativeDate(1),
    createdAt: getRelativeDate(-1),
    projectId: 'project-2',
    tags: ['tag-4']
  },
  {
    id: 'task-6',
    title: 'Update resume',
    description: 'Update resume with recent projects',
    priority: 'low',
    status: 'todo',
    dueDate: getRelativeDate(10),
    createdAt: getRelativeDate(-7),
    projectId: 'project-1',
    tags: []
  },
  {
    id: 'task-7',
    title: 'Fix website bug',
    description: 'Debug and fix the login issue on the website',
    priority: 'high',
    status: 'in-progress',
    dueDate: getRelativeDate(0),
    createdAt: getRelativeDate(-2),
    projectId: 'project-2',
    tags: ['tag-1', 'tag-3']
  },
  {
    id: 'task-8',
    title: 'Meditation session',
    description: '15-minute guided meditation',
    priority: 'medium',
    status: 'todo',
    dueDate: getRelativeDate(0),
    createdAt: getRelativeDate(-1),
    projectId: 'project-3',
    tags: ['tag-2']
  },
  {
    id: 'task-9',
    title: 'Read design book',
    description: 'Read 2 chapters of the UX design book',
    priority: 'medium',
    status: 'in-progress',
    dueDate: getRelativeDate(7),
    createdAt: getRelativeDate(-10),
    projectId: 'project-4',
    tags: ['tag-5']
  },
  {
    id: 'task-10',
    title: 'Plan vacation',
    description: 'Research destinations and create itinerary',
    priority: 'low',
    status: 'todo',
    dueDate: getRelativeDate(20),
    createdAt: getRelativeDate(-5),
    projectId: 'project-1',
    tags: ['tag-5']
  }
];