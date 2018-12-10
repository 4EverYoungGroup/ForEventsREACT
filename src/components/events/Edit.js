import React from "react";
import {
  Edit,
  TextInput,
  LongTextInput,
  DateTimeInput,
  BooleanInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  required,
  FormDataConsumer,
  TabbedForm,
  FormTab,
  ImageField,
  ImageInput,
  TextField,
  ReferenceField
} from "react-admin";

const ResTitle = ({ record }) => {
  return <span> {record ? `Evento "${record.name}"` : ""}</span>;
};

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
export const ResEdit = ({ permissions, ...props }) => (
  <Edit {...props} title={<ResTitle />}>
    <TabbedForm redirect={false} validate={values => validate(values)}>
      <FormTab label="Datos Generales">
        {permissions === "admin" && (
          <ReferenceField source="organizer" reference="organizers">
            <TextField source="email" />
          </ReferenceField>
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
          <ImageField source="src" />
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

        <BooleanInput source="active" />
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
  </Edit>
);
