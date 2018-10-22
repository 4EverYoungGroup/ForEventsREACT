import * as Service from "./service";
import * as Firebase from "./firebase";

export { Service, Firebase };

// Setup
export function setup() {
  Service.setup();
  Firebase.setup();
}
