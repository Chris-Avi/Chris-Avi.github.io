class Task {
    constructor(title, description, date) {
      this.title = title;
      this.description = description;
      this.date = date;
    }
  }
  
 
  class UI {
    static displayTasks() {
      const tasks = Store.getTasks();
  
      tasks.forEach((task) => UI.addTaskToList(task));
    }
  
    static addTaskToList(task) {
      const list = document.querySelector('#taskList');
  
      const taskItem = document.createElement('li');
      taskItem.className = 'list-group-item';
      taskItem.innerHTML = `
        <h4>${task.title}</h4>
        <p>${task.description}</p>
        <small>${task.date}</small>
        <button class="btn btn-danger btn-sm float-right delete">Delete</button>
      `;
      list.appendChild(taskItem);
    }
  
    static deleteTask(element) {
      if (element.classList.contains('delete')) {
        element.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#taskForm');
      container.insertBefore(div, form);
     
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#description').value = '';
      document.querySelector('#date').value = '';
    }
  }
  

  class Store {
    static getTasks() {
      let tasks;
      if (localStorage.getItem('tasks') === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }
      return tasks;
    }
  
    static addTask(task) {
      const tasks = Store.getTasks();
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    static removeTask(title) {
      const tasks = Store.getTasks();
      tasks.forEach((task, index) => {
        if (task.title === title) {
          tasks.splice(index, 1);
        }
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  

  document.addEventListener('DOMContentLoaded', UI.displayTasks);
  
 
  document.querySelector('#taskForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const date = document.querySelector('#date').value;
  
    
    if (title === '' || description === '' || date === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
     
      const task = new Task(title, description, date);
  
     
      UI.addTaskToList(task);
  
      
      Store.addTask(task);
  
    
      UI.showAlert('Task added', 'success');
  
     
      UI.clearFields();
    }
  });
  
 
  document.querySelector('#taskList').addEventListener('click', (e) => {
    UI.deleteTask(e.target);
  

    Store.removeTask(e.target.parentElement.firstChild.textContent);
  
   
    UI.showAlert('Task removed', 'success');
  });
  
