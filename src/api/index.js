import * as service from "./service";
import * as firebase from "./firebase";
import client from "./client2";

export { service, firebase, client };

// Setup
export const setup = (serviceConfig, firebaseConfig) => {
  service.setup(serviceConfig);
  firebase.setup(firebaseConfig);
};
