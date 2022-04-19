import { Button } from 'components/button';
import { TextInput } from 'components/text-input';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const handleSubmitForm = (values: LoginFormValues) => {
    console.log(values);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please enter email address').email('Invalid email address format'),
    password: Yup.string().required('Please enter password'),
  });
  return (
    <div className="flex flex-col items-center w-96 shadow-xl py-10 rounded">
      <h1 className="text-primary-main font-bold">Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {({ submitForm, errors, handleChange, touched, handleBlur }) => {
          return (
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <TextInput
                  className="w-full"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email ? errors.email : ''}
                  name="email"
                  label="Email"
                />
              </div>
              <div className="mb-4">
                <TextInput
                  required
                  error={touched.password ? errors.password : ''}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="password"
                  label="Password"
                />
              </div>
              <Button onClick={submitForm}>Login</Button>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export { LoginForm };
