import React, { Component } from "react";

import {
  Create,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateTimeInput,
  LongTextInput,
  BooleanInput,
  NumberInput,
  ImageInput,
  ImageField,
  required,
  FormDataConsumer,
  TabbedForm,
  FormTab
} from "react-admin";

// Validate
const validate = values => {
  const errors = {};
  if (
    values.begin_date &&
    values.begin_date.getTime &&
    !values.begin_date.getTime()
  ) {
    errors.begin_date = ["Fecha incorrecta"];
  }
  if (
    values.end_date &&
    values.end_date.getTime &&
    !values.end_date.getTime()
  ) {
    errors.end_date = ["Fecha incorrecta"];
  }
  return errors;
};

export const ResCreate = ({ permissions, ...props }) => (
  <Create {...props}>
    <TabbedForm
      defaultValue={{
        organizer:
          localStorage.getItem("role") === "Organizer"
            ? localStorage.getItem("id")
            : ""
      }}
      validate={values => validate(values)}
    >
      <FormTab label="Datos Generales">
        {permissions === "admin" && (
          <ReferenceInput
            source="organizer"
            reference="organizers"
            validate={required()}
          >
            <SelectInput optionText="email" />
          </ReferenceInput>
        )}
        <TextInput source="name" validate={required()} />
        <ReferenceInput
          source="event_type"
          reference="eventtypes"
          validate={required()}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>

        <ImageInput
          source="poster"
          label="POSTER (Obligatorio)"
          accept="image/*"
          options={{ multiple: false }}
          validate={required()}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <DateTimeInput source="begin_date" validate={required()} />
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            <DateTimeInput
              source="end_date"
              validate={required()}
              defaultValue={
                formData.begin_date && formData.begin_date.getTime
                  ? new Date(formData.begin_date.getTime() + 3600000)
                  : undefined
              }
              {...rest}
            />
          )}
        </FormDataConsumer>

        <BooleanInput source="active" defaultValue={false} />
        <TextInput source="city" validate={required()} />

        <LongTextInput source="description" />
      </FormTab>
      <FormTab label="Ubicación">
        <TextInput source="location" defaultValue="" />
        <TextInput source="address" />

        <TextInput source="zip_code" />
        <TextInput source="province" />
      </FormTab>
      <FormTab label="Información Adicional">
        <NumberInput source="min_age" />

        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.indoor && <NumberInput source="max_visitors" {...rest} />
          }
        </FormDataConsumer>
        <BooleanInput source="indoor" />

        <FormDataConsumer>
          {({ formData, ...rest }) =>
            !formData.free && <NumberInput source="price" {...rest} />
          }
        </FormDataConsumer>
        <BooleanInput source="free" defaultValue={true} />
      </FormTab>
    </TabbedForm>
  </Create>
);
