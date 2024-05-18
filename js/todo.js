const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function editToDo(event) {
  const li = event.target.parentElement;
  const span = li.querySelector("span");
  const newText = prompt("Edit the to-do:", span.innerText);
  if (newText !== null && newText.trim() !== "") {
    const todoId = parseInt(li.id);
    toDos = toDos.map((toDo) => {
      if (toDo.id === todoId) {
        toDo.text = newText;
      }
      return toDo;
    });
    span.innerText = newText;
    saveToDos();
  }
}

function paintToDo(newToDo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");

  li.id = newToDo.id;
  span.innerText = newToDo.text;
  deleteButton.innerText = "X";
  editButton.innerText = "Edit";

  deleteButton.className = "button-name button-delete";
  editButton.className = "button-name button-edit";

  deleteButton.addEventListener("click", deleteToDo);
  editButton.addEventListener("click", editToDo);

  toDoList.appendChild(li);
  li.appendChild(span);
  li.appendChild(deleteButton);
  li.appendChild(editButton);
}

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newToDo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);
