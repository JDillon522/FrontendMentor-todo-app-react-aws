import axios, { AxiosRequestHeaders } from "axios";


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

    return;

  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function appLogout(): Promise<void> {
  try {
    const res = await axios.post('/api/auth/logout', {}, { headers: authHeaders() });

    if (res.status !== 205 && res.status !== 401) {
      throw new Error('Error logging out');
    }
  }
  catch (error) {
    console.log(error)
  }
  localStorage.clear();

  return;
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
