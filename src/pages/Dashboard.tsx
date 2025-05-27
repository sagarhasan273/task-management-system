import { useMemo } from 'react';
import { BarChart, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import { formatDate } from '../utils/helpers';
import TaskCard from '../components/task/TaskCard';

const Dashboard = () => {
  const { tasks, getTasksByStatus, getOverdueTasks } = useTaskContext();
  
  const todayTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === today.getTime();
    });
  }, [tasks]);
  
  const inProgressTasks = getTasksByStatus('in-progress');
  const overdueTasks = getOverdueTasks();
  
  const taskStats = useMemo(() => {
    const completed = getTasksByStatus('completed').length;
    const inProgress = inProgressTasks.length;
    const todo = getTasksByStatus('todo').length;
    const overdue = overdueTasks.length;
    
    return {
      total: tasks.length,
      completed,
      inProgress,
      todo,
      overdue,
    };
  }, [tasks, getTasksByStatus, overdueTasks, inProgressTasks]);
  
  const completionRate = useMemo(() => {
    if (taskStats.total === 0) return 0;
    return Math.round((taskStats.completed / taskStats.total) * 100);
  }, [taskStats]);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Total Tasks</p>
            <BarChart size={20} className="text-blue-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{taskStats.total}</p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <div className="mt-1 flex items-center justify-between text-xs">
            <p className="text-gray-500">{completionRate}% completed</p>
            <p className="text-gray-500">{taskStats.completed} of {taskStats.total}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">In Progress</p>
            <Clock size={20} className="text-blue-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{taskStats.inProgress}</p>
          <p className="mt-4 text-sm text-gray-500">
            {taskStats.inProgress === 0 
              ? 'No tasks in progress'
              : `${Math.round((taskStats.inProgress / taskStats.total) * 100)}% of all tasks`
            }
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Completed</p>
            <CheckCircle2 size={20} className="text-green-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{taskStats.completed}</p>
          <p className="mt-4 text-sm text-gray-500">
            {taskStats.completed === 0 
              ? 'No completed tasks'
              : `${completionRate}% of all tasks`
            }
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Overdue</p>
            <AlertCircle size={20} className="text-red-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{taskStats.overdue}</p>
          <p className="mt-4 text-sm text-gray-500">
            {taskStats.overdue === 0 
              ? 'No overdue tasks'
              : `${Math.round((taskStats.overdue / taskStats.total) * 100)}% of all tasks`
            }
          </p>
        </div>
      </div>
      
      {/* Task Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Today's Tasks</h2>
          </div>
          <div className="p-4">
            {todayTasks.length > 0 ? (
              <div className="space-y-3">
                {todayTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No tasks due today</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Overdue Tasks */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-red-50 border-b border-red-200">
            <h2 className="text-lg font-medium text-red-800">Overdue Tasks</h2>
          </div>
          <div className="p-4">
            {overdueTasks.length > 0 ? (
              <div className="space-y-3">
                {overdueTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No overdue tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* In Progress Tasks */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-blue-50 border-b border-blue-200">
          <h2 className="text-lg font-medium text-blue-800">In Progress</h2>
        </div>
        <div className="p-4">
          {inProgressTasks.length > 0 ? (
            <div className="space-y-3">
              {inProgressTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">No tasks in progress</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;