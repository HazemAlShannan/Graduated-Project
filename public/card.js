import axios from 'axios';

export const createCard = async (cardName, bId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:5000/api/v1/cards/',
      data: {
        bId,
        cardName,
      },
    });
    console.log(res, 'ss', res.data, 'dd', res.data.status);
    if (res.data.status === 'success') {
      console.log('Card Created successfully!');
      window.setTimeout(() => {
        location.reload(true);
      }, 500);
    }
  } catch (error) {
    console.log('error', error.response.data.message);
  }
};
export const addNewTask = async (task, cardId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:5000/api/v1/cards/createTask',
      data: { task, cardId },
    });
    if (res.data.status === 'success') {
      console.log(task, cardId);
      console.log('card created successfully !!');
      window.setTimeout(() => window.location.reload(true), 500);
    }
  } catch (error) {
    console.log('error', error.response.data.message);
    const errmsg = document.querySelector('.hide_Error');
    errmsg.innerHTML = `${error.response.data.message}`;
    errmsg.style.display = 'block';
  }
};

export const checkItAsDone = async (isDone, cardId, taskName) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:5000/api/v1/cards/checkboxIsDone',
      data: { isDone, cardId, taskName },
    });
    if (res.data.status === 'success') {
      console.log('checkbox changed successfully !!');
      // window.setTimeout(() => window.location.reload(true), 500);
    }
  } catch (error) {
    console.log('error', error.response.data.message);
    const errmsg = document.querySelector('.hide_Error');
    errmsg.innerHTML = `${error.response.data.message}`;
    errmsg.style.display = 'block';
  }
};

export const deleteCard = async (cardId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: 'http://127.0.0.1:5000/api/v1/cards/deleteCard',
      data: { cardId },
    })
      .then(console.log('card deleted successfully'))
      .then(
        window.setTimeout(() => {
          location.reload(true);
        }, 500)
      );
  } catch (error) {
    console.log('error', error.response.data.message);
  }
};

export const tagNewMember = async (email, cardId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:5000/api/v1/cards/tagMemberOnCard',
      data: { email, cardId },
    });

    if (res.data.status === 'success') {
      console.log('tag member successfully !!');
      window.setTimeout(() => {
        location.reload(true);
      }, 500);
    }
  } catch (error) {
    console.log('error', error.response.data.message);
  }
};
