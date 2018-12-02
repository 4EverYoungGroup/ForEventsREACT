import React from "react";
import {
  List,
  Filter,
  Datagrid,
  TextField,
  TextInput,
  DateField,
  ReferenceField,
  BooleanField,
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
    sort={{ field: "begin_date", order: "DESC" }}
    filters={<ResFilter />}
  >
    <Datagrid rowClick="edit">
      <ReferenceField source="organizer" reference="organizers">
        <TextField source="email" />
      </ReferenceField>
      <DateField source="begin_date" />
      <TextField source="name" />
      <ReferenceField source="event_type" reference="eventtypes">
        <TextField source="name" />
      </ReferenceField>
      <BooleanField source="active" />

      <ReferenceField source="city" reference="cities">
        <TextField source="city" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);
