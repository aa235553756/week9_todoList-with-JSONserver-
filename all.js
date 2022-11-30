const todoList = document.querySelector('#todoList');
const todoInput = document.querySelector('#todoInput');
const todoText = document.querySelector('#todoText');
const delButton = document.querySelector('.delButton')
const todoCount = document.querySelector('#todoCount')
const delAll = document.querySelector('#delAll')
const tab = document.querySelector('#tab');
let data = [];

// todo1 => 先做好CRUD 
// * Read
// * Create
// * Delete
// * DeleteAll
// * Update
// * 待完成計算
// * 清除已完成
// * 篩選功能
// * 篩選狀況下新增
// * 篩選狀況下更改

getAndRender() // init()

// ! DOM EventListner
// addTodo(Enter)
todoText.addEventListener('keydown',function(e){
    if(e.key==='Enter' && todoText.value !== ``){
        addTodo(todoText.value);
        todoText.value = ``
    }
})

// addTodo
todoInput.addEventListener('click',function(e){
    if(e.target.parentNode.nodeName !== 'BUTTON' || todoText.value === ''){
        return;
    }else{
        addTodo(todoText.value);
        todoText.value = ``
    }
})

// delTodo
todoList.addEventListener('click',function(e){
    if(e.target.parentNode.dataset.del){
        let id = Number(e.target.parentNode.dataset.id);
        data.forEach((item,index)=>{
            if(item.id === id){
                data.splice(index,1);
            }
        })
        render();
        delTodo(id);
    }
})

//delAll
delAll.addEventListener('click',function(e){
    data = data.filter((item)=>{
        if(item.checked === true){
            delTodo(item.id)
        }
        return (item.checked === false)
    })
    tabStateRender()
})

//checked
todoList.addEventListener('click',function(e){
    if(e.target.nodeName!=="UL"){
        if(e.target.nodeName === "LI" && e.target.dataset.id !== undefined){
            let targetId = Number(e.target.dataset.id);
            changeCheckedAndRender(targetId)
        }else if(e.target.parentNode.nodeName !== 'BUTTON' && e.target.parentNode.dataset.id !== undefined){
            // ? (!==delButton)
            let targetId = Number(e.target.parentNode.dataset.id);
            changeCheckedAndRender(targetId)
        }
    }
})

//changeTab
tab.addEventListener('click',function(e){
    let list = tab.childNodes;
    let value = e.target.value;
    switch(value){
        case '全部':{
            list[1].classList.add('tab--active');
            list[3].classList.remove('tab--active');
            list[5].classList.remove('tab--active');
            render();
            break;
        }
        case '待完成':{
            list[1].classList.remove('tab--active');
            list[3].classList.add('tab--active');
            list[5].classList.remove('tab--active');
            filterRender(false);
            break;
        }
        case '已完成':{
            list[1].classList.remove('tab--active');
            list[3].classList.remove('tab--active');
            list[5].classList.add('tab--active');
            filterRender(true);
            break;
        }
        default:{
            break;
        }
    }
})

// ! function declare
function render(){
    if(data.length === 0){
        todoList.innerHTML=`<li class="pb-4 -ml-4 space-x-4 relative after:content-[''] after:absolute after:bg-[#E5E5E5] after:bottom-0 after:left-4 after:w-[calc(100%-64px)] after:h-[1px]">
        <p class="text-center text-[#9F9A91]">目前無待辦事項</p>
        </li>`
        todoCount.textContent = `0 個待完成項目`
    }else{
        let str = ``
        let count = 0;
        data.forEach((item)=>{
            if(item.checked===true){
                str+=`<li data-id=${item.id} data-checked=${item.checked} class="del flex group relative pb-4 space-x-4 after:content-[''] after:absolute after:bg-[#E5E5E5] after:bottom-0 after:w-[calc(100%-48px)] after:h-[1px]">
                <img src="./dist/image/checking.svg" alt="" class="checkbox" width="20px" height="24px">
                <p>${item.content}</p>
                <button data-id=${item.id} data-del="true" class="group-hover:block hidden absolute -top-1 right-2"><img src="./dist/image/close.png" alt="" class="p-2"></button>
            </li>`
            }else{
                count+=1;
                str+=`<li data-id=${item.id} data-checked=${item.checked} class="flex group relative pb-4 space-x-4 after:content-[''] after:absolute after:bg-[#E5E5E5] after:bottom-0 after:w-[calc(100%-48px)] after:h-[1px]">
                <img src="./dist/image/checkbox.svg" alt="" class="checkbox" width="20px" height="24px">
                <p>${item.content}</p>
                <button data-id=${item.id} data-del="true" class="group-hover:block hidden absolute -top-1 right-2"><img src="./dist/image/close.png" alt="" class="p-2"></button>
            </li>`
            }
        })
        todoList.innerHTML = str;
        todoCount.textContent = `${count} 個待完成項目`
    }
}

function renderWithParm(data){
    if(data.length === 0){
        todoList.innerHTML=`<li class="pb-4 -ml-4 space-x-4 relative after:content-[''] after:absolute after:bg-[#E5E5E5] after:bottom-0 after:left-4 after:w-[calc(100%-64px)] after:h-[1px]">
        <p class="text-center text-[#9F9A91]">目前無待辦事項</p>
        </li>`
        todoCount.textContent = `0 個待完成項目`
    }else{
        let str = ``
        let count = 0;
        data.forEach((item)=>{
            if(item.checked===true){
                str+=`<li data-id=${item.id} data-checked=${item.checked} class="del flex group relative pb-4 space-x-4 after:content-[''] after:absolute after:bg-[#E5E5E5] after:bottom-0 after:w-[calc(100%-48px)] after:h-[1px]">
                <img src="./dist/image/checking.svg" alt="" class="checkbox" width="20px" height="24px">
                <p>${item.content}</p>
                <button data-id=${item.id} data-del="true" class="group-hover:block hidden absolute -top-1 right-2"><img src="./dist/image/close.png" alt="" class="p-2"></button>
            </li>`
            }else{
                count+=1;
                str+=`<li data-id=${item.id} data-checked=${item.checked} class="flex group relative pb-4 space-x-4 after:content-[''] after:absolute after:bg-[#E5E5E5] after:bottom-0 after:w-[calc(100%-48px)] after:h-[1px]">
                <img src="./dist/image/checkbox.svg" alt="" class="checkbox" width="20px" height="24px">
                <p>${item.content}</p>
                <button data-id=${item.id} data-del="true" class="group-hover:block hidden absolute -top-1 right-2"><img src="./dist/image/close.png" alt="" class="p-2"></button>
            </li>`
            }
        })
        todoList.innerHTML = str;
        todoCount.textContent = `${count} 個待完成項目`
    }
}

function filterRender(bool){
    newData = data.filter((item)=>{
        return (item.checked === bool)
    })
    if(bool===true && newData.length===0){
        todoList.innerHTML=`<li class="pb-4 -ml-4 space-x-4 relative after:content-[''] after:absolute after:bg-[#E5E5E5] after:bottom-0 after:left-4 after:w-[calc(100%-64px)] after:h-[1px]">
        <p class="text-center text-[#9F9A91]">目前無完成事項</p>
        </li>`
        return;
    }
    renderWithParm(newData);
}

function getAndRender(){
    let list = tab.childNodes
    axios.get('https://fathomless-brushlands-42339.herokuapp.com/todo2')
    .then((res)=>{
        console.log(res.data);
        list[1].classList.add('tab--active');
        list[3].classList.remove('tab--active');
        list[5].classList.remove('tab--active');
        data = res.data;
        render();
    })
    .catch((err)=>{
        console.log(err);
    })
}

function addTodo(text){
    let obj= {
        content:text,
        checked: false
    };
    axios.post('https://fathomless-brushlands-42339.herokuapp.com/todo2',obj)
    .then((res)=>{
        console.log(res.data);
        getAndRender();
    })
    .catch((error)=>{
        console.log(error);
    })
}

function delTodo(id){
    axios.delete(`https://fathomless-brushlands-42339.herokuapp.com/todo2/${id}`)
    .then(function(res){
        console.log(res.data);
    })
    .catch(function(error){
        console.log(error);
    })
}

function changeTodo(id,bool){
    axios.patch(`https://fathomless-brushlands-42339.herokuapp.com/todo2/${id}`,{
        checked : bool
    }).then((res)=>{
        console.log(res.data);
    }).catch((err)=>{
        console.log(err);
    })
}

function changeCheckedAndRender(id,bool){
    data.forEach((item)=>{
        if(item.id === id){
            item.checked = !item.checked
            changeTodo(id,item.checked)
        }
    })
    tabStateRender()
}

function tabStateRender(){
    let list = tab.childNodes
    if(list[1].classList.contains('tab--active')){
        render()
        console.log(true);
    }else if(list[5].classList.contains('tab--active')){
        filterRender(true)
    }else{
        filterRender(false)
    }
}