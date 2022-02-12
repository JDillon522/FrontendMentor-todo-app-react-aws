import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Nav from '../../shared/nav/Nav';
import { todoState } from '../../state/atoms';
import { appLogin, appLogout } from '../../state/auth.service';
import { getAllAndUpdate } from '../../state/todo.service';
import './Login.css';

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginErrors {
  email?: string;
  password?: string;
  form?: string;
}

export default function Login() {
  const [state, setItems] = useRecoilState(todoState);
  const navigate = useNavigate();
  let submitError: string = '';

  const submitLogout = async () => {
    await appLogout();
    navigate('/');
  }

  return (
    <>
      <h2>LOGIN</h2>

      <main className='TodoCard LoginForm'>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors: LoginErrors = {};
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
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              await appLogin(values.email, values.password);
              navigate('/');
              await getAllAndUpdate(state, setItems);

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
              <div className="errors">{submitError}</div>

              <div className='footer'>
                <button className='btn' type="submit" disabled={!isValid || isSubmitting}>
                  Submit
                </button>

              </div>
            </form>
          )}

        </Formik>
      </main>
      <button onClick={submitLogout}>Logout</button>
    </>
  );
}
