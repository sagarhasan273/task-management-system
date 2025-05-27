import { createContext, useContext, useState, ReactNode } from 'react';
import { projects as initialProjects, tags as initialTags, tasks as initialTasks } from '../data/mockData';
import { Task, Project, Tag, Priority, Status } from '../types';

interface TaskContextType {
  tasks: Task[];
  projects: Project[];
  tags: Tag[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getTasksByProject: (projectId: string) => Task[];
  getTasksByStatus: (status: Status) => Task[];
  getTasksByPriority: (priority: Priority) => Task[];
  getTasksByTag: (tagId: string) => Task[];
  getProject: (id: string) => Project | undefined;
  getTag: (id: string) => Tag | undefined;
  getOverdueTasks: () => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tags] = useState<Tag[]>(initialTags);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: `project-${Date.now()}`,
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const updateProject = (id: string, updatedFields: Partial<Project>) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, ...updatedFields } : project
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    // Also delete all tasks associated with this project
    setTasks((prevTasks) => prevTasks.filter((task) => task.projectId !== id));
  };

  const getTasksByProject = (projectId: string) => {
    return tasks.filter((task) => task.projectId === projectId);
  };

  const getTasksByStatus = (status: Status) => {
    return tasks.filter((task) => task.status === status);
  };

  const getTasksByPriority = (priority: Priority) => {
    return tasks.filter((task) => task.priority === priority);
  };

  const getTasksByTag = (tagId: string) => {
    return tasks.filter((task) => task.tags.includes(tagId));
  };

  const getProject = (id: string) => {
    return projects.find((project) => project.id === id);
  };

  const getTag = (id: string) => {
    return tags.find((tag) => tag.id === id);
  };

  const getOverdueTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter((task) => {
      if (!task.dueDate || task.status === 'completed') return false;
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < today;
    });
  };

  const value = {
    tasks,
    projects,
    tags,
    addTask,
    updateTask,
    deleteTask,
    addProject,
    updateProject,
    deleteProject,
    getTasksByProject,
    getTasksByStatus,
    getTasksByPriority,
    getTasksByTag,
    getProject,
    getTag,
    getOverdueTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};