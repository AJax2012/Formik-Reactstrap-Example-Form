import React from "react";
import { FormFeedback, Input } from "reactstrap";

const CustomSelectComponent = ({
  field,
  form: { touched, errors },
  children,
  ...props
}) => (
  <>
    <Input type="select" {...field} {...props}>
      {children}
    </Input>
    {touched[field.name] && errors[field.name] && (
      <FormFeedback>{errors[field.name]}</FormFeedback>
    )}
  </>
);

export default CustomSelectComponent;
