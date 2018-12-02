import React from "react";
import {
  List,
  Filter,
  Datagrid,
  TextInput,
  TextField,
  EmailField,
  EditButton
} from "react-admin";

const ResFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);

export const ResList = props => (
  <List
    {...props}
    sort={{ field: "company", order: "ASC" }}
    filters={<ResFilter />}
  >
    <Datagrid rowClick="edit">
      <TextField source="company" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <EmailField source="email" />
      <TextField source="profile" />
      <EditButton />
    </Datagrid>
  </List>
);
