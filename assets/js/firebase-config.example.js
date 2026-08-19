/* ============================================================
   Firebase Configuration — Nurul & Fahri Wedding Guestbook
   ============================================================
   
   SETUP:
   1. Buat project Firebase di https://console.firebase.google.com
   2. Aktifkan Realtime Database (region: asia-southeast1)
   3. Isi konfigurasi di bawah dengan nilai dari Firebase Console
   4. Terapkan security rules di Firebase Console → Database → Rules:
      {
        "rules": {
          "guestbook": {
            ".read": true,
            ".write": true,
            "$entry": {
              ".validate": "newData.hasChildren(['nama', 'pesan', 'ts', 'divisi'])
                            && newData.child('nama').isString()
                            && newData.child('nama').val().length > 0
                            && newData.child('nama').val().length <= 40
                            && newData.child('pesan').isString()
                            && newData.child('pesan').val().length > 0
                            && newData.child('pesan').val().length <= 300
                            && newData.child('ts').isNumber()
                            && newData.child('divisi').isString()
                            && newData.child('divisi').val().length <= 30"
            }
          }
        }
      }
   
   Ini adalah TEMPLATE. Copy file ini menjadi `firebase-config.js` di folder
   yang sama, isi dengan nilai asli dari Firebase Console. `firebase-config.js`
   sudah di-gitignore sehingga kredensial asli tidak akan pernah ter-commit.
   ============================================================ */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
