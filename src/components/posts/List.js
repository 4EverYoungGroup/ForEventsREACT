import React from "react";
import {
  List,
  Filter,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  TextInput,
  ReferenceInput,
  SelectInput
} from "react-admin";

const ResFilter = props => (
  <Filter {...props}>
    <TextInput label="Buscar..." source="q" alwaysOn />
    <ReferenceInput
      label="Usuario"
      source="userId"
      reference="users"
      allowEmpty
    >
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

export const ResList = props => (
  <List filters={<ResFilter />} {...props}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="userId" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
);
