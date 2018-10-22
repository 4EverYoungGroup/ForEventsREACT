import * as firebase from "firebase";
import * as Config from "../../App/config";

// Setup
export function setup() {
  firebase.initializeApp(Config.firebase);
  console.log("<API> Firebase Initialized!");
}
