const BOT_TOKEN = "8497726356:AAFdfJ8tgqSSvBoDjDzAscJHkB7dsIwiCT4";
const CHAT_ID = "833324843";
const CARD_NUMBER = "4400430222701341"; // номер карты без пробелов

let timerInterval;

function sendMessage(text) {
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text
        })
    });
}

function callSound() {
    const lastCall = localStorage.getItem('lastCallTime');
    const now = Date.now();

    if (lastCall && now - lastCall < 60 * 1000) {
        const waitTime = 60 - Math.floor((now - lastCall) / 1000);
        showTimerMessage(waitTime);
        return;
    }

    const vip = document.getElementById("vip").value;
    const reasonField = document.getElementById("reason");
    const reason = reasonField.value.trim();

    if (reason === "") {
        alert("Пожалуйста, укажите причину вызова (не только пробелы).");
        return;
    }

    const message = `🔊 Вызов звукача\nVIP: ${vip}\nПричина: ${reason}`;
    sendMessage(message);

    alert("Звукач вызван!");

    localStorage.setItem('lastCallTime', now);

    reasonField.value = "";
    reasonField.disabled = true;

    const callBtn = document.querySelector(".call-btn");
    callBtn.disabled = true;
    callBtn.style.opacity = 0.6;

    showTimerMessage(60);

    setTimeout(() => {
        reasonField.disabled = false;
        callBtn.disabled = false;
        callBtn.style.opacity = 1;
        hideTimerMessage();
    }, 60 * 1000);
}

function showTimerMessage(seconds) {
    clearInterval(timerInterval);
    const timerMessage = document.getElementById("timerMessage");
    const countdown = document.getElementById("countdown");
    countdown.textContent = seconds;
    timerMessage.style.display = "block";

    timerInterval = setInterval(() => {
        seconds--;
        if (seconds <= 0) {
            hideTimerMessage();
            clearInterval(timerInterval);
        } else {
            countdown.textContent = seconds;
        }
    }, 1000);
}

function hideTimerMessage() {
    const timerMessage = document.getElementById("timerMessage");
    timerMessage.style.display = "none";
}

function leaveTip() {
    document.getElementById("cardModal").style.display = "flex";
}

function copyCard() {
    navigator.clipboard.writeText(CARD_NUMBER).then(() => {
        alert("Номер карты скопирован! Откройте Kaspi и вставьте его.");
        const vip = document.getElementById("vip").value;
        const message = `💰 ${vip} хочет оставить чаевые`;
        sendMessage(message);
    });
}

function closeModal() {
    document.getElementById("cardModal").style.display = "none";
}

