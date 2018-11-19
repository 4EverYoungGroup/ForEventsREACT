import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  EditButton
} from "react-admin";

export const ResList = props => (
  <List {...props} sort={{ field: "begin_date", order: "DESC" }}>
    <Datagrid rowClick="edit">
      <ReferenceField source="organizer" reference="organizers">
        <TextField source="email" />
      </ReferenceField>
      <DateField source="begin_date" />
      <TextField source="name" />
      <ReferenceField source="event_type" reference="eventtypes">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="city" />
      <EditButton />
    </Datagrid>
  </List>
);
