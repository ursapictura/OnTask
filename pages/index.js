'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getUserTasks } from '../api/tasks';
import TaskTable from '../components/TaskTable';
import TaskForm from '../components/Forms/TaskForm';

function Home() {
  const { user } = useAuth();
  const [userTasks, setUserTasks] = useState([]);
  const [openTasks, setOpenTasks] = useState([]);
  const [closedTasks, setClosedTasks] = useState([]);

  const getAllTasks = () => {
    getUserTasks(user.uid).then((tasks) => {
      setUserTasks(tasks);
    });
  };

  useEffect(() => {
    getAllTasks();
  }, [user.uid]);

  useEffect(() => {
    console.warn(userTasks);
    setOpenTasks(userTasks.filter((task) => task.completed === false).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))); // Update open tasks
    setClosedTasks(userTasks.filter((task) => task.completed === true)); // Update closed tasks
  }, [userTasks]);

  return (
    <>
      <div className="form-container">
        <TaskForm onUpdate={getAllTasks} />
      </div>
      <div className="table-container">
        <h2 className="task-title">Tasks To Do</h2>
        <TaskTable tasksArray={openTasks} onUpdate={getAllTasks} />
      </div>
      <div className="table-container">
        <h2 className="task-title">TasksCompleted</h2>
        <TaskTable tasksArray={closedTasks} onUpdate={getAllTasks} />
      </div>
      {/* <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Complete</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {openTasks ?
            openTasks.map((task) => (
              <TaskRow key={task.firebaseKey} taskObj={task} onupdate={getAllTasks} />
          ))
          : '' }
        </tbody>
      </Table>
    </div>

    <h2>Completed Tasks</h2>
    <Table>
    <thead>
        <tr>
          <th>#</th>
          <th>Task</th>
          <th>Complete</th>
          <th>Delete</th>
        </tr>
        </thead>
    </Table> */}
    </>
  );
}

export default Home;
