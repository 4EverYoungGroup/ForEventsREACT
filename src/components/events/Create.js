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
export class ResCreate extends Component {
  render() {
    return (
      <Create {...this.props}>
        <TabbedForm validate={values => validate(values)}>
          <FormTab label="Datos Generales">
            <ReferenceInput
              source="organizer"
              reference="organizers"
              validate={required()}
            >
              <SelectInput optionText="email" />
            </ReferenceInput>
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

            <TextInput source="name" validate={required()} />
            <ReferenceInput
              source="event_type"
              reference="eventtypes"
              validate={required()}
            >
              <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="city" validate={required()} />
            <LongTextInput source="description" />
          </FormTab>
          <FormTab label="Ubicación">
            <TextInput source="location" defaultValue="-5.748529,41.513958" />
            <TextInput source="adress" />
            <TextInput source="zip_code" />

            <ReferenceInput source="province" reference="provinces">
              <SelectInput optionText="name" />
            </ReferenceInput>

            <ReferenceInput source="country" reference="countries">
              <SelectInput optionText="name" />
            </ReferenceInput>
          </FormTab>
          <FormTab label="Información Adicional">
            <NumberInput source="min_age" />

            <FormDataConsumer>
              {({ formData, ...rest }) =>
                formData.indoor && (
                  <NumberInput source="max_visitors" {...rest} />
                )
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
  }
}
