import React from "react";
import { FormFeedback, Input, Label } from "reactstrap";

const CustomCheckboxComponent = ({
  field,
  form: { touched, errors },
  ...props
}) => (
  <Label check>
    <Input type="checkbox" {...field} {...props} /> {props.label}
    {touched[field.name] && errors[field.name] && (
      <FormFeedback>{errors[field.name]}</FormFeedback>
    )}
  </Label>
);

export default CustomCheckboxComponent;
