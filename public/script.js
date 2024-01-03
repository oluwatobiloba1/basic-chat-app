const socket = io('ws://127.0.0.1:3000')
const ul = document.querySelector('ul');
const input = document.getElementById('mess-input');
const activity = document.querySelector('#activity');

document.getElementById('send-button').addEventListener('click',  async() => {
    if (input.value.length > 0) {
        console.log(input.value);
        socket.emit('message', input.value);
        input.value = '';
    }
   
});

input.addEventListener('keypress', () => {
    socket.emit('activity', 'typing...');
});

socket.on('message', (data) => {
    activity.textContent = '';
    console.log(data);
    const li = document.createElement('li');
    li.textContent = data;
    li.style.listStyle = 'none';
    ul.appendChild(li);
});
let activityTimer;

socket.on('activity', (data) => {
    console.log(data);
    
    activity.textContent = `${data} is typing...`;
    clearTimeout(activityTimer);
    activityTimer = setTimeout(() => {
        activity.textContent = '';
    }, 2000);
    
});