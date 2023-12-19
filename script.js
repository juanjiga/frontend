document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
});

function fetchTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    fetch('http://localhost:8080/api/todos')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.title;
                taskList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function createTask() {
    const title = document.getElementById('title').value;

    fetch('http://localhost:8080/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            completed: false,
        }),
    })
    .then(response => response.json())
    .then(() => {
        fetchTasks();
        document.getElementById('title').value = '';
    })
    .catch(error => console.error('Error creating task:', error));
}
