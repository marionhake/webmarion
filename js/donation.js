document.addEventListener("DOMContentLoaded", () => {
    const donateButton = document.getElementById("donate-button");
    const popup = document.getElementById("donation-popup");
    const closeButton = document.getElementById("close-popup");
    const payButton = document.getElementById("pay-button");
    const amountInput = document.getElementById("amount");
    const messageInput = document.getElementById("message");
    const emotes = document.getElementById("emotes");
    let selectedEmote = "";

    // Show popup
    donateButton.addEventListener("click", () => {
        popup.classList.remove("hidden");
    });


    closeButton.addEventListener("click", () => {
        popup.classList.add("hidden");
    });


    emotes.addEventListener("click", (event) => {
        if (event.target.tagName === "IMG") {
            selectedEmote = event.target.dataset.emote;
            Array.from(emotes.children).forEach(img => img.classList.remove("selected"));
            event.target.classList.add("selected");
        }
    });


    payButton.addEventListener("click", () => {
        const amount = parseFloat(amountInput.value);
        const message = messageInput.value;

        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid donation amount.");
            return;
        }

 
        const paypalUrl = `https://www.paypal.com/donate?business=mmarios756@gmail.com&currency_code=USD&amount=${amount}&message=${encodeURIComponent(message)}&emote=${encodeURIComponent(selectedEmote)}`;
        window.open(paypalUrl, "_blank");
    });
});