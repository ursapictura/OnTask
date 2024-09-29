import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { updateTask, deleteTask } from '../api/tasks';

export default function TaskRow({ taskObj, onUpdate }) {
  console.warn(taskObj);
  const [isChecked, setIsChecked] = useState(taskObj.completed === true);

  const handleCheckboxChange = () => {
    const updatedValue = !isChecked;
    setIsChecked(updatedValue);

    const payload = { ...taskObj, completed: updatedValue };
    console.warn(payload);

    updateTask(payload).then(() => {
      onUpdate(); // Notify parent of the update
    });
  };

  const onDelete = () => {
    deleteTask(taskObj.firebaseKey).then(onUpdate);
  };

  useEffect(() => {
    setIsChecked(taskObj.completed === true);
  }, [taskObj.completed]);

  return (
    <tr>
      <td>{taskObj.name}</td>
      <td style={{ textAlign: 'center' }}>{taskObj.dueDate}</td>
      <td style={{ textAlign: 'center' }}><Form.Check
        aria-label="option 1"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      </td>
      <td style={{ textAlign: 'center' }}><Button onClick={onDelete} variant="outline-danger">Delete</Button></td>
    </tr>
  );
}

TaskRow.propTypes = {
  taskObj: PropTypes.shape({
    name: PropTypes.string.isRequired,
    firebaseKey: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    dueDate: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
