const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMilBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calcBtn = document.getElementById('calculate-wealth'); 


let data  =[];
//Fetch Ranom User

 async function getRandomUser(){
   const res = await fetch('https://randomuser.me/api/');
   const data = await res.json();
   const user =  data.results[0];
   const newUser = {name :`${user.name.first} ${user.name.last}` ,
    Money : Math.floor(Math.random()*1000000)
    };
    console.log(newUser);
    addData(newUser)
}

 function addData(obj){
    data.push(obj);
    updateDom();
   
 }
 //Update  Dom 
 function updateDom(providedData = data){
   main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
   providedData.forEach(item => {
      const elem = document.createElement('div');
      elem.classList.add('person');
      elem.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.Money)}`;
      main.appendChild(elem);
    
      
   });

 }

 //Double Money 

 function doubleMoney (){
     data = data.map(item => {
      return {...item, Money:item.Money * 2};
     })
     updateDom();
 }

 // Show Millioanare

 function showMil(){
   data = data.filter((elem)=>{
      return elem.Money>1000000;
   }
   )
   updateDom();
 }

 // SortMoney 

 function sortMoney(){
   data = data.sort((a,b)=>b.Money-a.Money);
   updateDom();
 }

 //calc Average Wealth


 function CalcAvg() {
   const wealth = data.reduce((acc, item) => {
     return acc + item.Money; 
   }, 0); 
 
   const el = document.createElement('div');
   el.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
   main.appendChild(el);
 }
// Formay money

function formatMoney(number){
   return '$'+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

//Add evet Listners

addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortMoney);
showMilBtn.addEventListener('click',showMil);
calcBtn.addEventListener('click',CalcAvg)


 getRandomUser();

