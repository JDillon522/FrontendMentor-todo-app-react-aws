import axios, { AxiosRequestHeaders } from "axios";

axios.interceptors.request.use(
  (config) => {
    config.headers = authHeaders();
    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
)

export async function appLogin(email: string, password: string): Promise<void> {
  try {
    const res = await axios.post('/api/auth/login', {
      email,
      password
    });

    for (const key in res.data) {
      if (Object.prototype.hasOwnProperty.call(res.data, key)) {

        if (key === 'user') {
          localStorage.setItem(key, JSON.stringify(res.data[key]));
        } else {
          localStorage.setItem(key, res.data[key]);
        }
      }
    }

    return Promise.resolve();

  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function appRegister(email: string, password: string): Promise<void> {
  try {
    await axios.post('/api/auth/register', {
      email,
      password
    });

    return Promise.resolve();

  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function appConfirmRegister(email: string, code: string): Promise<void> {
  try {
    await axios.post('/api/auth/confirm', {
      code,
      email
    });

    return Promise.resolve();

  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function appLogout(): Promise<void> {
  try {
    const res = await axios.post('/api/auth/logout', {});

    if (res.status !== 205 && res.status !== 401) {
      throw new Error('Error logging out');
    }
  }
  catch (error) {
    // console.log(error)
  }
  localStorage.clear();

  return Promise.resolve();
}

export async function checkAuthState(): Promise<boolean> {
  try {
    const res = await axios.get('/api/auth/check');

    if (res.status !== 200) {
      throw new Error('User state invalid');
    }

    return true;
  }
  catch (error) {
    // console.log(error)
  }
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');

  return false;
}

export default function authHeaders(): AxiosRequestHeaders {
  const idToken = localStorage.getItem('id_token');
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (idToken && accessToken && refreshToken) {
    return {
      Authorization: 'Bearer ' + idToken,
      'Access-Token': accessToken,
      'Refresh-Token': refreshToken
    };
  } else {
    return {};
  }
}
