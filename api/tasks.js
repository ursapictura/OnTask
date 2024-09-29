const dbUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

const getUserTasks = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/tasks.json?uid=${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.warn('Raw Data from API:', data);
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createTask = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/tasks.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTask = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/tasks/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteTask = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/tasks/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'applicaiton/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
};
