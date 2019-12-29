import {TreeUtils} from './TreeUtils.js';

const question = document.getElementById('question');
const left = document.getElementById('left');
const right = document.getElementById('right');

const inputIndex = document.getElementById('input-index');
const inputQuestion = document.getElementById('input-question');
const inputAnswer = document.getElementById('input-answer');

const create = document.getElementById('create');
const deleteAll = document.getElementById('delete-all');

//Tạo LIST
let LIST;
let data = localStorage.getItem("TreeUtils");
if(data) {
    LIST = JSON.parse(data);
} else {
    LIST = [];
}

//Đẩy dữ liệu vào LIST
let createData = function() {
    const index = inputIndex.value;
    const question = inputQuestion.value;
    const answer = inputAnswer.value;
    if(index && question && answer) {
        LIST.push({
            index : index,
            question : question,
            answer : answer
        });
    }
    inputIndex.value = "";
    inputQuestion.value = "";
    inputAnswer.value = "";
};

create.onclick = function() {
    createData();
    location.reload();
    localStorage.setItem("TreeUtils", JSON.stringify(LIST));
};

let TreeBuilder = function() {};
let utils = new TreeUtils();
let tree = {};

TreeBuilder.prototype.data = function() {
    for(let i = 0; i < LIST.length; i++) {
        utils.addToTree(tree, LIST[i].index, { answer : LIST[i].answer, question : LIST[i].question });
    }
    
}
const builder = new TreeBuilder();
builder.data();

let updateQuestion = function() {
    if(tree.data !== undefined) {
        question.innerHTML = tree.data.question;
    }
}

let updateAnswer = function() {
    let l = tree.left;
    let r = tree.right;
    if(l.data !== undefined && l.data !== undefined) {
        left.innerHTML = l.data.answer;
        right.innerHTML = r.data.answer;
    } else {
        left.parentNode.removeChild(left);
        right.parentNode.removeChild(right);
    }
}

updateQuestion();
updateAnswer();

left.onclick = function() {
    updateQuestion();
    updateAnswer();
    tree = tree.left;
};

right.onclick = function() {
    updateQuestion();
    updateAnswer();
    tree = tree.right;
};

deleteAll.onclick = function() {
    localStorage.removeItem("TreeUtils");
    location.reload();
}