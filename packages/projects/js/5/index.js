import ewUtils from 'ew-utils'

/**
 * 页面功能
 */
const { $, create, on } = new ewUtils();
let allUserData = [];
const main = $('#main');
const addUserBtn = $('#addUser');
const doubleWealthBtn = $('#doubleWealth');
const showMillionairesBtn = $('#showMillionaires');
const sortBtn = $('#sort');
const calculateWealthBtn = $("#calculateWealth");
/**
 * 接口请求数据
 */
async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();

    const user = data.results[0];

    const userData = {
        name: `${user.name.first}${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addUser(userData);
}

/**
 * 添加富翁
 * @param {*} user 
 */
function addUser(user) {
    allUserData.push(user);
    updateDom();
}

/**
 * 财富双倍
 */
function doubleWealth() {
    allUserData = allUserData.map(item => ({ ...item, money: item.money * 2 }));
    // console.log(allUserData);
    updateDom();
}

/**
 * 仅显示百万富翁
 */
function showMillionaires() {
    allUserData = allUserData.filter(item => item.money > 1000000);
    updateDom();
}

/**
 * 排序
 */
function sortData() {
    allUserData = allUserData.sort((a, b) => b.money - a.money);
    updateDom();
}
/**
 * 计算总财富
 */
function calculateWealth() {
    let totalWealth = allUserData.reduce((c, v) => {
        return c += v.money;
    }, 0);

    const totalWealthElement = create('div');
    totalWealthElement.innerHTML = `总财富为:<span class="total-wealth">${formatMoney(totalWealth)}</span>`;
    main.appendChild(totalWealthElement);

}
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
/**
 * 处理钱格式
 * @param {*} number 
 */
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
/**
 * 更新DOM
 * @param {*} data 
 */
function updateDom(data = allUserData) {
    main.innerHTML = "";
    data.forEach(user => {
        const person = create('div');
        person.className = 'person';
        person.innerHTML = `<strong>${user.name}</strong>${formatMoney(user.money)}`;
        main.appendChild(person);
    })
}
window.onload = function () {
    for (let i = 0; i < 5; i++) {
        getRandomUser();
    }
    on(addUserBtn,'click',getRandomUser);
    on(doubleWealthBtn,'click',doubleWealth);
    on(showMillionairesBtn,'click',showMillionaires);
    on(sortBtn,'click',sortData);
    on(calculateWealthBtn,'click',calculateWealth);
}