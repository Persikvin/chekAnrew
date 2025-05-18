const terminalOutput = document.getElementById('terminalOutput');

function typeText(text, speed = 20, callback = null) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            terminalOutput.innerHTML += text.charAt(i);
            i++;
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, speed);
}

function addLine(text, speed = 20, callback = null) {
    terminalOutput.innerHTML += '<br>';
    typeText(text, speed, callback);
}

// Имитация загрузки системы
setTimeout(() => {
    typeText('Initializing BIOS... OK', 50, () => {
        setTimeout(() => {
            addLine('Checking RAM... 4096MB OK', 30, () => {
                setTimeout(() => {
                    addLine('Detecting CPU... Intel Core i7-13700K @ 5.4GHz', 30, () => {
                        setTimeout(() => {
                            addLine('ANDREW_SYSTEM v1.3.7 READY', 30);
                        }, 1000);
                    });
                }, 800);
            });
        }, 400);
    });
}, 200);
// Фейковые системные сообщения
function generateSystemStatus() {
  const statusMessages = [
    `[SYSTEM] Проверка антивируса: ${Math.random() > 0.3 ? '✅ Угроз не найдено' : '⚠️ Обнаружен RiskWare (Удалено)'}`,
    `[SYSTEM] Донаты: ${Math.random() > 0.6 ? '💰 TRUE (Новый донат!)' : '❌ FALSE'}`,
    `[SYSTEM] CPU: ${Math.floor(20 + Math.random() * 60)}% (${Math.random() > 0.7 ? 'Перегрев!' : 'Норма'})`,
    `[SYSTEM] RAM: ${Math.floor(2 + Math.random() * 6)}GB/${Math.floor(8 + Math.random() * 8)}GB`,
    `[SYSTEM] Диск C: ${Math.floor(30 + Math.random() * 60)}% заполнен`,
    `[SYSTEM] Сеть: ${Math.random() > 0.8 ? '⚠️ Высокий пинг' : 'Стабильно'}`,
    `[SYSTEM] Процессы: ${Math.floor(80 + Math.random() * 200)} (${Math.random() > 0.9 ? 'Обнаружен майнер! 🚨' : 'Норма'})`
  ];
  
  // Специальные события (редкие)
  const rareEvents = [
    '[CRITICAL] Обнаружен троян: Trojan.Win32.Generic!',
    '[ALERT] Кто-то пытается взломать систему!',
    '[MINING] Запущен скрытый майнинг Bitcoin...',
    '[SYSTEM] Андрей забыл выключить микрофон!'
  ];
  
  // 10% шанс на редкое событие
  return Math.random() > 0.9 
    ? rareEvents[Math.floor(Math.random() * rareEvents.length)]
    : statusMessages[Math.floor(Math.random() * statusMessages.length)];
}

// Запуск мониторинга
function startSystemMonitoring() {
  // Первый статус сразу
  addLine(generateSystemStatus());
  
  // Интервал 5-15 секунд
  setInterval(() => {
    addLine(generateSystemStatus());
  }, 5000 + Math.random() * 10000);
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  startSystemMonitoring();
  
  // Пробуем подключиться к Twitch (WebSocket-версия)
  try {
    const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
    
    socket.onopen = () => {
      socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
      socket.send('PASS justinfan12345');
      socket.send('NICK justinfan12345');
      socket.send('JOIN #andrusha_wav');
      addLine('[SYSTEM] Twitch чат подключен!');
    };
    
    socket.onmessage = (event) => {
      if (event.data.includes('PRIVMSG')) {
        const user = event.data.split('display-name=')[1]?.split(';')[0] || 'Аноним';
        const msg = event.data.split('PRIVMSG #andrusha_wav :')[1];
        addLine(`[CHAT] ${user}: ${msg}`);
      }
      if (event.data.startsWith('PING')) {
        socket.send('PONG :tmi.twitch.tv');
      }
    };
    
      // Делаем функцию доступной глобально
      window.addLine = function(text) {
          const terminalOutput = document.getElementById('terminalOutput');
          const line = document.createElement('div');
          line.textContent = text;
          terminalOutput.appendChild(line);
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
          // Глобальная функция для вывода текста
          window.addLine = function(text) {
              const terminal = document.getElementById('terminalOutput');
              const line = document.createElement('div');

              // Очистка текста перед выводом
              line.textContent = cleanText(text);
              terminal.appendChild(line);

              // Автопрокрутка
              terminal.scrollTop = terminal.scrollHeight;
          };

// Функция очистки текста
          function cleanText(text) {
              return String(text)
                  .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Удаляем управляющие символы
                  .replace(/[^\w\u0400-\u04FF\s.,!?@#$%^&*()\-+=:;'"<>{}[\]|\\\/]/gu, '') // Разрешаем только безопасные символы
                  .replace(/\s+/g, ' ') // Убираем лишние пробелы
                  .trim()
                  .slice(0, 300); // Ограничение длины
          }

// Инициализация
          document.addEventListener('DOMContentLoaded', function() {
              addLine('> Система инициализирована');

              function cleanText(text) {
                  return String(text)
                      .normalize('NFKC') // Нормализация Unicode
                      .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Удаляем управляющие символы
                      .replace(/[^\w\u0400-\u04FF\s.,!?\-+=:;'"@#$%^&*()]/gu, '') // Безопасные символы
                      .replace(/\s+/g, ' ')
                      .trim();
              }
          });
      }
  }
});