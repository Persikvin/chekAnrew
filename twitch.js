
socket.onopen = function() {
  addLine('[SYSTEM] Подключение к Twitch...');
  this.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
  this.send('PASS justinfan12345');
  this.send('NICK justinfan12345');
  this.send('JOIN #andrusha_wav');
};

socket.onmessage = function(event) {
  try {
    const data = event.data;

    // Обработка сообщений чата
    if (data.includes('PRIVMSG')) {
      const parts = data.split(';');
      const userTag = parts.find(p => p.startsWith('display-name='));
      const user = userTag ? cleanText(userTag.split('=')[1]) : 'Аноним';
      const message = cleanText(data.split('PRIVMSG #andrusha_wav :')[1]);

      addLine(`[CHAT] ${user}: ${message}`);
    }

    // Ответ на PING
    if (data.startsWith('PING')) {
      this.send('PONG :tmi.twitch.tv');
    }
  } catch (e) {
    console.error('Ошибка обработки сообщения:', e);
  }
};

// Системные сообщения
setInterval(function() {
  const messages = [
    "[SYSTEM] CPU: " + Math.floor(20 + Math.random() * 60) + "%",
    "[SYSTEM] RAM: " + Math.floor(2 + Math.random() * 6) + "GB/" + Math.floor(8 + Math.random() * 8) + "GB",
    "[SYSTEM] Антивирус: Активен",
    "[SYSTEM] Сеть: Стабильная"
  ];
  addLine(messages[Math.floor(Math.random() * messages.length)]);
}, 8000);
