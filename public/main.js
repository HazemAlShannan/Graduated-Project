import axios from 'axios';

export const showTooltip = function () {
  let tooltip = this.parentNode.lastElementChild;
  let spans = tooltip.children;
  let tooltipIndex = this.dataset.tooltip;

  Array.from(spans).forEach((sp) => sp.classList.remove('show'));
  spans[tooltipIndex].classList.add('show');
  tooltip.style.top = `${(100 / (spans.length * 2)) * (tooltipIndex * 2 + 1)}%`;
};

const heade = document.querySelector('header');
const maiiin = document.querySelector('.mainn');
const foot = document.querySelector('.footer');
const nav = document.querySelector('.navigation');
const create = document.querySelector('.create-model');

export const appear = function () {
  create.style.display = 'block';
  heade.classList.add('blur');
  foot.classList.add('blur');
  nav.classList.add('blur');
  maiiin.classList.add('blur');
  notiIcon.classList.add('blur');
  adduserIcon.classList.add('blur');
  worldIcon.classList.add('blur');
};

export const closes = function () {
  create.style.display = 'none';
  heade.classList.remove('blur');
  // maiiin.classList.remove("blur");
  foot.classList.remove('blur');
  nav.classList.remove('blur');
  maiiin.classList.remove('blur');
};

export const createWS = async (wsName, type) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:5000/api/v1/workspaces',
      data: {
        wsName,
        type,
      },
    });
    console.log(res.data.data.slug);
    if (res.data.status === 'success') {
      console.log('workspace created successfully!');
      window.setTimeout(() => {
        window.location.assign(`/${res.data.data.slug}`);
      }, 1500);
    }
    console.log('created');
  } catch (err) {
    console.log('wtf', err.response.data.message);
    const errmsg = document.querySelector('.hide_Error');
    errmsg.innerHTML = `${err.response.data.message}`;
    errmsg.style.display = 'block';
  }
};

const plus_box = document.querySelector('.plus-box');
const cancelPlus = document.querySelector('.cancelPlus');
export const AddMembers = function () {
  plus_box.style.display = 'block';
  // heade.classList.add('blur');
  foot.classList.add('blur');
  nav.classList.add('blur');
  maiiin.classList.add('blur');
};
export const closeAddMemeber = function () {
  plus_box.style.display = 'none';
  // heade.classList.remove('blur');
  foot.classList.remove('blur');
  nav.classList.remove('blur');
  maiiin.classList.remove('blur');
};

const cancelUser = document.querySelector('.close-mem');
const name_mem = document.querySelector('.name-mem');
export const showMembers = function () {
  name_mem.style.display = 'block';
  // heade.classList.add('blur');
  foot.classList.add('blur');
  nav.classList.add('blur');
  maiiin.classList.add('blur');
  // adduserIcon.classList.add('blur');
  // worldIcon.classList.add('blur');
};
export const closeMemeber = function () {
  name_mem.style.display = 'none';
  // memchoose.style.display = 'none';
  foot.classList.remove('blur');
  nav.classList.remove('blur');
  maiiin.classList.remove('blur');

  // adduserIcon.classList.remove('blur');
};

const Pmain = document.querySelector('.create-icon');
const board_box = document.querySelector('.create-B');
export const showBoardBox = function () {
  board_box.style.display = 'block';
  // heade.classList.add('blur');
  foot.classList.add('blur');
  nav.classList.add('blur');
  maiiin.classList.add('blur');
  notiIcon.classList.add('blur');
  adduserIcon.classList.add('blur');
  worldIcon.classList.add('blur');
};
const Closeboard_box = document.querySelector('.cancel-board');
export const closeBoardBox = function () {
  board_box.style.display = 'none';
  // heade.classList.remove('blur');
  foot.classList.remove('blur');
  nav.classList.remove('blur');
  maiiin.classList.remove('blur');
  notiIcon.classList.remove('blur');
  adduserIcon.classList.remove('blur');
  worldIcon.classList.remove('blur');
};

export const addNewMember = async (id, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:5000/api/v1/users/addMembers',
      data: { id, email },
    });
    if (res.data.status === 'success') {
      console.log('member invited successfully!');
      window.setTimeout(() => {
        document.location.reload(true);
      }, 1500);
    }
    console.log('created');
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const createNewBoard = async (
  bName,
  bEndDate,
  bDescription,
  workspace
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:5000/api/v1/boards/',
      data: { bName, bEndDate, bDescription, workspace },
    });
    if (res.data.status === 'success') {
      console.log('board add created successfully!');
      window.setTimeout(() => {
        document.location.reload(true);
      }, 1500);
    }
    console.log('created');
  } catch (error) {
    console.log(error.response.data.message);
    const errmsg = document.querySelector('.hide_Error');
    errmsg.innerHTML = `${error.response.data.message}`;
    errmsg.style.display = 'block';
  }
};
const show_cardProfile = document.querySelectorAll('.profile-card');
export const show_card_profile = function (backId) {
  show_cardProfile.forEach((card) => {
    let id = card.dataset.memberid;
    if (id === backId) {
      card.style.display = 'block';
    }
  });
};
export const close_card_profile = function () {
  show_cardProfile.forEach((card) => (card.style.display = 'none'));
};

const icon_search = document.querySelector('.icon-search');
const search = document.querySelector('.search');
const search_close = document.querySelector('.clear-search');
export const show_S = function () {
  search.classList.add('search_active');
};
export const close_S = function () {
  search.classList.remove('search_active');
};

export const show_N = function () {
  const wrappeer_Task = document.querySelectorAll('.wrappeer');
  wrappeer_Task.forEach((wrapeer) => wrapeer.classList[1]);
};

const mainTo = document.querySelector('.mainnn');
const createtodoList_box = document.querySelector('.create-todoListBox');
export const show_todoBox = function () {
  if (createtodoList_box) {
    createtodoList_box.style.display = 'block';
    foot.classList.add('blur');
    mainTo.classList.add('blur');
    heade.classList.add('blur');
  }
};
export const close_todoBox = function () {
  if (createtodoList_box) {
    createtodoList_box.style.display = 'none';
    foot.classList.remove('blur');
    mainTo.classList.remove('blur');
    heade.classList.remove('blur');
  }
};

const tags_box = document.querySelectorAll('.tags');
export const show_tagBox = function (btnId) {
  tags_box.forEach((el) => {
    if (el.dataset.cardid === btnId) {
      el.style.display = 'block';
      foot.classList.add('blur');
      mainTo.classList.add('blur');
      heade.classList.add('blur');
    }
  });
};
export const close_tagBox = function () {
  tags_box.forEach((el) => {
    // if (el.dataset.cardid === btnId) {
    el.style.display = 'none';
    foot.classList.remove('blur');
    mainTo.classList.remove('blur');
    heade.classList.remove('blur');
    // }
  });
};
const tagMem_box = document.querySelectorAll('.memTags-Todolis');
export const show_tagMemBox = function (num) {
  tagMem_box.forEach((el) => {
    if (el.dataset.tagnumber === num) {
      el.style.display = 'block';
      foot.classList.add('blur');
      mainTo.classList.add('blur');
      heade.classList.add('blur');
      notiIcon.classList.add('blur');
      adduserIcon.classList.add('blur');
      worldIcon.classList.add('blur');
    }
  });
};
export const close_tagMemBox = function () {
  tagMem_box.forEach((el) => {
    el.style.display = 'none';
    foot.classList.remove('blur');
    mainTo.classList.remove('blur');
    heade.classList.remove('blur');
    notiIcon.classList.remove('blur');
    adduserIcon.classList.remove('blur');
    worldIcon.classList.remove('blur');
  });
};

// export const closetaskNote = function () {
//   wrappeerTask.classList.remove("wrappeerLarg")
// };
// const Closeboard_box = document.querySelector('.cancel-board');
// export const closeBoardBox = function () {
//   board_box.style.display = 'none';
//   // heade.classList.remove('blur');
//   foot.classList.remove('blur');
//   nav.classList.remove('blur');
//   maiiin.classList.remove('blur');
// };
// const seemoreBtn = document.querySelector(".seemore");
// const wrappeerTask = document.querySelector(".wrappeer");

// seemoreBtn.onclick = function(){
//   wrappeerTask.classList.add("wrappeerLarg")
// };
// seemoreBtn.onclick = function(){
//   wrappeerTask.classList.remove("wrappeerLarg")
// };

export const deleteBoard = async (boardId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: 'http://127.0.0.1:5000/api/v1/boards/deleteBoard',
      data: { boardId },
    })
      .then(console.log('Board deleted successfully'))
      .then(
        window.setTimeout(() => {
          location.reload(true);
        }, 500)
      );
  } catch (error) {
    console.log('error', error.response.data.message);
  }
};

const noti = document.querySelector('.notification-box');
const notiul = document.querySelector('.notification ul');
const notinum = document.querySelector('.num-notification');
const nNUM = document.querySelector('.notiNum');
export const notification = function () {
  noti.onclick = function () {
    notiul.classList.toggle('show-ulNote');
    notinum.style.display = 'none';
    // nNUM.style.display = 'none'
  };
};

const noti_world = document.querySelector('.dropdown-world');
const world_icon = document.querySelector('.bx-world');
const world_num = document.querySelector('.numW');
export const notification_world = function () {
  world_icon.onclick = function () {
    noti_world.classList.toggle('show-world');
    world_num.style.display = 'none';
  };
};
const toggleBttnM = document.querySelector('.bx-flip-horizontal');
const toggleBttnX = document.querySelector('.bx-message-alt-x');
const backtask = document.querySelectorAll('.backtask');
export const showHide_card = function () {
  backtask.forEach((task) => task);
  const count = backtask.dataset.bigc;
  console.log(count);
  backtask.classList.add('show-task');
  toggleBttnM.style.display = 'none';
  toggleBttnX.style.display = 'block';
  if (toggleBttnX) toggleBttnX.style.display = 'block';
};
export const closeHide_card = function () {
  backtask.classList.remove('show-task');
  toggleBttnX.style.display = 'none';
  toggleBttnM.style.display = 'block';
};
// export const canvas =
// function _(selector){
//   return document.querySelector(selector);
// }
// export const canvas2  =
// function setup(){
//   let canvas = createCanvas(650, 600);
//   canvas.parent("canvas-wrapper");
//   background(255);
// }
// export const show_N = function(){
// const wrappeer_Task = document.querySelectorAll(".wrappeer");
//   wrappeer_Task.forEach(wrapeer => wrapeer.classList[1])
//   }
// export const closetaskNote = function () {
//   wrappeerTask.classList.remove("wrappeerLarg")
// };
// const Closeboard_box = document.querySelector('.cancel-board');
// export const closeBoardBox = function () {
//   board_box.style.display = 'none';
//   // heade.classList.remove('blur');
//   foot.classList.remove('blur');
//   nav.classList.remove('blur');
//   maiiin.classList.remove('blur');
// };
// const seemoreBtn = document.querySelector(".seemore");
// const wrappeerTask = document.querySelector(".wrappeer");

// seemoreBtn.onclick = function(){
//   wrappeerTask.classList.add("wrappeerLarg")
// };
// seemoreBtn.onclick = function(){
//   wrappeerTask.classList.remove("wrappeerLarg")
// };

// let canvas = document.getElementById("#canvas")

// function _(selector){
//   return document.querySelector(selector);
// }

// function mouseDragged() {
//   let type = _("#pen-pencil").checked?"pencil":"paint";
//   let size =parseInt(_("#pen-size").value);
//   let color = _("#pen-color").value;
//   fill(color);
//   stroke(color);
//   if(type == "pencil"){
//     Line(pmouseX, pmouseY, mouseX, mouseY);
//   }else{
//     ellipse(mouseX, mouseY, size, size)
//   }

// }
// _("#reset-canves").addEventListener("click", function(){
//   background(255);
// });
// _("#save-canves").addEventListener("click", function(){
//   saveCanvas(canvas, "Sketch", "png");
// });
const editBoards = document.querySelectorAll('.edittB');
export const show_editBoard = function (boardId) {
  editBoards.forEach((editBoard) => {
    let id = editBoard.dataset.idforboard;
    if (id === boardId) {
      console.log(id, boardId);
      editBoard.style.display = 'block';
      heade.classList.add('blur');
      maiiin.classList.add('blur');
      foot.classList.add('blur');
      nav.classList.add('blur');
      maiiin.classList.add('blur');
      notiIcon.classList.add('blur');
      adduserIcon.classList.add('blur');
      worldIcon.classList.add('blur');
    }
  });
};
export const close_editBoard = function () {
  editBoards.forEach((el) => {
    el.style.display = 'none';
    heade.classList.remove('blur');
    // maiiin.classList.remove("blur");
    foot.classList.remove('blur');
    nav.classList.remove('blur');
    maiiin.classList.remove('blur');
    notiIcon.classList.remove('blur');
    adduserIcon.classList.remove('blur');
    worldIcon.classList.remove('blur');
  });
};

//admin or user  choose
// const memdots = document.querySelector(".bx-dots-horizontal-rounded");
const memchoose = document.querySelectorAll('.updatemem');
export const openchooseMem = function (userId) {
  if (memchoose)
    memchoose.forEach((el) => {
      if (el.dataset.userid === userId) el.style.display = 'block';
    });
};

const editWS = document.querySelector('.Update-model');
const notiIcon = document.querySelector('.notification');
const adduserIcon = document.querySelector('.add.user');
const worldIcon = document.querySelector('.world');

export const openUpdatews = function () {
  editWS.style.display = 'block';
  heade.classList.add('blur');
  maiiin.classList.add('blur');
  foot.classList.add('blur');
  nav.classList.add('blur');
  maiiin.classList.add('blur');
  notiIcon.classList.add('blur');
  adduserIcon.classList.add('blur');
  worldIcon.classList.add('blur');
};
// const cancelEditWS = document.querySelector(".updatecloses");

export const closeUpdatews = function () {
  editWS.style.display = 'none';
  heade.classList.remove('blur');
  // maiiin.classList.remove("blur");
  foot.classList.remove('blur');
  nav.classList.remove('blur');
  maiiin.classList.remove('blur');
  notiIcon.classList.remove('blur');
  adduserIcon.classList.remove('blur');
  worldIcon.classList.remove('blur');
};

export const acceptInvite = async (accept, wsId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:5000/api/v1/users/memberAccept',
      data: { accept, wsId },
    });
    if (res.data.status === 'success') {
      console.log('member accept successfully !!');
      window.setTimeout(() => {
        location.reload(true);
      }, 500);
    }
  } catch (error) {
    console.error('error', error.response.data.message);
  }
};

export const applyChangeRole = async (userId, newRole, wsId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:5000/api/v1/workspaces/setUserRole',
      data: { userId, newRole, wsId },
    });
    if (res.data.status === 'success') {
      console.log('changes applying successfully !!');
      window.setTimeout(() => {
        location.reload(true);
      }, 500);
    }
  } catch (error) {
    console.error('error', error.response.data.message);
  }
};

export const updateWsData = async (wsName, wsDescreption, type, wsId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:5000/api/v1/workspaces/${wsId}`,
      data: { wsName, wsDescreption, type },
    });
    console.log('here');
    if (res.data.status === 'success') {
      console.log('workspace update successfully !!');
      window.setTimeout(() => {
        location.reload(true);
      }, 500);
    }
  } catch (error) {
    console.error('error', error.response.data.message);
  }
};

export const updateBoardData = async (bName, bDescreption, bEndDate, bId) => {
  try {
    console.log(bId);
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:5000/api/v1/boards/${bId}`,
      data: { bName, bDescreption, bEndDate },
    });
    console.log('here');
    if (res.data.status === 'success') {
      console.log('workspace update successfully !!');
      window.setTimeout(() => {
        location.reload(true);
      }, 500);
    }
  } catch (error) {
    console.error('error', error.response.data.message);
  }
};
