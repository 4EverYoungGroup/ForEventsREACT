import React from "react";
import { List, Datagrid, TextField, EmailField } from "react-admin";

import { UrlField } from "../widgets";

export const ResList = props => (
  <List {...props} sort={{ field: "alias", order: "ASC" }}>
    <Datagrid rowClick="edit">
      <TextField source="alias" />
      <TextField source="first_name" />

      <EmailField source="email" />
      <TextField source="profile" />
    </Datagrid>
  </List>
);
