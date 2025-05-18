async function getStreamInfo() {
    const channelName = 'andrusha_wav';
    
    try {
        // Используем неофициальный API-эндпоинт
        const response = await fetch(`https://twitch-tracker.ajax-lives.com/api/channels/${channelName}`);
        const data = await response.json();
        
        return {
            isLive: data.is_live,
            viewers: data.viewers || 0,
            followers: data.followers || 0
        };
    } catch (e) {
        console.error("Ошибка:", e);
        return { isLive: false, viewers: 0, followers: 0 };
    }
}

// Обновляем данные каждые 30 секунд
async function updateStats() {
    const { isLive, viewers, followers } = await getStreamInfo();
    
    // Добавляем данные в консоль
    const consoleOutput = document.getElementById('consoleOutput');
    const statsElement = document.createElement('div');
    statsElement.className = 'system-message';
    statsElement.innerHTML = `> Статус: <span style="color: ${isLive ? '#0f0' : '#f00'}">${isLive ? 'ONLINE' : 'OFFLINE'}</span> | Зрители: ${viewers} | Подписчики: ${followers}`;
    
    // Удаляем предыдущий статус
    const oldStats = document.querySelector('.stats-message');
    if (oldStats) oldStats.remove();
    
    statsElement.classList.add('stats-message');
    consoleOutput.appendChild(statsElement);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Запускаем обновление
updateStats();
setInterval(updateStats, 30000); // Каждые 30 секунд