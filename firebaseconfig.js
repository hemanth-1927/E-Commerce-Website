// Ensure Firebase is available before using it
if (typeof firebase === "undefined") {
    console.error("Firebase SDK not loaded!");
} else {
    const firebaseConfig = {
        apiKey: "AIzaSyAckZH7BfMwAvnEH6l2EtL8flTQ6f2QrwY",
        authDomain: "urproject-6fc8d.firebaseapp.com",
        projectId: "urproject-6fc8d",
        storageBucket: "urproject-6fc8d.firebasestorage.app",
        messagingSenderId: "610178179951",
        appId: "1:610178179951:web:2e9cee93a4098d53e47e9a",
        measurementId: "G-YPPXNEFX8T"
      };

    // Initialize Firebase only if not already initialized
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    // Define auth and db
    const auth = firebase.auth();
    const db = firebase.firestore();

    console.log("Firebase Initialized Successfully");
}
