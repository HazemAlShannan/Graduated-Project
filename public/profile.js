import axios from 'axios';

export const editProfileInfo = async (data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:5000/api/v1/users/updateMe',
      data,
    });
    if (res.data.status === 'success') {
      console.log('Profile Updated successfully!');
      window.setTimeout(() => {
        window.location.reload(true);
      }, 1500);
    }
    console.log('created');
  } catch (error) {
    data.forEach((value, key) => {
      console.log(` key - ${key} : value - ${value}`);
    });
    console.log('wtf', error.response.data.message);
    console.log('wtf', error);
    console.log('wtf', error.response);
    console.log('wtf', error.response.data);
    console.log('wtf', error.response.data.message);
  }
};
