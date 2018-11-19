import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput
} from "react-admin";

export const ResCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="idn" />
      <TextInput source="company_name" />
      <TextInput source="alias" />
      <TextInput source="email" />
      <TextInput source="password" />
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="address" />
      <TextInput source="zip_code" />
      <TextInput source="city" />
      <ReferenceInput source="province" reference="provinces">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="country" reference="countries">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="mobile_number" />
      <TextInput source="phone_number" />
    </SimpleForm>
  </Create>
);
