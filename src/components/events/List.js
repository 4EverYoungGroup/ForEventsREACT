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

export const ResList = ({ permissions, ...props }) => (
  <List
    {...props}
    sort={{ field: "begin_date", order: "DESC" }}
    filters={<ResFilter />}
  >
    <Datagrid rowClick="edit">
      {permissions === "admin_bck" && (
        <ReferenceField source="organizer" reference="organizers">
          <TextField source="email" />
        </ReferenceField>
      )}
      <DateField source="begin_date" />
      <TextField source="name" />
      <ReferenceField source="event_type" reference="eventtypes">
        <TextField source="name" />
      </ReferenceField>
      <BooleanField source="active" />
      <TextField source="city" />
      <EditButton />
    </Datagrid>
  </List>
);
