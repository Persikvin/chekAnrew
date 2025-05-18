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

function addLine(text) {
    const line = document.createElement('div');
    line.textContent = text;
    terminalOutput.appendChild(line);
    
    // Три разных способа прокрутки (для максимальной совместимости)
    terminalOutput.scrollTo({
        top: terminalOutput.scrollHeight,
        behavior: 'smooth'
    });
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    line.scrollIntoView({ behavior: 'smooth', block: 'end' });
    
    // Добавляем небольшой таймаут для гарантированной прокрутки
    setTimeout(() => {
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }, 100);
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