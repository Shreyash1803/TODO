//getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
  let userData = inputBox.value; //get user data eneter value
  if (userData.trim() != 0) { //if user valuess arent only spaces
    addBtn.classList.add("active"); // active the add button
  } else {
    addBtn.classList.remove("active"); // unactive the add button
  }
}
showTask();

//if user click on the add button
addBtn.onclick = () => {
  let userData = inputBox.value; //get user data eneter value
  let getLocalStorage = localStorage.getItem("New Todo"); // getting local localStorage
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  listArr.push(userData); // pushing or adding user data
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTask(); //calling show task fuction
  addBtn.classList.remove("active");
}

//function to add task list
function showTask() {
  let getLocalStorage = localStorage.getItem("New Todo"); // getting local localStorage
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  const pendingNumb = document.querySelector(".pendingNumb");
  pendingNumb.textContent = listArr.length;
  if(listArr.length>0){
    deleteAllBtn.classList.add("active");
  }else{
    deleteAllBtn.classList.remove("active");
  }
  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; // adding new li tag line
  inputBox.value = ""; // once task added leave the input field
}


//delete task function

function deleteTask(index){
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1); //delete or remove the particular index

  //after remove the li again update the local storage
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTask();
}


//delete all task function

deleteAllBtn.onclick = ()=>{
  listArr=[];
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTask();
}
