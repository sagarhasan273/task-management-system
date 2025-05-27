import { useTaskContext } from '../context/TaskContext';
import TaskList from '../components/task/TaskList';

const AllTasks = () => {
  const { tasks } = useTaskContext();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
      <TaskList tasks={tasks} title="All Tasks" />
    </div>
  );
};

export default AllTasks;