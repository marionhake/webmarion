import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyC8eA_D3BcJpJU0QSEZdd_ql3KiJi9RFnk",
    authDomain: "marion-data.firebaseapp.com",
    projectId: "marion-data",
    storageBucket: "marion-data.firebasestorage.app",
    messagingSenderId: "521478249359",
    appId: "1:521478249359:web:51559fb0161f4f073409fa",
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "home";
  }
});

const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('Sign-up successful! Redirecting to home page...');
        window.location.href = "home";
      })
      .catch((error) => {
        alert(error.message);
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
      .then((userCredential) => {
        alert('Login successful! Redirecting to home page...');
        window.location.href = "home";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}
