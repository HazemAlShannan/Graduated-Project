// // start toolipp


// const toolip_element = document.querySelectorAll('.tooltip-element');

// function showTooltip() {
//   let tooltip = this.parentNode.lastElementChild;
//   let spans = tooltip.children;
//   let tooltipIndex = this.dataset.tooltip;

//   Array.from(spans).forEach((sp) => sp.classList.remove('show'));
//   spans[tooltipIndex].classList.add('show');
//   tooltip.style.top = `${(100 / (spans.length * 2)) * (tooltipIndex * 2 + 1)}%`;
// }
// toolip_element.forEach((ele) => {
//   ele.addEventListener('mouseover', showTooltip);
// });

// // end toolipp

// // create btn card

// let create = document.querySelector('.create-model');
// let btn = document.querySelector('.btnn');
// let close_create = document.querySelector('.closes');
// let heade = document.querySelector('header');
// let maiiin = document.querySelector('.mainn');
// let foot = document.querySelector('.footer');
// let nav = document.querySelector('.navigation');

// btn.addEventListener('click', appear);
// function appear() {
//   create.style.display = 'block';
//   heade.classList.add("blur");
//   // maiiin.classList.add("blur");
//   foot.classList.add("blur");
//   nav.classList.add("blur");
//   maiiin.classList.add("blur");
// };

// close_create.addEventListener('click', closes);
// function closes() {
//   create.style.display = 'none';
//   heade.classList.remove("blur");
//   // maiiin.classList.remove("blur");
//   foot.classList.remove("blur");
//   nav.classList.remove("blur");
//   maiiin.classList.remove("blur");
// };

// // end create btn card

// //main

// const imgDiv = document.querySelector('.profile-pic-div');
// const img = document.querySelector('#photo');
// const upload = document.querySelector('#uploadBtn');
// const file = document.querySelector('#file');

// imgDiv.addEventListener('mouseenter', function () {
//   upload.style.display = 'block';
// });

// imgDiv.addEventListener('mouseleave', function () {
//   upload.style.display = 'none';
// });

// file.addEventListener('change', function () {
//   const chooseFile = this.files[0];
//   if (chooseFile) {
//     const reader = new FileReader();
//     reader.addEventListener('load', function () {
//       img.setAttribute('src', reader.result);
//     });

//     reader.readAsDataURL(chooseFile);
//   }
// });

// const plus_box= document.querySelector(".plus-box");
// const add_i =document.querySelector(".plus-i");
// add_i.addEventListener("click", function(){
//   plus_box.classList.add("b");
// });

// const cancelPlus = document.querySelector(".cancelPlus");
// cancelPlus.addEventListener("click",function(){
//   plus_box.style.display = "block";
// });

// const Pmain = document.querySelector(".create-icon");
// const board_box = document.querySelector(".create-B");
// Pmain.addEventListener("click",function(){
//   board_box.style.display="block";
// });

// const Closeboard_box = document.querySelector(".cancel-board");
// cancel-board.addEventListener("click",function(){
//   board_box.style.display="none";
// });

// const show_cardProfile = document.querySelector(".profile-card ")
// const show_card = document.querySelector(".show-card");
// show_card.addEventListener("click", show_card_profile)
// function show_card_profile() {
//   show_cardProfile.style.display = 'block';
// }; 

// const close_cardPro = document.querySelector(".close-profileCard ");
// show_card.addEventListener("click", close_card_profile)
// function close_card_profile() {
//   show_cardProfile.style.display = 'none';
// }; 

// // var swiper = new Swiper(".mySwiper", {
// //   effect: "coverflow",
// //   grabCursor: true,
// //   centeredSlides: true,
// //   slidesPerView: "auto",
// //   coverflowEffect: {
// //     rotate: 50,
// //     stretch: 0,
// //     depth: 100,
// //     modifier: 1,
// //     slideShadows: true,
// //   },
// //   pagination: {
// //     el: ".swiper-pagination",
// //   },
// // });
// // geting localstorage todo-list
// const taskinput = document.querySelector(".task-input input"),
// filters = document.querySelectorAll(".filters span"),
// clearAll = document.querySelector(".clear-btn"),
// taskbox = document.querySelector(".task-box");
// let editId;
// let isEditedTask= false;

// let todos = json.parse(localStorage.getItem("todo-list"));
// filters.forEach(btn => {
//   btn.addEventListener("click", () =>{
//     document.querySelector("span.active").classList.remove("active");
//     btn.classList.add("active");
//     showTodo(btn.id);
//   });

// });
// function showTodo(filter) {
//   let li = "";
//   if(todos){
//     todos.forEach((todo, id) => {
//       let isCompleted = todo.status == "completed" ? "cheched" : "";
//       if(filter == todo.status || filter == "all"){
//       // console.log(id , todo)
//       // li += '<li class="task">
//       //           <label for="${id}">
//       //             <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
//       //             <p class= " ${isCompleted}">${todo.name}</p>
//       //           </label>
//       //           <div class="settings">
//       //             <i onclick ="showMenu(this)" class="bx bx-dots-horizontal-rounded"></i>
//       //             <ul class="task-menu">
//       //               <li  onclick="editTask(${id, '${todo.name}'}"><i class="bx bxs-edit-alt"></i> Edit</li>
//       //               <li  onclick="deleteTask(${id}")><i class="bx.bxs-trash-alt"></i> Delete</li>
//       //             </ul>
//       //           </div>
//       //       </li>';
//       }
  
//   });
// }
//   // taskbox.innerHTML = li || '<span> You donot have any task here</span> ';
// }
// showTodo("all");
// function showMenu(selectedTask){
//   let taskMenu = selectedTask.parentElement.lastElementChild;
//    taskMenu.classList.add("show");
//    document.addEventListener("click", e => {
//      if(e.target.taskName != "I" || e.target != selectedTask){
//       taskMenu.classList.remove("show");
//      }
//    });
// }
// function editTask(taskId, taskName) {
//   editId = taskId;
//   isEditedTask = true;
//   taskinput.value = taskName;
  
// }


// function deleteTask(deleteId){
//   //remoing selected task from array/todos
//   todos.splice(deleteId, 1);
//   localStorage.setItem("todo-list" , json.stringify(todos));
//   showTodo("all");
  
// }

// clearAll.addEventListener("click", () =>{
//     //remoing all from array/todos
//     todos.splice(0, todos.length);
//     localStorage.setItem("todo-list" , json.stringify(todos));
//     showTodo("all");

// })

// function updateStatus(selectedTask){
//   // console.log(selectedTask);
//   // geting paragraph that contains task name
//   let taskName = selectedTask.parentElement.lastElementChild;
//   if(selectedTask.checked){
//     taskName.classList.add("checked");
//     // updating the status of selected task to completed
//     todos[selectedTask.id].status = "completed"
//   }else { // updating the status of selected task to pending
//     taskName.classList.remove("checked");
//     todos[selectedTask.id].status = "pending"
//   }
//   localStorage.setItem("todo-list" , json.stringify(todos));
// }
// taskinput.addEventListener("keyup", e => {
//   let usertask = taskinput.value.trim();
//   if(e.key == "Enter" && usertask){
//     if(!isEditedTask){
//           // console.log(usertask)
//           if(!todos) { //if todos isnot exists, pass an empty array to todos 
//             todos = [];
//           }
//           let taskInfo = {name: usertask, status: "pending"};
//           todos.push(taskInfo) //adding new task to todos
//     }else{
//       isEditedTask = false;
//       todos[editId].name= usertask;
//     }
//     taskinput.value = ""; 
//     localStorage.setItem("todo-list" , json.stringify(todos));
//     showTodo("all");
//   }
// });