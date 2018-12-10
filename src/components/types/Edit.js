import React from "react";
import { Edit, SimpleForm, DisabledInput, TextInput } from "react-admin";

const ResTitle = ({ record }) => {
  return <span> {record ? `Categoría "${record.name}"` : ""}</span>;
};
export const ResEdit = props => (
  <Edit {...props} title={<ResTitle />}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);
