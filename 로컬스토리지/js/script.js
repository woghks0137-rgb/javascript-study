//html 요소
const todoInput = document.querySelector("#todoInput"),
    addBtn = document.querySelector("#addBtn"),
    todoList = document.querySelector("#todoList");


//localstorage에 저장되어있는 할 일 목록 가져오기
//저장된 데이터가 있으면 보여주고 없으면 저장된 빈 배열로 저장공간을 생성
let todos = JSON.parse(localStorage.getItem('todos')) || [];

/* 할 일 목록을 화면에 보여주는 함수 */
function showTodos() {
    //기존 화면 비우기
    todoList.innerHTML = '';

    //todos 배열의 데이터를 하나씩 반복 
    todos.forEach((todo, index) => {
        //li 만들기 
        const li = document.createElement('li');

        //할 일 내용넣기
        li.innerHTML = `
            <span>${todo}</span>  
            <button class="delete-btn" data-index = "${index}">삭제</button>
        `

        //ul에 li추가 
        todoList.appendChild(li);
    })
}

//추가버튼
addBtn.addEventListener("click", () => {
    //input에 입력한 값 가져오기
    const todo = todoInput.value;

    //input에 아무것도 입력하지 않았을 때
    if (todo === '') {
        alert("할 일을 입력해주세요");
        return;
    }

    //배열에 새로운 할 일 추가
    todos.push(todo)

    //localstorage에 저장
    localStorage.setItem("todos", JSON.stringify(todos));

    //화면에 출력
    showTodos();

    //input 비우기
    todoInput.value = ''
})

todoList.addEventListener("click", (e) => {
    //삭제 버튼을 클릭한 경우에만 실행
    if (e.target.classList.contains("delete-btn")) {
        //클릭한 데이터의 index 가져오기
        const index = e.target.dataset.index;

        //배열에서 해당 데이터 삭제
        todos.splice(index, 1);

        //변경된 배열 다시 저장
        localStorage.setItem("todos", JSON.stringify(todos))

        //화면에 다시 출력
        showTodos();
    }
})

showTodos()