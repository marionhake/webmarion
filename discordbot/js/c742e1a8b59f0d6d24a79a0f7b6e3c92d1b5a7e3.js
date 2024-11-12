document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const buyButton = document.getElementById('buyButton');
    const statusDiv = document.getElementById('status');

    loginButton.onclick = () => {
        window.location.href = '/login';
    };

    buyButton.onclick = async () => {
        alert("Redirecting to payment...");
    };
});
