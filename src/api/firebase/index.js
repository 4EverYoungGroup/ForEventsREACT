import * as firebase from "firebase";

// Setup
export const setup = firebaseConfig => {
  firebase.initializeApp(firebaseConfig);
  firebase
    .auth()
    .signInAnonymously()
    .catch(function(error) {});
  console.log("<APIFirebase> Firebase Initialized!");
};

// Upload File
export const upload = file =>
  firebase
    .storage()
    .ref()
    .child("images/" + new Date().getTime() + "_" + file.name)
    .put(file, {
      contentType: file.type
    })
    .then(snapshot => snapshot.ref.getDownloadURL());
