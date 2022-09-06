import axios from 'axios';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:5000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      console.log('Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log('error', err.response.data.message);
    const erro = document.querySelector('.error');
    erro.innerHTML = `${err.response.data.message}`;
    erro.style.display = 'block';
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:5000/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/login');
      }, 1500);
    }
  } catch (err) {
    console.log('error');
  }
};

export const signup = async (
  email,
  password,
  passwordConfirm,
  name,
  gender
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:5000/api/v1/users/signup',
      data: {
        email,
        password,
        passwordConfirm,
        name,
        gender,
      },
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/getting-ready');
      }, 1500);
    }
  } catch (error) {
    console.log(error.response.data.message);
    const err = document.querySelector('.error');
    err.innerHTML = 'login error';
    err.style.display = 'block';
  }
};
