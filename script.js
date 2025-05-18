// Фейковые системные статусы
function updateSystemStats() {
    // CPU
    const cpuUsage = 45 + Math.random() * 10;
    document.getElementById('cpu-usage').textContent = Math.round(cpuUsage) + '%';
    document.getElementById('cpu-bar').style.width = cpuUsage + '%';
    document.getElementById('cpu-bar').style.animation = 'cpu-pulse 3s infinite';
    
    // GPU
    const gpuUsage = 60 + Math.random() * 10;
    document.getElementById('gpu-usage').textContent = Math.round(gpuUsage) + '%';
    document.getElementById('gpu-bar').style.width = gpuUsage + '%';
    document.getElementById('gpu-bar').style.animation = 'gpu-pulse 4s infinite';
    
    // RAM
    const ramUsed = 12 + Math.random() * 1.5;
    document.getElementById('ram-usage').textContent = ramUsed.toFixed(1) + '/16GB';
    document.getElementById('ram-bar').style.width = (ramUsed / 16 * 100) + '%';
    document.getElementById('ram-bar').style.animation = 'ram-pulse 5s infinite';
    
    // Network
    const netUsage = 3 + Math.random() * 3;
    document.getElementById('net-usage').textContent = netUsage.toFixed(1) + ' Mbps';
    document.getElementById('net-bar').style.width = (netUsage / 10 * 100) + '%';
    document.getElementById('net-bar').style.animation = 'net-pulse 2s infinite';
    
    // FPS
    const fps = 50 + Math.random() * 20;
    document.getElementById('fps').textContent = Math.round(fps);
    
    // Uptime
    updateUptime();
    
    // Timestamp
    const now = new Date();
    document.getElementById('timestamp').textContent = now.toISOString().replace('T', ' ').substring(0, 19);
}

// Обновление времени работы
let uptimeSeconds = 0;
function updateUptime() {
    uptimeSeconds++;
    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = uptimeSeconds % 60;
    document.getElementById('uptime').textContent = `UPTIME: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Добавление сообщения в чат
function addChatMessage(username, message) {
    const chatContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message';
    messageElement.innerHTML = `<span class="chat-username">${username}:</span> ${message}`;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Инициализация
function init() {
    // Обновляем статусы каждую секунду
    setInterval(updateSystemStats, 1000);
    updateSystemStats();
    
    // Подключаемся к Twitch чату
    if (typeof tmi !== 'undefined') {
        connectToTwitchChat();
    } else {
        addChatMessage('System', 'Ошибка: tmi.js не загружен. Чат не будет работать.');
    }
}

// Запуск при загрузке страницы
window.onload = init;