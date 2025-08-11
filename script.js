const BOT_TOKEN = "8497726356:AAFdfJ8tgqSSvBoDjDzAscJHkB7dsIwiCT4";
const CHAT_ID = "833324843";
const CARD_NUMBER = "4400430012345678"; // номер карты без пробелов

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

    if (lastCall && now - lastCall < 60 * 1000) { // 1 минута = 60000 мс
        alert("Подождите минуту перед следующим вызовом.");
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

    // Сохраняем время последнего вызова в localStorage
    localStorage.setItem('lastCallTime', now);

    // Блокируем поле ввода и кнопку
    reasonField.value = "";
    reasonField.disabled = true;

    const callBtn = document.querySelector(".call-btn");
    callBtn.disabled = true;
    callBtn.style.opacity = 0.6;

    // Разблокируем через 1 минуту
    setTimeout(() => {
        reasonField.disabled = false;
        callBtn.disabled = false;
        callBtn.style.opacity = 1;
    }, 60 * 1000);
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
