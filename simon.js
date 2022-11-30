let text = document.querySelector('.text');
let save = document.querySelector('.save');
let list = document.querySelector('.list');
let check = document.querySelector('.check');
let count = document.querySelector('.count');
let data = [];
axios
  .get('https://fathomless-brushlands-42339.herokuapp.com/todo4')
  .then(function (response) {
    console.log(response.data);
    data = response.data;
    init();
  });

text.addEventListener('keydown',enter)
function enter(e){
  if(e.keyCode!==13){return}
  saveData();
}

//重新整理資料
function init() {
  let str = '';
  let remain = 0;
  data.forEach(function (items, index) {
    str += `<li class="${items.del}"><a  href="#"><img data-check="${items.check}" class="check ${items.finished}"  data-num=${index} src="images/check_box_outline_blank_black_24dp.svg"></a>${items.item}<a  data-num=${index} href="#" class="del"></a></li>`;
    if (items.check == 'false') {
      remain += 1;
    }
  });
  count.innerHTML = `${remain} 個待完成項目`;
  list.innerHTML = str;
}
//新增
save.addEventListener('click', saveData);
function saveData(e) {
  let obj = { finished: '', check: 'false', del: '' };
  if (text.value == '') {
    return;
  }
  obj.item = text.value;
  data.push(obj);
  axios
    .post('https://fathomless-brushlands-42339.herokuapp.com/todo4', obj)
    .then(function (response) {
      axios
        .get('https://fathomless-brushlands-42339.herokuapp.com/todo4')
        .then(function (response) {
          console.log(response.data);
          data = response.data;
          init();
        });
    });
  text.value = '';
}
//刪除&修改
list.addEventListener('click', remove);
function remove(e) {
  e.preventDefault();
  let num = e.target.dataset.num;
  let check = e.target.dataset.check;

  if (e.target.nodeName == 'IMG' && e.target.nodeName !== 'A') {
    let obj = {};
    let id = data[num].id;
    if (check == 'false') {
      obj.check = data[num].check = 'true';
      obj.finished = data[num].finished = 'confirm-finished';
      obj.del = data[num].del = 'finished';
      axios.patch(`https://fathomless-brushlands-42339.herokuapp.com/todo4/${id}`,obj)
      .then(function(response){
        console.log(response.data)
      })
      ;
    } else if (check == 'true') {
      obj.check = data[num].check = 'false';
      obj.finished = data[num].finished = '';
      obj.del = data[num].del = '';
           axios
             .patch(
               `https://fathomless-brushlands-42339.herokuapp.com/todo4/${id}
             `,
               obj
             )
             .then(function (response) {
               console.log(response.data);
             });

    }

    init();
    return;
  }
  //刪除
  if (e.target.nodeName == 'A') {
    let id = data[num].id;
    data.splice(num, 1);
    axios
      .delete(
        `https://fathomless-brushlands-42339.herokuapp.com/todo4/${id}`
      )
      .then(function (response) {
      });
  }
  init();
}

let select = document.querySelector('.select');

select.addEventListener('click', changeList);
function changeList(e) {
  let choose = e.target.value;
  let str = '';
  if (choose == '全部') {
    init();
  }
  if (choose == '待完成') {
    data.forEach(function (items, index) {
      if (items.check == 'false') {
        str += `<li class="${items.del}"><a  href="#"><img data-check="${items.check}" class="check ${items.finished}"  data-num=${index} src="images/check_box_outline_blank_black_24dp.svg"></a>${items.item}<a  data-num=${index} href="#" class="del"></a></li>`;
      }
    });
    list.innerHTML = str;
  }
  if (choose == '已完成') {
    data.forEach(function (items, index) {
      if (items.check == 'true') {
        str += `<li class="${items.del}"><a  href="#"><img data-check="${items.check}" class="check ${items.finished}"  data-num=${index} src="images/check_box_outline_blank_black_24dp.svg"></a>${items.item}<a  data-num=${index} href="#" class="del"></a></li>`;
      }
    });
    list.innerHTML = str;
  }
}

$(document).ready(function () {
  $('.select li').click(function (e) {
    $(this).addClass('underline').siblings().removeClass('underline');
  });
});