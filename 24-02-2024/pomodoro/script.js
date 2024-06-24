let workDuration = 25 * 60; // 25 minutos en segundos
let breakDuration = 5 * 60; // 5 minutos en segundos
let timer;
let timerRunning = false;
let isWorking = true;

const timerDisplay = document.getElementById('timerDisplay');
const statusDisplay = document.getElementById('status');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', deleteTask);

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    timerRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    timerRunning = false;
    if (isWorking) {
        workDuration = 25 * 60;
        timerDisplay.textContent = formatTime(workDuration);
    } else {
        breakDuration = 5 * 60;
        timerDisplay.textContent = formatTime(breakDuration);
    }
}

function updateTimer() {
    if (isWorking) {
        workDuration--;
        timerDisplay.textContent = formatTime(workDuration);
        if (workDuration <= 0) {
            clearInterval(timer);
            isWorking = false;
            statusDisplay.textContent = "Break";
            timerDisplay.textContent = formatTime(breakDuration);
            startTimer();
        }
    } else {
        breakDuration--;
        timerDisplay.textContent = formatTime(breakDuration);
        if (breakDuration <= 0) {
            clearInterval(timer);
            isWorking = true;
            statusDisplay.textContent = "Working";
            timerDisplay.textContent = formatTime(workDuration);
            startTimer();
        }
    }
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainderSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskItem.classList.add('task-item'); // Añadir clase para facilitar la selección
        const deleteBtn = document.createElement('button');
        deleteBtDn.textContent = 'Eliminar';
        deleteBtn.classList.add('delete-btn'); // Añadir clase para facilitar la selección
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
}

function deleteTask(event) {
    if (event.target.classList.contains('delete-btn')) {
        const taskItem = event.target.parentElement;
        taskList.removeChild(taskItem);
    }
}
