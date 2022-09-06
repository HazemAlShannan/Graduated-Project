import '@babel/polyfill';
import axios from 'axios';
import { login, logout, signup } from './login';
import {
  showTooltip,
  appear,
  closes,
  createWS,
  AddMembers,
  showMembers,
  closeAddMemeber,
  closeMemeber,
  addNewMember,
  showBoardBox,
  closeBoardBox,
  createNewBoard,
  show_card_profile,
  close_card_profile,
  close_S,
  show_S,
  show_N,
  show_todoBox,
  close_todoBox,
  show_tagBox,
  close_tagBox,
  show_tagMemBox,
  close_tagMemBox,
  show_ultask,
  close_ultask,
  deleteBoard,
  notification,
  showHide_card,
  closeHide_card,
  notification_world,
  show_editBoard,
  close_editBoard,
  openchooseMem,
  openUpdatews,
  closeUpdatews,
  acceptInvite,
  applyChangeRole,
  updateWsData,
  updateBoardData,
} from './main';
import { editProfileInfo } from './profile';
import {
  createCard,
  checkItAsDone,
  addNewTask,
  deleteCard,
  tagNewMember,
} from './card';

// if (module.hot) {
//   module.hot.dispose(function () {});
//   module.hot.accept(function () {});
// }
const loginForm = document.querySelector('.sign-in-form');
const signupForm = document.querySelector('.sign-up-form');
const logOutBtn = document.querySelector('.bx-log-out');
const sign_in_btn = document.querySelector('#sign-in-btn');
const sign_up_btn = document.querySelector('#sign-up-btn');
const contanier = document.querySelector('.container');
const toolip_element = document.querySelectorAll('.tooltip-element');
const btn = document.querySelector('.btnn');
const close_create = document.querySelector('.closes');
const createForm = document.querySelector('.create-form');
const add_i = document.querySelector('.plus-i');
const add_user = document.querySelector('.user');
const addMember = document.querySelector('.add-u');
const cancelPlus = document.querySelector('.cancelPlus');
const cancelUser = document.querySelector('.close-mem');
const Pmain = document.querySelector('.create-icon');
const board_box = document.querySelector('.create-B');
const Closeboard_box = document.querySelector('.cancel-board');
const createBoardForm = document.querySelector('.create-new-board');
const show_card = document.querySelectorAll('.show-card');
const close_cardPro = document.querySelectorAll('.close-profileCard ');
const openBoard = document.querySelectorAll('.open-board');
const profileForm = document.querySelector('.profile-form');
const getingReadyPage = document.querySelectorAll('.btn-op');
const openInvitedWS = document.querySelectorAll('.invet-btn');
const seemore_Btn = document.querySelectorAll('.seemore');
const imgTag_btn = document.querySelectorAll('.tagImg');
const publicWorkspaces = document.querySelectorAll('.publicWork-btn');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.toLowerCase();
    const password = document.getElementById('password').value.toLowerCase();
    console.log(email, password);
    login(email, password);
  });
}

if (logOutBtn)
  logOutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailup').value;
    const password = document.getElementById('passwordup').value;
    const passwordConfirm = document.getElementById('confirm').value;
    const name = document.getElementById('name').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    if (
      name &&
      email &&
      password &&
      gender &&
      passwordConfirm &&
      passwordConfirm === password
    ) {
      console.log(name, email, password, passwordConfirm, gender);
      signup(email, password, passwordConfirm, name, gender);
    } else {
      console.error('signup error');
    }
  });
}
if (sign_up_btn)
  sign_up_btn.addEventListener('click', () => {
    contanier.classList.add('sign-up-mode');
  });

if (sign_in_btn)
  sign_in_btn.addEventListener('click', () => {
    contanier.classList.remove('sign-up-mode');
  });

if (toolip_element)
  toolip_element.forEach((ele) => {
    ele.addEventListener('mouseover', showTooltip);
  });

if (btn) btn.addEventListener('click', () => appear());

if (close_create) close_create.addEventListener('click', closes);

if (createForm)
  createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const wsName = document.getElementById('ws-name').value;
    // if (document.getElementById('public').checked) console.log('gere');
    // if (document.getElementById('private').checked) console.log('pubv here');

    if (document.getElementById('private').checked)
      return createWS(wsName, 'private');
    if (document.getElementById('public').checked)
      return createWS(wsName, 'public');
  });

if (add_i) add_i.addEventListener('click', () => AddMembers());
if (add_user) add_user.addEventListener('click', () => showMembers());
if (cancelPlus) cancelPlus.addEventListener('click', () => closeAddMemeber());
if (cancelUser) cancelUser.addEventListener('click', () => closeMemeber());

window.addEventListener('scroll', function () {
  var header = this.document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});
if (Pmain) Pmain.addEventListener('click', () => showBoardBox());
if (Closeboard_box)
  Closeboard_box.addEventListener('click', () => closeBoardBox());
if (addMember)
  addMember.addEventListener('click', () => {
    const email = document.getElementById('add-email').value.toLowerCase();
    const id = document.getElementById('input').dataset.id;
    console.log('ss', email, id);
    addNewMember(id, email);
  });

if (createBoardForm)
  createBoardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const bName = document.getElementById('bName').value;
    const bEndDate = document.getElementById('bDate').value;
    const bDescription = document.getElementById('bDesc').value;
    const workspace = document.getElementById('input').dataset.id;
    createNewBoard(bName, bEndDate, bDescription, workspace);
  });

if (show_card)
  show_card.forEach((card) => {
    let backId = card.dataset.backid;
    card.addEventListener('click', () => show_card_profile(backId));
  });
if (close_cardPro)
  close_cardPro.forEach((card) =>
    card.addEventListener('click', () => close_card_profile())
  );

if (openBoard)
  openBoard.forEach((board) => {
    board.addEventListener('click', () => {
      console.log('hi');
      let url = window.location.href;
      if (url.charAt(url.length - 1) === '/')
        url = url.substring(0, url.length - 1);
      // console.log(url.charAt(url.length - 1));
      window.location.assign(`${url}/${board.dataset.boardname}`);
    });
  });

let image = document.getElementById('image');
if (image) {
  let images = [
    '/img/4.svg',
    '/img/2svg.svg',
    '/img/3svg.svg',
    '/img/5.svg',
    '/img/1v.svg',
  ];
  setInterval(function () {
    let random = Math.floor(Math.random() * 4);
    image.src = images[random];
  }, 2000);
}

if (profileForm) {
  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    if (document.getElementById('profileName').value)
      form.append('name', document.getElementById('profileName').value);
    if (document.getElementById('profileEmail').value)
      form.append('email', document.getElementById('profileEmail').value);
    form.append('password', document.getElementById('profilePassword').value);
    form.append(
      'passwordConfirm',
      document.getElementById('profilePasswordConfirm').value
    );
    form.append('position', document.getElementById('profilePosation').value);
    form.append('photo', document.getElementById('photo').files[0]);
    editProfileInfo(form);
  });
}

if (getingReadyPage)
  getingReadyPage.forEach((el) => {
    el.addEventListener('click', async () => {
      const userInterests = el.dataset.type;
      console.log(userInterests);
      try {
        const res = await axios({
          method: 'POST',
          url: 'http://127.0.0.1:5000/api/v1/users/userInterests',
          data: { userInterests },
        });
        if (res.data.status === 'success') {
          console.log('top 2');
          window.setTimeout(() => {
            location.replace('/');
          }, 1500);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    });
  });

if (openInvitedWS)
  openInvitedWS.forEach((workspace) =>
    workspace.addEventListener('click', () => {
      window.location.assign(`/invitedWS/${workspace.dataset.invited}`);
    })
  );

// if (seemore_Btn)
//   seemore_Btn.forEach((btn) =>
//     btn.addEventListener('click', () => show_N.classList.add('wrappeerLarg'))
//   );

if (publicWorkspaces)
  publicWorkspaces.forEach((workspace) =>
    workspace.addEventListener('click', () =>
      window.location.assign(`/publicWorkspace/${workspace.dataset.publicws}`)
    )
  );

const plusCreate_todoBox = document.querySelector('.bx-plus-circle');
if (plusCreate_todoBox)
  plusCreate_todoBox.addEventListener('click', () => show_todoBox());
const x_todoBox = document.querySelector('.bx-tada');
if (x_todoBox) x_todoBox.addEventListener('click', () => close_todoBox());
// var color = document.getElementById('.create-todoListBox')

let colorBox = [
  '#dbc271ad',
  '#895ec37d',
  '#80893ba6',
  '#cf24db7a',
  '#0c244afa',
];
let i = 0;
let todoColor = document.querySelector('.bx-plus-circle');
if (todoColor)
  todoColor.addEventListener('click', function () {
    i = i < colorBox.length ? ++i : 0;
    document.querySelector('.create-todoListBox').style.background =
      colorBox[i];
    document.querySelector('.create-todoListBox input').style.color =
      colorBox[i];
  });

const inputTags = document.querySelector('.inputTags');
const tagsBtn = document.querySelector('.tag-user');
// const ulTags = document.querySelector('.ulTags');
// if (tagsBtn)
//   tagsBtn.addEventListener('click', (e) => {
//     if (inputTags.value != '') {
//       e.preventDefault();
//       //create li
//       const tagsLi = document.createElement('li');
//       tagsLi.innerHTML = inputTags.value;
//       ulTags.appendChild(tagsLi);
//       //create x
//       const spansx = document.createElement('span');
//       spansx.innerHTML = 'x';
//       tagsLi.appendChild(spansx);
//     }
//   const deltag = document.querySelectorAll('span');
//   for (let i = 0; i < deltag.length; i++) {
//     deltag[i].addEventListener('click', () => {
//       deltag[i].parentElement.style.opacity = 0;
//       setTimeout(() => {
//         deltag[i].parentElement.style.display = 'none';
//         deltag[i].parentElement.remove();
//       }, 500);
//       // deltag[i].parentElement.style.display = "none"
//     });
//   }
//   inputTags.value = '';
// });
const tagplusBtn = document.querySelectorAll('.tag-btn');
const tagxBtn = document.querySelectorAll('.closeTag');
if (tagplusBtn)
  tagplusBtn.forEach((btn) => {
    const btnId = btn.dataset.cardid;
    btn.addEventListener('click', () => show_tagBox(btnId));
  });
if (tagxBtn)
  tagxBtn.forEach((el) => el.addEventListener('click', () => close_tagBox()));

const tagMemBtn = document.querySelectorAll('.img-tag .bx');
const tagMemx = document.querySelectorAll('.closememTags');
if (tagMemBtn)
  tagMemBtn.forEach((el) => {
    el.addEventListener('click', () => {
      const num = el.dataset.index;
      console.log(num);
      show_tagMemBox(num);
    });
  });
if (tagMemx)
  tagMemx.forEach((el) =>
    el.addEventListener('click', () => close_tagMemBox())
  );

// let toggleBttn = document.querySelectorAll('.see');
// let backtask = document.querySelectorAll('.backtask');
// if (toggleBttn)
//   toggleBttn.forEach(
//     (btn) =>
//       (btn.onclick = function () {
//         backtask.forEach((task) => {
//           const num = document.querySelectorAll('.create-task');
//           if (num) {
//             console.log(task.dataset.bigc);
//           }
//           if (task.dataset.bigc === num) task.classList.toggle('show-task');
//         });

//         // backtask.classList.toggle('show-task');
//       })
//   );

const createCardBtn = document.querySelector('.create-card');
if (createCardBtn)
  createCardBtn.addEventListener('click', () => {
    const cardName = document.getElementById('cardname').value;
    const boardId = window.location.href.split('/').slice(-1)[0];
    console.log(cardName, boardId);
    createCard(cardName, boardId);
  });

const createTaskOnCard = document.querySelectorAll('.create-task');
if (createTaskOnCard) {
  const tasks = document.getElementsByClassName('add-task-in');
  createTaskOnCard.forEach((el) => {
    el.addEventListener('click', () => {
      const cardId = el.dataset.cardid;
      for (let task of tasks) {
        if (task.dataset.count === el.dataset.count) {
          console.log(task, task.value);
          addNewTask(task.value, cardId);
        }
      }
    });
  });
}

const createTaskBig = document.querySelectorAll('.create-task-big');
if (createTaskBig) {
  const bigTasks = document.getElementsByClassName('task-data-big');
  createTaskBig.forEach((el) =>
    el.addEventListener('click', () => {
      const cardId = el.dataset.cardid;
      console.log(cardId);
      for (let task of bigTasks) {
        if (task.dataset.num === el.dataset.num) {
          addNewTask(task.value, cardId);
        }
      }
    })
  );
}

const see = document.querySelectorAll('.see');
if (see) {
  let backtask = document.querySelectorAll('.backtask');
  see.forEach((el) =>
    el.addEventListener('click', () => {
      backtask.forEach((bigCard) => {
        if (bigCard.dataset.bigc === el.dataset.count)
          bigCard.classList.toggle('show-task');
      });
    })
  );
}

const noti = document.querySelector('.notification-box');
if (noti) noti.addEventListener('click', () => notification());

const checkTaskDone = document.querySelectorAll('.checkbox');
if (checkTaskDone)
  checkTaskDone.forEach((el) =>
    el.addEventListener('change', function () {
      let taskName = '';
      const cardId = el.dataset.cardid;
      const checkbodId = el.id;
      const taskEl = document.querySelectorAll(`p.taskname`);
      taskEl.forEach((task) => {
        if (task.id === checkbodId) {
          taskName = task.innerText;
        }
      });
      if (this.checked) {
        console.log('checked', cardId, taskName);
        checkItAsDone(true, cardId, taskName);
      } else {
        console.log('not checked', cardId, taskName);
        checkItAsDone(false, cardId, taskName);
      }
    })
  );
const checkTaskDoneBig = document.querySelectorAll('.checkbox-big');
if (checkTaskDoneBig)
  checkTaskDoneBig.forEach((el) =>
    el.addEventListener('change', function () {
      let taskName = '';
      const cardId = el.dataset.cardid;
      const checkbodId = el.id;
      const taskEl = document.querySelectorAll(`p.taskname-big`);
      taskEl.forEach((task) => {
        if (task.id === checkbodId) {
          taskName = task.innerText;
        }
      });
      if (this.checked) {
        console.log('checked', cardId, taskName);
        checkItAsDone(true, cardId, taskName);
      } else {
        console.log('not checked', cardId, taskName);
        checkItAsDone(false, cardId, taskName);
      }
    })
  );

const deleteBoardBtn = document.querySelectorAll('.delete-card-btn');
if (deleteBoardBtn)
  deleteBoardBtn.forEach((btn) => {
    const boardId = btn.dataset.boardid;
    btn.addEventListener('click', () => {
      deleteBoard(boardId);
    });
  });

const deleteCardBtn = document.querySelectorAll('.delete-card');
if (deleteCardBtn)
  deleteCardBtn.forEach((btn) => {
    const cardId = btn.dataset.cardid;
    btn.addEventListener('click', () => {
      deleteCard(cardId);
    });
  });
const world_icon = document.querySelector('.bx-world');
if (world_icon)
  world_icon.addEventListener('click', () => notification_world());
//canvas
const editicon = document.querySelectorAll('.bx-edit-alt');
const closeediticon = document.querySelectorAll('.cancel-edit');
if (editicon)
  editicon.forEach((el) => {
    const boardId = el.dataset.editboardid;
    el.addEventListener('click', () => {
      console.log(boardId);
      show_editBoard(boardId);
    });
  });
if (closeediticon)
  closeediticon.forEach((el) =>
    el.addEventListener('click', () => close_editBoard())
  );

const memdots = document.querySelectorAll('.bx-dots-horizontal-rounded');
if (memdots)
  memdots.forEach((el) =>
    el.addEventListener('click', () => {
      console.log(el.dataset.userid);
      openchooseMem(el.dataset.userid);
    })
  );

const updateWSIcon = document.querySelectorAll('.bxs-edit-alt');
if (updateWSIcon)
  updateWSIcon.forEach((el) =>
    el.addEventListener('click', () => openUpdatews())
  );
const cancelEditWS = document.querySelectorAll('.updatecloses');
if (cancelEditWS)
  cancelEditWS.forEach((el) =>
    el.addEventListener('click', () => closeUpdatews())
  );

const tagsForm = document.querySelectorAll('.tag-note');
if (tagsForm)
  tagsForm.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = document.querySelectorAll('.inputTags');
      inputs.forEach((input) => {
        if (input.dataset.cardid === form.dataset.cardid) {
          const textValue = input.value;
          const btns = document.querySelectorAll('.tag-user');
          btns.forEach((btn) => {
            if (btn.dataset.cardid === form.dataset.cardid) {
              const email = textValue.toLowerCase();
              console.log(email, btn.dataset.cardid);
              tagNewMember(email, btn.dataset.cardid);
            }
          });
        }
      });
    });
  });

const acceptInvitation = document.querySelectorAll('.accept');
if (acceptInvitation)
  acceptInvitation.forEach((invite) => {
    invite.addEventListener('click', () =>
      acceptInvite(true, invite.dataset.inviteid)
    );
  });

const declineInvitation = document.querySelectorAll('.not');
if (declineInvitation)
  declineInvitation.forEach((invite) => {
    invite.addEventListener('click', () => {
      console.log(invite.dataset.inviteid);
      acceptInvite(false, invite.dataset.inviteid);
    });
  });

const searchPublicWS = document.querySelector('.icon-search');
if (searchPublicWS) {
  console.log('hi');
  searchPublicWS.addEventListener('click', () => {
    const newSeach = document.querySelector('.search');
    console.log(
      newSeach,
      newSeach.classList,
      newSeach.classList.contains('search_active')
    );
    const searchActivate = document.getElementById('search-public');
    if (newSeach.classList.contains('search_active')) {
      const name = searchActivate.value.toLowerCase().split(' ').join('-');
      console.log(name);
      window.location.assign(`/publicWorkspaces/search/${name}`);
    }
  });
}

const icon_search = document.querySelector('.icon-search');
const search_close = document.querySelector('.clear-search');
if (icon_search) icon_search.addEventListener('click', () => show_S());
if (search_close) search_close.addEventListener('click', () => close_S());

const getTaggedCardsBoard = document.querySelectorAll('.li-tag-on-card');
if (getTaggedCardsBoard)
  getTaggedCardsBoard.forEach((el) => {
    el.addEventListener('click', async () => {
      console.log(el);
      console.log(el.dataset.boardid);
      const boardId = el.dataset.boardid;
      try {
        const res = await axios({
          method: 'GET',
          url: 'http://127.0.0.1:5000/api/v1/workspaces/tags/' + bId,
          data: { boardId },
        });
        if (res.data.status === 'success') {
          console.log('open this tag success !!');
          window.setTimeout(() => {
            // location.reload(true);
            // window.location.assign(`/tags/${el.dataset.boardid}`);
            console.log('done!');
          }, 500);
        }
      } catch (error) {
        console.error('error', error.response.data.message);
      }
    });
  });

// const changeUseRole = document.querySelectorAll('change-role');
// if (changeUseRole) {
//   const currentUserRole = document.getElementsByClassName('user-current-role');
//   if (currentUserRole.length > 0) {
//     console.log(currentUserRole);
//     console.log(currentUserRole[0]);
//     console.log(currentUserRole[0].dataset);
//     console.log(currentUserRole[0].dataset.userid);
//     changeUseRole.forEach((el) => {
//       el.addEventListener('click', () => {
//         console.log(el.dataset.role, el.dataset.userid);
//       });
//     });
//   }
// }

const changeRole = document.querySelectorAll('.update-role-members');
if (changeRole) {
  changeRole.forEach((el) => {
    el.addEventListener('click', (e) => {
      console.log(e.target);
      console.log('ddd', e.target.dataset.role);
      console.log(e.target.dataset.userid);
      const currentRole = document.querySelectorAll('.user-current-role');
      currentRole.forEach((elm) => {
        console.log(elm);
        if (elm.dataset.userid === e.target.dataset.userid) {
          // if (elm.dataset.role !== e.target.dataset.role) {
          console.log('hi', ' need to return');
          applyChangeRole(
            e.target.dataset.userid,
            e.target.dataset.role,
            e.target.dataset.wsid
          );
          // }
        }
      });
    });
  });
}

const updateWsForm = document.querySelector('.update-ws-form');
if (updateWsForm)
  updateWsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const wsId = updateWsForm.dataset.wsid;
    const wsName = document.getElementById('wsup-name').value;
    const wsDescreption = document.getElementById('wsup-des').value;
    let type = '';
    if (document.getElementById('updatepublic').checked) type = 'public';
    if (document.getElementById('updateprivate').checked) type = 'private';
    updateWsData(wsName, wsDescreption, type, wsId);
  });

const updateBoardForm = document.querySelectorAll('.update-board-form');
if (updateBoardForm)
  updateBoardForm.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const bName = form.childNodes[2].childNodes[1].value;
      const bDescreption = form.childNodes[4].childNodes[1].value;
      const bEndDate = form.childNodes[3].childNodes[1].value;
      const bId = form.dataset.bid;
      updateBoardData(bName, bDescreption, bEndDate, bId);
    });
  });

const resetDefaultWS = document.querySelector('#reset-ws');
if (resetDefaultWS)
  resetDefaultWS.addEventListener('click', async () => {
    const wsIdForReset = resetDefaultWS.dataset.wsid;
    try {
      const res = await axios({
        method: 'DELETE',
        url: 'http://127.0.0.1:5000/api/v1/users/resetWS',
        data: { wsIdForReset },
      });
      if (res.data.status === 'success') {
        window.setTimeout(() => {
          location.reload(true);
          console.log('done!');
        }, 500);
      }
    } catch (error) {
      console.error('error', error.response.data.message);
    }
  });

const deleteWS = document.querySelectorAll('.delete-ws');
if (deleteWS)
  deleteWS.forEach((el) => {
    // console.log('hi');
    const deletedWS = el.dataset.wsid;
    el.addEventListener('click', async () => {
      try {
        const res = await axios({
          method: 'DELETE',
          url: 'http://127.0.0.1:5000/api/v1/workspaces/deleteWS',
          data: { deletedWS },
        })
          .then(console.log('final proccess'))
          .then(window.location.replace('/'));
      } catch (error) {
        console.error('error', error.response.data.message);
      }
    });
  });

// const deleteMember = document.querySelectorAll('.delete-member');
// if (deleteMember)
//   deleteMember.forEach((el) =>
//     el.addEventListener('click', async () => {
//       const wsId = el.dataset.wsid;
//       const memberId = el.dataset.userid;
//       console.log(wsId, memberId);
//       try {
//         const res = await axios({
//           method: 'GET',
//           url: 'http://127.0.0.1:5000/api/v1/workspaces/deleteMember',
//           data: { wsId, memberId },
//         })
//           .then(console.log('final proccess here'))
//           .then(window.location.reload(true));
//       } catch (error) {
//         console.error('error', error.response.data.message);
//       }
//     })
//   );
