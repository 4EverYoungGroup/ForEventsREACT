import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput
} from "react-admin";

export const ResCreate = props => (
  <Create {...props}>
    <SimpleForm>
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
    </SimpleForm>
  </Create>
);
