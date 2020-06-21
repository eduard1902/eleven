'use strict';

const start = document.getElementById('start');                                 
let btnPlus = document.getElementsByTagName('button');  
let incomePlus = btnPlus[0];
let expensesPlus = btnPlus[1];
let depositCheckmark = document.querySelector('.deposit-checkmark');                //Чекбокс 
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');     // Ввода возможных доходов
let salaryAmount = document.querySelector('.salary-amount');                        //Месячный доход*
// let incomeInput = document.querySelector('.income-title');                        //Дополнительный доход- наименование
// let amountInput = document.querySelector('.income-amount');                      //Дополнительный доход- сумма
let additionalInputncome1 = document.querySelectorAll('.additional_income-item')[0]; //Возможный доход
let additionalInputncome2 = document.querySelectorAll('.additional_income-item')[1]; //Возможный доход
let expensesTitle = document.querySelector('.expenses-title'); 
let expensesItems = document.querySelectorAll('.expenses-items');                   // Обязательные расходы
//let expensesAmount = document.querySelector('.expenses-amount');                  // Обязательные расходы - сумма
let additionalExpensesItem = document.querySelector('.additional_expenses-item');   //Возможные расходы 
let targetAmount = document.querySelector('.target-amount');                        // Цель
let periodSelect = document.querySelector('.period-select');                        // Период расчета
let periodAmount = document.querySelector('.period-amount');
let resultTotal = document.querySelector('.result-total');                          // Доход за месяц
let budgetMonthValue = document.querySelector('.budget_month-value');
let budgetDayValue = document.querySelector('.budget_day-value');                   // Дневной бюджет
let expensesMonthValue = document.querySelector('.expenses_month-value');           //Расход за месяц
let additionalIncomeValue = document.querySelector('.additional_income-value');     //Возможные доходы
let additionalExpensesValue = document.querySelector('.additional_expenses-value'); //Возможные расходы 
let incomePeriodValue = document.querySelector('.income_period-value');             // Накопления за период 
let targetMonthValue = document.querySelector('.target_month-value');               //Срок достижения цели в месяцах
let incomeItems = document.querySelectorAll('.income-items');



    //LESSON 1-8
console.log(additionalIncomeItem);
console.log(incomeItems);

let isText = function(str) {
    let pattern = new RegExp('[^а-яё\S]', 'gi');
    return str.match(pattern);
}

let isString = function(s){
    return (typeof s) === 'string' && s !== '';
}

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],// дополнительные доходы
    expenses: {}, // дополнительные расходы
    addExpenses: [], // возможные расходы
    deposit: false, 
    percentDeposit: 0,
    moneyDeposit: 0,
    
    
    start: function() {
        if(salaryAmount.value === '') {
            start.setAttribute('disable', true);
            return;
        } else {
            start.setAttribute('disable', false);
        }

        appData.budget = +salaryAmount.value;
        console.log('salaryAmount.value', salaryAmount.value);

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
        
  
    },
    showResult:function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        targetAmount.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calsSaveMoney();
        
       
        

    },
    addExpensesBlock: function() {

        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },

    getExpenses: function() {
        expensesItems.forEach(function(item){
           let itemExpenses = item.querySelector('.expenses-title').value;
           let cashExpenses = item.querySelector('.expenses-amount').value;
           if(itemExpenses !== '' && cashExpenses !== ''){
               appData.expenses[itemExpenses] = cashExpenses;
           }
        });
    },

    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },

    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !=='' &&  cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
            for(let key in appData.income){
                appData.incomeMonth += +appData.income[key];
            }
        });
        
    }, 
    
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
          item = item.trim();
          if (item !== ''){
            appData.addExpenses.push(item);
          }
        });
      },
      getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
          let itemValue = item.value.trim();
          if (itemValue !== ''){
            appData.addIncome.push(itemValue);
          }
        });
      },
        //Сумма расходов
        getExpensesMonth: function() {
            for (let key in appData.expenses) {
                 appData.expensesMonth += +appData.expenses[key];
            }

            console.log('Расходы за месяц ' + appData.expensesMonth + ' рублей');
        },

        // Бюджет в месяц и день
        getBudget: function() {
            appData.budgetMonth =  appData.budget + +appData.incomeMonth - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },

        // Достижение цели
        getTargetMonth: function() {
            return (Math.ceil(targetAmount.value / appData.budgetMonth));
        },

        
            
        // Уровень дохода
        getStatusIncome: function() {
            if (appData.budgetDay > 1200) {
                console.log('У вас высокий уровень дохода');
            } else if (600 < appData.budgetDay){ 
            console.log('У вас средний уровень дохода');
            } else if (0 < appData.budgetDay) {
                console.log('У вас средний уровень дохода');
            } else if (0 > appData.budgetDay) {
                console.log('Что то пошло не так');
            }
        },
        
        // Deposit in bank
        getInfoDeposit: function() {
            if (appData.deposit) {
                do {
                   appData.percentDeposit = prompt('Какой годовой процент?', '10'); 
                } 
                while(!isText(appData.percentDeposit));
                do {
                   appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
                }
                while(!isText(appData.moneyDeposit));
            }
        },
        updatePeriod: function(){
            periodAmount.innerHTML = periodSelect.value;
            incomePeriodValue.value = appData.calsSaveMoney();
        },
        calsSaveMoney: function() {
            return appData.budgetMonth * periodSelect.value;
            
        },
        
};

start.addEventListener('click', appData.start);

incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.updatePeriod);


