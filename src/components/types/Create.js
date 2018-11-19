import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

export const ResCreate = props => (
  <Create {...props}>
    <SimpleForm redirect={"/eventtypes"}>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);
