'use strict';


const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

const toDoData = [
    {
      value: 'Сварить кофе',
      completed: false
    },
    {
      value: 'Помыть посуду',
      completed: true
    }
  ];

  

const render = function (){
    todoList.textContent = '';
    todoCompleted.textContent = '';

    toDoData.forEach(function(item){
      const li = document.createElement('li');
      li.classList.add('todo-item');

      li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
        '<div class="todo-buttons">' + 
          '<button class="todo-remove"></button>' +
          '<button class="todo-complete"></button>' +
        '</div>';

      if(item.completed){
          todoCompleted.append(li);
        } else {
          todoList.append(li);
        }       
      
        const btnTodoCompleted = li.querySelector('.todo-complete');
        btnTodoCompleted.addEventListener('click', function(){
          item.completed = !item.completed;
          render();
        }); 
        const itemRemove = function(elem){
          const item = elem.parentNode.parentNode;
          const itemParent = item.parentNode;
          const id = itemParent.id;
          const text = item.textContent;
          // console.log(id);
          // console.log(text);
          itemParent.remove(item);
          // console.log(itemParent);
          console.log(item);


        }





        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function(event){
          itemRemove (event.target)
          
          render();
        });
        
    });
  };




  todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if(headerInput.value !== ''){
      const newToDo = {
        value: headerInput.value,
        completed: false
      }
      toDoData.push(newToDo);
      headerInput.value = '';
    };
    

    render();
  });


render();