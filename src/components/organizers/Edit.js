import React from "react";
import {
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  ReferenceInput,
  AutocompleteInput
} from "react-admin";

// Title
const getName = record => {
  if (!record) return "";

  /* set */
  let firstName = record.first_name;
  let lastName = record.last_name;

  /* done */
  return lastName && lastName !== ""
    ? `${firstName} ${lastName}`
    : `${firstName}`;
};
const getTitle = record => {
  if (!record) return "";

  /* set */
  let name = getName(record);
  let email = record.email;

  return `${name} (${email})`;
};
const ResTitle = ({ record }) => {
  return <span> {getTitle(record)}</span>;
};

export const ResEdit = props => (
  <Edit {...props} title={<ResTitle />}>
    <SimpleForm redirect={false}>
      <DisabledInput source="id" />
      <TextInput source="idn" />
      <TextInput source="company_name" />
      <TextInput source="alias" />
      <TextInput source="email" />
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
  </Edit>
);
