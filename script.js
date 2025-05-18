// Функция для добавления сообщений в чат
function addChatMessage(username, message) {
    const chatContainer = document.getElementById('chat-messages');
    if (!chatContainer) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message';
    messageElement.innerHTML = `<span class="chat-username">${username}:</span> ${message}`;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Подключение к Twitch через WebSocket
function connectToTwitchChat() {
    const channel = 'andrusha_wav';
    const nick = 'justinfan' + Math.floor(Math.random() * 10000);
    
    const ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
    
    ws.onopen = () => {
        addChatMessage('System', 'Подключаемся к Twitch IRC...');
        ws.send(`NICK ${nick}`);
        ws.send(`JOIN #${channel}`);
    };
    
    ws.onmessage = (event) => {
        const message = event.data.trim();
        
        // Ping-Pong для поддержания соединения
        if (message.startsWith('PING')) {
            ws.send('PONG :tmi.twitch.tv');
            return;
        }
        
        // Парсинг сообщений чата
        const chatMsg = message.match(/^:([^!]+)!.*PRIVMSG #\w+ :(.+)$/);
        if (chatMsg) {
            const username = chatMsg[1];
            const text = chatMsg[2];
            addChatMessage(username, text);
        }
        
        // Системные сообщения
        if (message.includes('Login authentication failed')) {
            addChatMessage('System', 'Ошибка: Анонимное подключение ограничено');
        }
    };
    
    ws.onerror = (error) => {
        addChatMessage('System', `Ошибка соединения: ${error.message}`);
    };
    
    ws.onclose = () => {
        addChatMessage('System', 'Соединение с чатом закрыто');
    };
}

// Фейковые системные статусы
function updateSystemStats() {
    // CPU
    const cpuUsage = 45 + Math.random() * 10;
    const cpuElement = document.getElementById('cpu-usage');
    if (cpuElement) cpuElement.textContent = Math.round(cpuUsage) + '%';
    
    // GPU
    const gpuUsage = 60 + Math.random() * 10;
    const gpuElement = document.getElementById('gpu-usage');
    if (gpuElement) gpuElement.textContent = Math.round(gpuUsage) + '%';
    
    // RAM
    const ramUsed = 12 + Math.random() * 1.5;
    const ramElement = document.getElementById('ram-usage');
    if (ramElement) ramElement.textContent = ramUsed.toFixed(1) + '/16GB';
    
    // Network
    const netUsage = 3 + Math.random() * 3;
    const netElement = document.getElementById('net-usage');
    if (netElement) netElement.textContent = netUsage.toFixed(1) + ' Mbps';
    
    // FPS
    const fps = 50 + Math.random() * 20;
    const fpsElement = document.getElementById('fps');
    if (fpsElement) fpsElement.textContent = Math.round(fps);
    
    // Timestamp
    const now = new Date();
    const timestampElement = document.getElementById('timestamp');
    if (timestampElement) timestampElement.textContent = now.toISOString().replace('T', ' ').substring(0, 19);
}

// Инициализация
function init() {
    setInterval(updateSystemStats, 1000);
    updateSystemStats();
    connectToTwitchChat();
}

// Запуск при загрузке страницы
window.onload = init;