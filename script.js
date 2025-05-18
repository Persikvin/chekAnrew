// Системные сообщения и статусы
const systemMessages = [
    "[INFO] Проверка оборудования... OK",
    "[INFO] Загрузка драйверов... OK",
    "[INFO] Инициализация сети... OK",
    "[INFO] Проверка подключения к Twitch... OK",
    "[INFO] Загрузка OBS... OK",
    "[INFO] Проверка микрофона... OK",
    "[INFO] Проверка камеры... OK",
    "[INFO] Загрузка игрового клиента... OK",
    "[INFO] Система готова к стриму",
    "[INFO] Статус CPU: 45% | GPU: 62% | RAM: 7.2/16GB",
    "[INFO] FPS: 58-62 | Bitrate: 4500 Kbps",
    "[INFO] Зрителей: 127 | Подписчиков: 342",
    "[INFO] Последний донат: 100 руб от br3vil"
];

const consoleOutput = document.getElementById('consoleOutput');

// Функция для добавления системных сообщений
function addSystemMessage(message, delay = 0) {
    setTimeout(() => {
        const messageElement = document.createElement('div');
        messageElement.className = 'system-message';
        messageElement.textContent = message;
        consoleOutput.appendChild(messageElement);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }, delay);
}

// Имитация загрузки системы
let delay = 0;
systemMessages.forEach((msg, index) => {
    delay += index * 500 + Math.random() * 1000;
    addSystemMessage(msg, delay);
});

// Обновление статусов каждые 10 секунд
setInterval(() => {
    const cpu = Math.floor(Math.random() * 20) + 30;
    const gpu = Math.floor(Math.random() * 25) + 50;
    const ram = (Math.random() * 4 + 6).toFixed(1);
    const fps = Math.floor(Math.random() * 10) + 55;
    const bitrate = Math.floor(Math.random() * 500) + 4000;
    const viewers = Math.floor(Math.random() * 50) + 100;
    
    addSystemMessage(`[INFO] Статус CPU: ${cpu}% | GPU: ${gpu}% | RAM: ${ram}/32GB`);
    addSystemMessage(`[INFO] FPS: ${fps} | Bitrate: ${bitrate} Kbps`);
    addSystemMessage(`[INFO] Зрителей: ${viewers} | Подписчиков: 3192`);
    addSystemMessage(`[WARN] Возможны Майнеры`);
    addSystemMessage(`[CRIT] ИГНОР PERSIKVIN`);
}, 10000);

// Случайные системные уведомления
const randomNotifications = [
    "[INFO] Новый подписчик: User_ABC",
    "[INFO] Донат: 50 руб от br3vil",
    "[INFO] Система: Проверка соединения... OK",
    "[INFO] OBS: Буфер потока стабилен",
    "[INFO] Чат: Активность высокая",
    "[WARN] Барби захватила компьютер"
];

setInterval(() => {
    if (Math.random() > 0.7) {
        const randomMsg = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        addSystemMessage(randomMsg);
    }
}, 15000);