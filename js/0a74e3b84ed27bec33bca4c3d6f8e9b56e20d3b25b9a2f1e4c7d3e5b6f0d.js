import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8eA_D3BcJpJU0QSEZdd_ql3KiJi9RFnk",
  authDomain: "marion-data.firebaseapp.com",
  projectId: "marion-data",
  storageBucket: "marion-data.firebasestorage.app",
  messagingSenderId: "521478249359",
  appId: "1:521478249359:web:51559fb0161f4f073409fa",
  measurementId: "G-S5BWCZYKPV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user && (window.location.pathname === "/login" || window.location.pathname === "/register")) {
    window.location.href = "/home";
  }
  if (!user && window.location.pathname === "/home") {
    window.location.href = "/login";
  }
});

const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => window.location.href = "/home")
      .catch((error) => {
        const errorMessage = error.code === 'auth/email-already-in-use' ? "Email already in use" : "Error creating account";
        document.getElementById('error-message').innerText = errorMessage;
      });
  });
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => window.location.href = "home")
      .catch((error) => {
        const errorMessage = error.code === 'auth/wrong-password' ? "Incorrect password" : error.code === 'auth/user-not-found' ? "User not found" : "Error logging in";
        document.getElementById('error-message').innerText = errorMessage;
      });
  });
}

const logoutButton = document.getElementById('logout-btn');
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => window.location.href = "/login");
  });
}
