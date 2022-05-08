import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Col,
  Container,
  Label,
  Row,
  Button,
  Input,
  FormGroup,
  FormFeedback
} from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";
// import Select from "react-select";
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
          console.log(values);
        }}
      >
        {({ values, errors, touched, isValidating }) => (
          <Form>
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
                      invalid={errors["reason"]}
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
                      invalid={errors["terms"]}
                      label="I accept the terms and conditions"
                    />
                    <ErrorMessage name="terms" component={FormFeedback} />
                  </FormGroup>
                </Col>
              </Row>

              <Button type="submit" color="success">
                Submit
              </Button>
            </Container>
          </Form>
        )}
      </Formik>
    </div>
  );
}
