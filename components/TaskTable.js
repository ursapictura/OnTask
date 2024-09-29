import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TaskRow from './TaskRow';

export default function TaskTable({ tasksArray, onUpdate }) {
  return (
    <div>
      <Table striped bordered hover className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th style={{ textAlign: 'center' }}>Due Date</th>
            <th style={{ textAlign: 'center' }}>Complete</th>
            <th style={{ textAlign: 'center' }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasksArray
            ? tasksArray.map((task) => (
              <TaskRow key={task.firebaseKey} taskObj={task} onUpdate={onUpdate} />
            ))
            : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center' }}>
                  No tasks available
                </td>
              </tr>
            )}
        </tbody>
      </Table>
    </div>
  );
}

TaskTable.propTypes = {
  tasksArray: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      closedOn: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      firebaseKey: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
