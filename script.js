let addMasage = document.querySelector(".message");
let addButtom = document.querySelector(".add");
let todo = document.querySelector(".todo");

let todoList = [];

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMasages();
}

addButtom.addEventListener('click', function(){
    if(addMasage.value !== ""){
        let newTodo = {
            todo: addMasage.value,
            checked: false,
            important: false
        }
        todoList.push(newTodo);
        displayMasages();
        localStorage.setItem('todo', JSON.stringify(todoList));
        addMasage.value = ''
    }
});


function displayMasages(){
    let displayMassage = '';
    if(addMasage.value !== ""){
        todoList.forEach(function(item, index){
            displayMassage += `
            <li>
            <input type='checkbox' id='item_${index}' ${item.checked ? 'checked':''}>
            <label for='item_${index}'class=${item.important ? 'important': ''}>${item.todo}</label>
            </li>
            `;
            todo.innerHTML = displayMassage;
        })
    }else{
        console.log("gacda")
    }
}
todo.addEventListener('change', function(event){
    let idInput = event.target.getAttribute('id');
    let valueLable = todo.querySelector('[for=' + idInput + ']').innerHTML;

    todoList.forEach(function(item){
        if(item.todo===valueLable){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    todoList.forEach(function(item, i){
        
        if(item.todo === event.target.innerHTML){
            if(event.deleteKey || event.target.innerHTML){
                todoList.splice(i,1);
            }else{
                item.important = !item.important;
            }
            displayMasages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }     
    });
});