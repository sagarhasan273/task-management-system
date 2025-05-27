import { useMemo } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskList from '../components/task/TaskList';

const TodayTasks = () => {
  const { tasks } = useTaskContext();
  
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
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Today's Tasks</h1>
      <TaskList tasks={todayTasks} title="Today" />
    </div>
  );
};

export default TodayTasks;