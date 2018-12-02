import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from "react-admin";
import { service } from "..";

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    return service
      .login(username, password)
      .then(response => {
        console.log("<AuthProvider> Response response=%o", response);
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.user._id);
        localStorage.setItem("role", response.data.user.profile);
      })
      .catch(function({ config, request, response }) {
        console.log(
          "<AuthProvider> Exception caught, args=%o, config=%o, request=%o, response=%o",
          arguments,
          config,
          request,
          response
        );
        throw new Error(response.data.message);
      });
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    const status = params.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      return Promise.reject();
    }
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  }
  return Promise.resolve();
};
