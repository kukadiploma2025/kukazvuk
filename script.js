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

    // Очищаем и блокируем поле сообщения
    reasonField.value = "";
    reasonField.disabled = true;

    // Блокируем кнопку вызова
    const callBtn = document.querySelector(".call-btn");
    callBtn.disabled = true;
    callBtn.style.opacity = 0.6; // визуально показать блокировку

    canSend = false;

    setTimeout(() => {
        canSend = true;
        reasonField.disabled = false;
        callBtn.disabled = false;
        callBtn.style.opacity = 1;
    }, 2 * 60 * 1000);
}
