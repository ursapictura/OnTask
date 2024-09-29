import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTask, updateTask } from '../../api/tasks';

const initialState = {
  name: '',
  dueDate: '',
};

export default function TaskForm({ onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid: user.uid, completed: false };
    createTask(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateTask(patchPayload).then(onUpdate);
    });
    setFormInput(initialState);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="mt-5 task-title">Add Task</h2>

      {/* TASK NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Task Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Add a task"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TASK DUE DATE  */}
      <FloatingLabel controlId="floatingInput3" label="Due By" className="mb-3">
        <Form.Control
          type="date"
          placeholder="Task Due Date"
          name="dueDate"
          value={formInput.dueDate}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit" variant="outline-dark">Add Task</Button>
    </Form>
  );
}

TaskForm.propTypes = {
  onUpdate: PropTypes.func.isRequired, // Validate that onUpdate is a required function
};
