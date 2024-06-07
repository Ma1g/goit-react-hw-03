import css from "./ChontactForm.module.css";
import * as Yup from "yup";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Мінімум 2 символи!")
    .required("Це поле обовʼязкове для заповнення!"),
  number: Yup.string()
    .matches(
      /^\d{3}-\d{2}-\d{2}$/,
      "Введіть правильний формат номера телефону ххх-хх-хх! "
    )
    .required("Це поле обовʼязкове для заповнення!"),
});

export default function ContactForm({ onAdd }) {
  const fieldId = useId();

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={UserSchema}
      onSubmit={(values, { resetForm }) => {
        onAdd({
          id: Date.now().toString(),
          name: values.name,
          number: values.number,
        });
        resetForm();
      }}
    >
      <Form className={css.container}>
        <label className={css.label} htmlFor={`${fieldId}-name`}>
          Name
        </label>
        <Field
          className={css.input}
          type="text"
          name="name"
          id={`${fieldId}-name`}
        />
        <ErrorMessage className={css.error} name="name" component="span" />
        <label className={css.label} htmlFor={`${fieldId}-number`}>
          Number
        </label>
        <Field
          className={css.input}
          type="tel"
          name="number"
          id={`${fieldId}-number`}
        />
        <ErrorMessage className={css.error} name="number" component="span" />
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}