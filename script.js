const button = document.getElementById("showBtn");
const message = document.getElementById("message");

button.addEventListener("click", () => {
    if (message.style.display === "none") {
        message.style.display = "block";
    } else {
        message.style.display = "none";
    }
});