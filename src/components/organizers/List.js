import React from "react";
import {
  List,
  Filter,
  Datagrid,
  TextInput,
  TextField,
  EmailField,
  EditButton,
  ReferenceField
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
      <TextField source="company_name" />
      <EmailField source="email" />
      <ReferenceField source="city" reference="cities">
        <TextField source="city" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);
