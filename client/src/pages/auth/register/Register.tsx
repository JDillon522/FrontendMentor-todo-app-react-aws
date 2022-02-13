import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState } from '../../../state/atoms';
import { appRegister } from '../../../state/auth.service';
import './Register.css';

export interface RegisterForm {
  email: string;
  password: string;
  confirm: string;
}

export interface RegisterErrors {
  email?: string;
  password?: string;
  confirm?: string;
}

export default function Register() {
  const [auth_state, auth_setItems] = useRecoilState(authState);

  const navigate = useNavigate();
  let submitError: string = '';

  return (
    <>
      <h2>REGISTER</h2>

      <main className='TodoCard RegisterForm'>
        <Formik
          initialValues={{ email: '', password: '', confirm: '' }}
          validate={values => {
            const errors: RegisterErrors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }

            if (!values.password) {
              errors.password = 'Required';
            }

            if (!values.confirm) {
              errors.confirm = 'Please confirm your password';
            } else if (values.confirm !== values.password) {
              errors.confirm = 'Your passwords do not match';
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              await appRegister(values.email, values.password);

              auth_setItems({
                ...auth_state,
                currentRegisterEmail: values.email
              });
              navigate('/auth/confirm');

            } catch (error: any) {
              submitError = error.message;
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                placeholder='Email'
                type="email"
                name="email"
                className={errors.email && touched.email && errors.email ? 'error' : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <div className="errors">{errors.email && touched.email && errors.email}</div>

              <input
                placeholder='Password'
                className={errors.password && touched.password && errors.password ? 'error' : ''}
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <div className="errors">{errors.password && touched.password && errors.password}</div>

              <input
                placeholder='Confirm Password'
                className={errors.confirm && touched.confirm && errors.confirm ? 'error' : ''}
                type="password"
                name="confirm"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirm}
              />
              <div className="errors">{errors.confirm && touched.confirm && errors.confirm}</div>

              <div className="errors">{submitError}</div>

              <div className='footer'>
                <button className='btn' type="submit" disabled={!isValid || isSubmitting}>
                  Register
                </button>

              </div>
            </form>
          )}

        </Formik>
      </main>
    </>
  );
}
