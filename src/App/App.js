import React, { Component } from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";

// App Resources
import Home from "../components/Home";
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

// Data Provider
/*const dataProvider = jsonServerProvider(
  "https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com"
);*/
const dataProvider = api.client(Config.service.baseURL + "/apiv1");
const uploadCapableDataProvider = addUploadFeature(dataProvider);

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
  }

  render() {
    return (
      <Admin
        authProvider={authProvider}
        dashboard={Home}
        dataProvider={uploadCapableDataProvider}
        locale="es"
        i18nProvider={i18nProvider}
      >
        <Resource name="admins" icon={AdminIcon} list={AdminList} />
        <Resource
          name="organizers"
          icon={OrganizerIcon}
          list={OrganizerList}
          create={OrganizerCreate}
          edit={OrganizerEdit}
        />
        <Resource
          name="users"
          icon={UserIcon}
          list={UserList}
          create={UserCreate}
          edit={UserEdit}
        />
        <Resource
          name="events"
          icon={EventIcon}
          list={EventList}
          create={EventCreate}
          edit={EventEdit}
        />
        <Resource
          name="eventtypes"
          icon={TypeIcon}
          list={TypeList}
          create={TypeCreate}
          edit={TypeEdit}
        />
        <Resource name="provinces" />
        <Resource name="countries" />
      </Admin>
    );
  }
}
