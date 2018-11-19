import React from "react";
import {
  List,
  Filter,
  Datagrid,
  TextField,
  TextInput,
  EmailField,
  EditButton
} from "react-admin";

import { UrlField } from "../widgets";

const ResFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);

export const ResList = props => (
  <List
    {...props}
    sort={{ field: "alias", order: "ASC" }}
    filters={<ResFilter />}
  >
    <Datagrid rowClick="edit">
      <TextField source="alias" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <EmailField source="email" />
      <TextField source="profile" />
      <EditButton />
    </Datagrid>
  </List>
);
