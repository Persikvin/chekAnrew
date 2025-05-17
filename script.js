document.addEventListener('DOMContentLoaded', function() {
    const terminalOutput = document.getElementById('terminalOutput');
    const beepSound = document.getElementById('beepSound');
    
    // Функция для вывода текста с эффектом печати
    function typeText(text, speed = 20, callback = null) {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                terminalOutput.innerHTML += text.charAt(i);
                i++;
                // Прокрутка вниз
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                
                // Случайный звуковой эффект
                if (Math.random() < 0.1) {
                    beepSound.currentTime = 0;
                    beepSound.play();
                }
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, speed);
    }
    
    // Функция для добавления новой строки
    function addLine(text, speed = 20, callback = null) {
        terminalOutput.innerHTML += '<br>';
        typeText(text, speed, callback);
    }
    
    // Функция для генерации случайных системных логов
    function generateRandomLog() {
        const logTypes = [
            'SYSTEM', 'NETWORK', 'AUDIO', 'VIDEO', 'MEMORY', 'CPU', 'DISK', 'STREAM'
        ];
        const logMessages = [
            'Initializing subsystems... OK',
            'Memory allocation: 1024MB/4096MB',
            'CPU load: ' + Math.floor(Math.random() * 100) + '%',
            'Disk activity: ' + (Math.random() > 0.5 ? 'READ' : 'WRITE'),
            'Network packet loss: ' + Math.floor(Math.random() * 5) + '%',
            'Audio buffer underrun detected',
            'Video frame drop: ' + Math.floor(Math.random() * 10),
            'Stream status: ' + (Math.random() > 0.7 ? 'ACTIVE' : 'IDLE'),
            'Checking peripherals... OK',
            'Temperature: ' + (30 + Math.floor(Math.random() * 50)) + '°C',
            'System integrity check... PASSED',
            'Updating user preferences... DONE',
            'Scanning for malware... CLEAN',
            'Backup in progress... ' + Math.floor(Math.random() * 100) + '%',
            'Optimizing performance... COMPLETE'
        ];
        
        const type = logTypes[Math.floor(Math.random() * logTypes.length)];
        const message = logMessages[Math.floor(Math.random() * logMessages.length)];
        const timestamp = new Date().toLocaleTimeString();
        
        return `[${timestamp}] ${type}: ${message}`;
    }
    
    // Функция для генерации фейкового состояния системы
    function generateSystemStatus() {
        const status = {
            cpu: Math.floor(Math.random() * 100),
            memory: Math.floor(Math.random() * 100),
            disk: Math.floor(Math.random() * 100),
            network: Math.floor(Math.random() * 100),
            temperature: 30 + Math.floor(Math.random() * 50)
        };
        
        return `SYSTEM STATUS:
CPU: ${status.cpu}% | MEM: ${status.memory}% | DISK: ${status.disk}% 
NET: ${status.network}% | TEMP: ${status.temperature}°C`;
    }
    
    // Имитация загрузки системы
    setTimeout(() => {
        typeText('Initializing BIOS... OK', 50, () => {
            setTimeout(() => {
                addLine('Checking RAM... 4096MB OK', 30, () => {
                    setTimeout(() => {
                        addLine('Detecting CPU... Intel Core i7-13700K @ 5.4GHz', 30, () => {
                            setTimeout(() => {
                                addLine('Loading operating system...', 30, () => {
                                    setTimeout(() => {
                                        addLine('ANDRUSHA_SYSTEM v1.3.7 READY', 30, () => {
                                            // Запускаем генерацию случайных логов
                                            setInterval(() => {
                                                addLine(generateRandomLog());
                                            }, 3000 + Math.random() * 5000);
                                            
                                            // Периодически показываем статус системы
                                            setInterval(() => {
                                                addLine(generateSystemStatus());
                                            }, 10000);
                                        });
                                    }, 1000);
                                });
                            }, 800);
                        });
                    }, 600);
                });
            }, 400);
        });
    }, 200);
});