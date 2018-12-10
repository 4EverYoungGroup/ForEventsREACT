import React, { Component } from "react";
import createHistory from "history/createHashHistory";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import { createMuiTheme } from "@material-ui/core/styles";

// App Resources
import { Login } from "../components/auth";
import { AdminIcon, AdminList } from "../components/admins";
import {
  OrganizerIcon,
  OrganizerList,
  OrganizerCreate,
  OrganizerEdit
} from "../components/organizers";
import { UserIcon, UserList, UserCreate, UserEdit } from "../components/users";
import { TypeIcon, TypeList, TypeCreate, TypeEdit } from "../components/types";
import {
  EventIcon,
  EventList,
  EventEdit,
  EventCreate
} from "../components/events";

// Config File
import * as Config from "./cfg";

// API :: REST Service (Data & Auth Provider) + Firebase (Image Uploading Storage)
import * as api from "../api";
import addUploadFeature from "../api/client2/addUploadFeature";
import authProvider from "../api/auth";

// Utilities
import * as JSON from "../utils/JSON";

// i18N Provider
import stdSpanishMessages from "ra-language-spanish";
import jsonServerProvider from "ra-data-json-server";
import * as resources from "../i18n";
const messages = {
  es: {
    ra: JSON.mergeObjects(stdSpanishMessages.ra, resources.es.ra),
    resources: resources.es.resources,
    ...resources.es.app
  }
};
const i18nProvider = locale => messages[locale];

// History
let history = null;
if (Config.app.basename === "") history = createHistory();
else history = createHistory({ basename: Config.app.basename });

// Data Provider
/*const dataProvider = jsonServerProvider(
  "https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com"
);*/
const dataProvider = api.client(Config.service.baseURL + "/apiv1");
const uploadCapableDataProvider = addUploadFeature(dataProvider);

// Theming
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    secondary: {
      //main: "#ff9f06",
      main: "#cc830f",
      contrastText: "#fff"
      //contrastText: "#222"
    }
  }
});

// App
/*<Resource
  name="posts"
  icon={PostIcon}
  list={PostList}
  edit={PostEdit}
  create={PostCreate}
/> */
export default class App extends Component {
  componentWillMount() {
    api.setup(Config.service, Config.firebase);
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
  }

  render() {
    return (
      <Admin
        authProvider={authProvider}
        dataProvider={uploadCapableDataProvider}
        locale="es"
        i18nProvider={i18nProvider}
        history={history}
        loginPage={Login}
        theme={theme}
      >
        {permissions => [
          permissions === "admin" ? (
            <Resource name="admins" icon={AdminIcon} list={AdminList} />
          ) : null,
          permissions === "admin" ? (
            <Resource
              name="organizers"
              icon={OrganizerIcon}
              list={OrganizerList}
              create={OrganizerCreate}
              edit={OrganizerEdit}
            />
          ) : null,
          permissions === "admin" ? (
            <Resource
              name="users"
              icon={UserIcon}
              list={UserList}
              create={UserCreate}
              edit={UserEdit}
            />
          ) : null,
          <Resource
            name="events"
            icon={EventIcon}
            list={EventList}
            create={EventCreate}
            edit={EventEdit}
          />,

          permissions === "admin" ? (
            <Resource
              name="eventtypes"
              icon={TypeIcon}
              list={TypeList}
              create={TypeCreate}
              edit={TypeEdit}
            />
          ) : null,
          permissions === "organizer" ? <Resource name="eventtypes" /> : null,
          <Resource name="cities" />,
          <Resource name="provinces" />,
          <Resource name="countries" />
        ]}
      </Admin>
    );
  }
}
