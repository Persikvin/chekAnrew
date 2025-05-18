// Системные сообщения и статусы
const systemMessages = [
    "> Проверка оборудования... OK",
    "> Загрузка драйверов... OK",
    "> Инициализация сети... OK",
    "> Проверка подключения к Twitch... OK",
    "> Загрузка OBS... OK",
    "> Проверка микрофона... OK",
    "> Проверка камеры... OK",
    "> Загрузка игрового клиента... OK",
    "> Система готова к стриму",
    "> Статус CPU: 45% | GPU: 62% | RAM: 7.2/16GB",
    "> FPS: 58-62 | Bitrate: 4500 Kbps",
    "> Зрителей: 127 | Подписчиков: 342",
    "> Последний донат: 100 руб от User123"
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
    
    addSystemMessage(`> Статус CPU: ${cpu}% | GPU: ${gpu}% | RAM: ${ram}/16GB`);
    addSystemMessage(`> FPS: ${fps} | Bitrate: ${bitrate} Kbps`);
    addSystemMessage(`> Зрителей: ${viewers} | Подписчиков: 342`);
}, 10000);

// Случайные системные уведомления
const randomNotifications = [
    "> Новый подписчик: User_ABC",
    "> Донат: 50 руб от ViewerXYZ",
    "> Система: Проверка соединения... OK",
    "> OBS: Буфер потока стабилен",
    "> Чат: Активность высокая"
];

setInterval(() => {
    if (Math.random() > 0.7) {
        const randomMsg = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        addSystemMessage(randomMsg);
    }
}, 15000);