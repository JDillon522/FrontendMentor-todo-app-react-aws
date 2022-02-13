import { Formik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Nav from '../../../shared/nav/Nav';
import { authState, todoState } from '../../../state/atoms';
import { appConfirmRegister, appLogin, appLogout } from '../../../state/auth.service';
import { getAllAndUpdate } from '../../../state/todo.service';
import './Confirm.css';

export interface ConfirmForm {
  code: string;
  email: string;
}

export interface ConfirmErrors {
  code?: string;
  email?: string;
}

export default function Confirm() {
  const [todo_state, todo_setItems] = useRecoilState(todoState);
  const [auth_state, auth_setItems] = useRecoilState(authState);

  const navigate = useNavigate();
  let submitError: string = '';

  useEffect(() => {
    return () => {
      todo_setItems(todo_state);
      auth_setItems(auth_state);
    }
  });

  return (
    <>
      <h2>LOGIN</h2>

      <main className='TodoCard LoginForm'>
        <Formik
          initialValues={{ code: '', email: '' }}
          validate={values => {
            const errors: ConfirmErrors = {};
            if (!auth_state.currentRegisterEmail) {
              if (!values.email) {
                errors.email = 'Required';
              } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
            }

            if (!values.code) {
              errors.code = 'Required';
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              await appConfirmRegister(values.email || auth_state.currentRegisterEmail as string, values.code);

              navigate('/auth/login');
              await getAllAndUpdate(todo_state, todo_setItems);

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
              {
                auth_state.currentRegisterEmail ?
                  <p>An email has been sent to {auth_state.currentRegisterEmail} with your confirmation code. Please enter the code below.</p> :
                  <p>Please enter your email and the code you received.</p>
              }
              {
                !auth_state.currentRegisterEmail ?
                  <>
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
                  </>
                  : ''
              }
              <input
                placeholder='Code'
                type="text"
                name="code"
                className={errors.code && touched.code && errors.code ? 'error' : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.code}
              />
              <div className="errors">{errors.code && touched.code && errors.code}</div>

              <div className='footer'>
                <button className='btn' type="submit" disabled={!isValid || isSubmitting}>
                  Submit
                </button>

              </div>
            </form>
          )}

        </Formik>
      </main>
    </>
  );
}
