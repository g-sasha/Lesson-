'use strict';

document.addEventListener('DOMContentLoaded', function(){
const form = document.querySelector('.todo-control');
const todoList = document.getElementById('todo');
const completedList = document.getElementById('completed');
const headerImput = document.querySelector('.header-input');

// Создаем объект 
let data = {
  todo: [],
  completed: []
};
// проверка localStorage на наличие данных
if (localStorage.getItem('localData')){
  data = JSON.parse(localStorage.getItem('localData'));
}
// Функция которая рендерит наши данные есть они есть в localStorage
const renderItemsForUpdate= function(){
  if(!data.todo.length && !data.completed.length) return;

  for (let i=0; i < data.todo.length; i++){
    renderItem(data.todo[i]);
  };
  for (let i=0; i < data.completed.length; i++){
    renderItem(data.completed[i], true);
  };

};
// Добавление данных в localStorage
const dataUpdateToLocalS = function(){
  localStorage.setItem('localData', JSON.stringify(data));
  console.log(localStorage.getItem('localData'));

};
// функция добавляет элемент на страницу 
const addItem = function(text){
  renderItem(text);
  headerImput.value = '';
  data.todo.push(text);

  dataUpdateToLocalS();

};
//Удаление элемента 
const itemRemove = function(elem){
  const item = elem.parentNode.parentNode;
  const itemParent = item.parentNode;
  const id = itemParent.id;
  const text = item.textContent;

  if(id === 'todo'){
    data.todo.splice(data.todo.indexOf(text), 1);
  } else {
    data.completed.splice(data.completed.indexOf(text), 1);
  }
    
  itemParent.removeChild(item);
  dataUpdateToLocalS();
};
// Добавление элемента 
const itemComplete = function(elem){
  const item = elem.parentNode.parentNode;
  const itemParent = item.parentNode;
  const id = itemParent.id;
  const text = item.textContent;

  let target;

  if(id === 'todo'){
    target = completedList;
  } else {
    target = todoList;
  }

  if(id === 'todo'){
    data.todo.splice(data.todo.indexOf(text), 1);
    data.completed.push(text);
  } else {
    data.completed.splice(data.completed.indexOf(text), 1);
    data.todo.push(text);
  }

  itemParent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
  dataUpdateToLocalS();
};

// Функция рендеринга одного элемента 
const renderItem = function(text, completed = false){
  const item = document.createElement('li');
  const btnBlock = document.createElement('div');
  const btnRemove = document.createElement('button');
  const btnComlete = document.createElement('button');

  let list;
  if(completed){
    list = completedList;
  } else{
    list = todoList;
  }

  item.classList.add('todo-item');
  btnBlock.classList.add('todo-buttons');
  btnRemove.classList.add('todo-remove');
  btnComlete.classList.add('todo-complete');

  item.textContent = text;

  btnRemove.addEventListener('click', function(){
    itemRemove(event.target);
  });

  btnComlete.addEventListener('click', function(){
    itemComplete(event.target);
  });
  
  btnBlock.appendChild(btnRemove);
  btnBlock.appendChild(btnComlete);
  item.appendChild(btnBlock); 

  list.insertBefore(item, list.childNodes[0]);
};


form.addEventListener('submit', function(event){
  event.preventDefault();
  if (headerImput.value !== ''){
    addItem(headerImput.value);
  }
})

renderItemsForUpdate();
});































// const todoControl = document.querySelector('.todo-control'),
//   headerInput = document.querySelector('.header-input'),
//   todoList = document.querySelector('.todo-list'),
//   todoCompleted = document.querySelector('.todo-completed');

// const toDoData = [
//     {
//       value: 'Сварить кофе',
//       completed: false
//     },
//     {
//       value: 'Помыть посуду',
//       completed: true
//     }
//   ];

  

// const render = function (){
//     todoList.textContent = '';
//     todoCompleted.textContent = '';

//     toDoData.forEach(function(item){
//       const li = document.createElement('li');
//       li.classList.add('todo-item');

//       li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
//         '<div class="todo-buttons">' + 
//           '<button class="todo-remove"></button>' +
//           '<button class="todo-complete"></button>' +
//         '</div>';

//       if(item.completed){
//           todoCompleted.append(li);
//         } else {
//           todoList.append(li);
//         }       
      
//         const btnTodoCompleted = li.querySelector('.todo-complete');
//         btnTodoCompleted.addEventListener('click', function(){
//           item.completed = !item.completed;
//           render();
//         }); 
//         const itemRemove = function(elem){
//           const item = elem.parentNode.parentNode;
//           const itemParent = item.parentNode;
//           const id = itemParent.id;
//           const text = item.textContent;
//           // console.log(id);
//           // console.log(text);
//           itemParent.remove(item);
//           // console.log(itemParent);
//           console.log(item);


//         }





//         const btnTodoRemove = li.querySelector('.todo-remove');
//         btnTodoRemove.addEventListener('click', function(event){
//           itemRemove (event.target)
          
//           render();
//         });
        
//     });
//   };




//   todoControl.addEventListener('submit', function(event){
//     event.preventDefault();
//     if(headerInput.value !== ''){
//       const newToDo = {
//         value: headerInput.value,
//         completed: false
//       }
//       toDoData.push(newToDo);
//       headerInput.value = '';
//     };
    

//     render();
//   });


// render();