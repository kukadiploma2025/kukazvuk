const BOT_TOKEN = "8497726356:AAFdfJ8tgqSSvBoDjDzAscJHkB7dsIwiCT4";
const CHAT_ID = "833324843";
const CARD_NUMBER = "4400430012345678"; // номер карты без пробелов

let canSend = true;

function callSound() {
    if (!canSend) {
        alert("Подождите немного, прежде чем отправить следующий вызов.");
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

    const icon = document.querySelector(".call-btn .icon");
    icon.style.animation = "pulse 0.4s infinite";
    setTimeout(() => icon.style.animation = "pulse 1.2s infinite", 2000);

    alert("Звукач вызван!");

    reasonField.value = "";
    reasonField.disabled = true;

    canSend = false;
    setTimeout(() => {
        canSend = true;
        reasonField.disabled = false;
    }, 2 * 60 * 1000);
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
