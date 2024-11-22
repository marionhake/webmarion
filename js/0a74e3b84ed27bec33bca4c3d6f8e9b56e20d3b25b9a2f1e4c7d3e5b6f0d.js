import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateEmail, 
  updatePhoneNumber, 
  onAuthStateChanged, 
  sendPasswordResetEmail, 
  updatePassword 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8eA_D3BcJpJU0QSEZdd_ql3KiJi9RFnk",
  authDomain: "marion-data.firebaseapp.com",
  projectId: "marion-data",
  storageBucket: "marion-data.firebasestorage.app",
  messagingSenderId: "521478249359",
  appId: "1:521478249359:web:51559fb0161f4f073409fa",
  measurementId: "G-S5BWCZYKPV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user && (window.location.pathname === "/login" || window.location.pathname === "/register")) {
    window.location.href = "/home";
  }
  if (!user && (window.location.pathname === "/home" || window.location.pathname === "/settings")) {
    window.location.href = "/login";
  }
});

const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    if (!email || !password) {
      document.getElementById("error-message").innerText = "Please fill out both fields.";
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "/home";
      })
      .catch((error) => {
        document.getElementById("error-message").innerText = getErrorMessage(error);
      });
  });
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
      document.getElementById("error-message").innerText = "Please fill out both fields.";
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "/home";
      })
      .catch((error) => {
        document.getElementById("error-message").innerText = getErrorMessage(error);
      });
  });
}

const logoutButton = document.getElementById("logout-btn");
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "/login";
    });
  });
}

const forgotPasswordForm = document.getElementById("forgot-password-form");
if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("forgot-password-email").value;

    if (!email) {
      document.getElementById("forgot-error-message").innerText = "Please enter your email.";
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        document.getElementById("forgot-error-message").innerText = "Password reset email sent.";
        document.getElementById("forgot-error-message").style.color = "green";
      })
      .catch((error) => {
        document.getElementById("forgot-error-message").innerText = getErrorMessage(error);
      });
  });
}

const addPhoneForm = document.getElementById("add-phone-form");
if (addPhoneForm) {
  addPhoneForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const phoneNumber = document.getElementById("phone-number").value;
    if (!phoneNumber) {
      document.getElementById("error-message").innerText = "Please enter a phone number.";
      return;
    }
    try {
      await updatePhoneNumber(auth.currentUser, { phoneNumber });
      document.getElementById("success-message").innerText = "Phone number added successfully.";
    } catch (error) {
      document.getElementById("error-message").innerText = getErrorMessage(error);
    }
  });
}

const addEmailForm = document.getElementById("add-email-form");
if (addEmailForm) {
  addEmailForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newEmail = document.getElementById("new-email").value;
    if (!newEmail) {
      document.getElementById("error-message").innerText = "Please enter a new email.";
      return;
    }
    try {
      await updateEmail(auth.currentUser, newEmail);
      document.getElementById("success-message").innerText = "Email added successfully.";
    } catch (error) {
      document.getElementById("error-message").innerText = getErrorMessage(error);
    }
  });
}

function getErrorMessage(error) {
  let errorMessage = "An error occurred. Please try again.";
  switch (error.code) {
    case "auth/email-already-in-use":
      errorMessage = "The email address is already in use by another account.";
      break;
    case "auth/invalid-email":
      errorMessage = "The email address is not valid.";
      break;
    case "auth/weak-password":
      errorMessage = "The password is too weak. It must be at least 6 characters.";
      break;
    case "auth/wrong-password":
      errorMessage = "The password is incorrect.";
      break;
    case "auth/user-not-found":
      errorMessage = "No user found with this email address.";
      break;
    default:
      errorMessage = "Something went wrong. Please try again later.";
      break;
  }
  return errorMessage;
}
