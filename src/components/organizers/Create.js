import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  AutocompleteInput
} from "react-admin";

const choices = [
  { id: "M", name: "myroot.gender.male" },
  { id: "F", name: "myroot.gender.female" }
];
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
      <ReferenceInput source="city" reference="cities">
        <AutocompleteInput
          limitChoicesToValue={false}
          allowEmpty
          optionText="city"
          optionValue="_id"
          shouldRenderSuggestions={val => {
            return val.trim() > 2;
          }}
        />
      </ReferenceInput>
      <TextInput source="mobile_number" />
      <TextInput source="phone_number" />
    </SimpleForm>
  </Create>
);
