/* ============================================================
   Firebase Configuration — Nurul & Fahri Wedding Guestbook
   ============================================================
   
   SETUP:
   1. Buat project Firebase di https://console.firebase.google.com
   2. Aktifkan Realtime Database
   3. Isi konfigurasi di bawah dengan nilai dari Firebase Console
   4. Terapkan security rules (lihat PRD bagian 7.3):
      {
        "rules": {
          "guestbook": {
            ".read": true,
            ".write": true,
            "$entry": {
              ".validate": "newData.hasChildren(['nama', 'pesan', 'timestamp'])"
            }
          }
        }
      }
   
   JANGAN commit file ini dengan kredensial asli ke repo publik.
   Gunakan environment variable atau .env di production.
   ============================================================ */

// TODO: Ganti dengan konfigurasi Firebase project Anda
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Uncomment baris di bawah setelah mengisi konfigurasi dan menambah
// Firebase SDK (<script src="https://www.gstatic.com/firebasejs/10.x/firebase-app-compat.js">)
// di index.html sebelum file ini.

// firebase.initializeApp(firebaseConfig);
// const db = firebase.database();
