function appendMessage(role, text) {
    const chatbox = document.getElementById("chatbox");
    const message = document.createElement("div");
    message.classList.add("message", role);
    message.textContent = text;
    chatbox.appendChild(message);
    chatbox.scrollTop = chatbox.scrollHeight;
}

document.getElementById("send-button").addEventListener("click", function() {
    const filename = document.getElementById("filename").value;
    const question = document.getElementById("user-input").value;
    const loading = document.getElementById("loading");

    if (!filename) {
        alert("Veuillez entrer un nom de fichier.");
        return;
    }
    if (!question) {
        alert("Veuillez poser une question.");
        return;
    }

    loading.style.display = "block";
    appendMessage("user", question);
    document.getElementById("user-input").value = "";

    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: filename, question: question })
    })
    .then(response => response.json())
    .then(data => {
        loading.style.display = "none";
        appendMessage("bot", data.response || "Une erreur s'est produite.");
    })
    .catch(error => {
        loading.style.display = "none";
        console.error("Erreur :", error);
    });
});
