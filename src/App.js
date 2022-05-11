import React from "react";
import { Formik, Form, Field } from "formik";
import { Col, Container, Label, Row, Button, FormGroup } from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";
import * as yup from "yup";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomSelectComponent from "./components/CustomSelectComponent";
import CustomCheckboxComponent from "./components/CustomCheckboxComponent";

const passwordValidationRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).+)\S$/;

const formSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(6)
    .matches(
      passwordValidationRegex,
      "Must contain an upper case letter, a lower clase letter, a number, and must be at least 6 characters long"
    ),
  reason: yup.string().required(),
  terms: yup.boolean().oneOf([true], "You must accept the terms and conditions")
});

const getValues = (originalValues) => {
  let vals = {
    ...originalValues,
    password: originalValues.password.replace(/./g, "*")
  };
  return vals;
};

const isValidForm = (errors, isTouched) => {
  return Object.keys(errors).length === 0 && Object.keys(isTouched).length > 0;
};

export default function App() {
  return (
    <div className="App">
      <h1>This is a form</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          reason: "",
          terms: false
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          console.log(getValues(values));
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="text-start">
            <Container>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Field
                      name="email"
                      label="Email"
                      type="email"
                      id="email"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12">
                  <FormGroup>
                    <Field
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12">
                  <FormGroup>
                    <Label htmlFor="reason">
                      Why are you filling out this form?
                    </Label>
                    <Field
                      name="reason"
                      component={CustomSelectComponent}
                      id="reason"
                      invalid={errors["reason"] && touched["reason"]}
                    >
                      <option defaultValue></option>
                      <option value="current">I'm a current user</option>
                      <option value="new">I'm a new user</option>
                      <option value="dev">I'm a dev</option>
                    </Field>
                  </FormGroup>
                </Col>
                <Col xs="12">
                  <FormGroup check>
                    <Field
                      name="terms"
                      type="checkbox"
                      id="terms"
                      checked={values.terms === true}
                      component={CustomCheckboxComponent}
                      className="mr-2"
                      invalid={errors["terms"] && touched["terms"]}
                      label="I accept the terms and conditions"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button
                type="submit"
                color="success"
                disabled={!isValidForm(errors, touched)}
              >
                Submit
              </Button>
              <hr />

              <h4>Errors:</h4>
              <pre>{JSON.stringify(errors, null, 2)}</pre>

              <h4 className="mt-3">Values:</h4>
              <pre>{JSON.stringify(getValues(values), null, 2)}</pre>
            </Container>
          </Form>
        )}
      </Formik>
    </div>
  );
}
