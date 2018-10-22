import * as firebase from "firebase";
import * as Config from "../../App/cfg";

// Setup
export function setup() {
  firebase.initializeApp(Config.firebase);
  console.log("<API> Firebase Initialized!");
}
