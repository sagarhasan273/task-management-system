import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { Task } from '../../types';
import TaskCard from './TaskCard';
import Button from '../common/Button';

interface TaskListProps {
  tasks: Task[];
  title: string;
}

type SortOption = 'priority' | 'dueDate' | 'title';
type SortDirection = 'asc' | 'desc';

const TaskList = ({ tasks, title }: TaskListProps) => {
  const [sortBy, setSortBy] = useState<SortOption>('priority');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>(['todo', 'in-progress', 'completed']);
  const [priorityFilter, setPriorityFilter] = useState<string[]>(['low', 'medium', 'high']);
  
  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('desc');
    }
  };
  
  const toggleStatusFilter = (status: string) => {
    setStatusFilter((prev) => 
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };
  
  const togglePriorityFilter = (priority: string) => {
    setPriorityFilter((prev) => 
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority]
    );
  };
  
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => 
      statusFilter.includes(task.status) &&
      priorityFilter.includes(task.priority)
    );
  }, [tasks, statusFilter, priorityFilter]);
  
  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const valA = priorityOrder[a.priority];
        const valB = priorityOrder[b.priority];
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      } else if (sortBy === 'dueDate') {
        if (!a.dueDate) return sortDirection === 'asc' ? -1 : 1;
        if (!b.dueDate) return sortDirection === 'asc' ? 1 : -1;
        return sortDirection === 'asc'
          ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      } else {
        return sortDirection === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
    });
  }, [filteredTasks, sortBy, sortDirection]);
  
  const getSortIcon = (option: SortOption) => {
    if (sortBy !== option) return null;
    return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };
  
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<SlidersHorizontal size={14} />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filter
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="mt-3 border-t border-gray-200 pt-3">
            <div className="mb-2">
              <p className="text-sm font-medium text-gray-700 mb-1">Status</p>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    statusFilter.includes('todo')
                      ? 'bg-gray-200 text-gray-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => toggleStatusFilter('todo')}
                >
                  To Do
                </button>
                <button
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    statusFilter.includes('in-progress')
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => toggleStatusFilter('in-progress')}
                >
                  In Progress
                </button>
                <button
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    statusFilter.includes('completed')
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => toggleStatusFilter('completed')}
                >
                  Completed
                </button>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Priority</p>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    priorityFilter.includes('high')
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => togglePriorityFilter('high')}
                >
                  High
                </button>
                <button
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    priorityFilter.includes('medium')
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => togglePriorityFilter('medium')}
                >
                  Medium
                </button>
                <button
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    priorityFilter.includes('low')
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => togglePriorityFilter('low')}
                >
                  Low
                </button>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-1">Sort By</p>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`flex items-center px-2 py-1 rounded text-xs font-medium ${
                    sortBy === 'priority'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => toggleSort('priority')}
                >
                  Priority
                  {getSortIcon('priority')}
                </button>
                <button
                  className={`flex items-center px-2 py-1 rounded text-xs font-medium ${
                    sortBy === 'dueDate'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => toggleSort('dueDate')}
                >
                  Due Date
                  {getSortIcon('dueDate')}
                </button>
                <button
                  className={`flex items-center px-2 py-1 rounded text-xs font-medium ${
                    sortBy === 'title'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => toggleSort('title')}
                >
                  Title
                  {getSortIcon('title')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Task List */}
      <div className="p-4">
        {sortedTasks.length > 0 ? (
          <div className="space-y-3">
            {sortedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;