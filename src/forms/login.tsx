import { Button } from 'components/button';
import { TextInput } from 'components/text-input';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

export interface LoginFormValues {
  email: string;
  password: string;
  validation?: string;
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues, formikHelpers: FormikHelpers<LoginFormValues>) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please enter email address').email('Invalid email address format'),
    password: Yup.string().required('Please enter password'),
  });
  return (
    <div className="flex flex-col items-center w-96 shadow-xl py-10 rounded">
      <img className="w-28 pb-4" src="/assets/images/logo.png" />
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ submitForm, errors, handleChange, touched, handleBlur }) => {
          return (
            <div className="flex flex-col justify-center items-center w-full px-12">
              <div className="mb-4 w-full">
                <TextInput
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email ? errors.email : ''}
                  name="email"
                  label="Email"
                />
              </div>
              <div className="mb-4 w-full">
                <TextInput
                  required
                  error={touched.password ? errors.password : ''}
                  onBlur={handleBlur}
                  type="password"
                  onChange={handleChange}
                  name="password"
                  label="Password"
                />
              </div>
              {!!errors.validation && <span className="text-primary-red text-sm mb-4">{errors.validation}</span>}
              <Button onClick={submitForm}>Login</Button>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export { LoginForm };
