import axios from "axios";


export async function appLogin(email: string, password: string) {
  const res = await axios.post('/api/auth/login', {
    email,
    password
  });
  console.log(res)

  if (res.status !== 201) {
    throw new Error('Error loging in');
  }

  for (const key in res.data) {
    if (Object.prototype.hasOwnProperty.call(res.data, key)) {

      if (key === 'user') {
        localStorage.setItem(key, JSON.stringify(res.data[key]));
      } else {
        localStorage.setItem(key, res.data[key]);
      }
    }
  }
}
