import React from "react";
import { List, Datagrid, TextField, EmailField } from "react-admin";

export const ResList = props => (
  <List {...props} sort={{ field: "alias", order: "ASC" }}>
    <Datagrid rowClick="edit">
      <TextField source="alias" />
      <TextField source="first_name" />

      <EmailField source="email" />
    </Datagrid>
  </List>
);
