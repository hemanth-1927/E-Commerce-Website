// ✅ Ensure Firebase is initialized first
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// ✅ Declare `auth` and `db` before using them
const auth = firebase.auth();
const db = firebase.firestore();

// Register User
function register() {
    let name = document.getElementById("name").value;
    let mobile = document.getElementById("mobile").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    if (!email.includes("@")) {
        message.innerText = "Invalid email format!";
        return;
    }
    if (password.length < 6) {
        message.innerText = "Password must be at least 6 characters!";
        return;
    }
    if (mobile.length < 10){
        message.innerText="number must be 10 digits";
        return;
    }

    // ✅ Now `auth` is defined before usage
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            return db.collection("users").doc(user.uid).set({
                name: name,
                mobile: mobile,
                email: email,
                uid: user.uid
            });
        })
        .then(() => {
            message.innerText = "Registration Successful!";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        })
        .catch((error) => {
            message.innerText = error.message;
        });
}

// Login User
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "ecommerce.html";
        })
        .catch((error) => {
            message.innerText = error.message;
        });
}


// Check User Authentication Status
auth.onAuthStateChanged((user) => {
    if (user && document.getElementById("user-name")) {
        db.collection("users").doc(user.uid).get().then((doc) => {
            document.getElementById("user-name").innerText = doc.data().name;
        });
    } else if (!user && window.location.pathname.includes("logout.html")) {
        window.location.href = "login.html";
    }
});




