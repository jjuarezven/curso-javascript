"use strict";
// module pattern
var budgetController = (function() {
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(element) {
            sum += element.value;
        });
        // There are two ways of accessing object's properties in javascript: 1. Dot notation: object.property , 2. Bracket notation: object['property'] .
        data.totals[type] = sum;
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            if (data.allItems[type].length === 0) {
                ID = 0;
            } else {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }

            if (type === "exp") {
                newItem = new Expense(ID, des, val);
            } else {
                newItem = new Income(ID, des, val);
            }
            data.allItems[type].push(newItem);
            return newItem;
        },

        calculateBudget: function() {
            calculateTotal('exp');
            calculateTotal('inc');
            data.budget = data.totals.inc - data.totals.exp;
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: function() {
            console.log(data);
        }
    };
})();

var UIController = (function() {
    var domStrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    };
    return {
        getInput: function() {
            return {
                type: document.querySelector(domStrings.inputType).value,
                description: document.querySelector(domStrings.inputDescription).value,
                value: parseFloat(document.querySelector(domStrings.inputValue).value)
            };
        },

        getDomStrings: function() {
            return domStrings;
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
            if (type === 'inc') {
                element = domStrings.incomeContainer;
                html = `
                <div class="item clearfix" id="income-%id%">
                <div class="item__description">%description%</div>
                <div class="right clearfix">
                    <div class="item__value">%value%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>
                `;
            } else {
                element = domStrings.expensesContainer;
                html = `
                <div class="item clearfix" id="expense-%id%">
                <div class="item__description">%description%</div>
                <div class="right clearfix">
                    <div class="item__value">%value%</div>
                    <div class="item__percentage">21%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>
                `;
            }
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        clearFields: function() {
            var fields, fieldsArray;
            // este metodo retorna un NodeLists, no un array
            fields = document.querySelectorAll(domStrings.inputDescription + ',' + domStrings.inputValue);
            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(function(current, index, array) {
                current.value = '';
            });
            fieldsArray[0].focus();
        },

        displayBudget: function(obj) {
            document.querySelector(domStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(domStrings.incomeLabel).textContent = obj.totalIncome;
            document.querySelector(domStrings.expensesLabel).textContent = obj.totalExp;
            if (obj.percentage > 0) {
                document.querySelector(domStrings.percentageLabel).textContent = obj.percentage;
            } else {
                document.querySelector(domStrings.percentageLabel).textContent = '---';
            }
        }
    };
})();

var controller = (function(budgetCtrl, UICtrl) {
    // The main difference between function declarations and function expressions is that function declarations are hoisted, meaning that we can use function declarations in our code even before declaring them. Function expressions are not hoisted, so you can't call the function unless it appears earlier in your code.
    var setupEventListeners = function() {
        var DOM = UICtrl.getDomStrings();
        document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener("keypress", function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var updateBudget = function() {
        budgetCtrl.calculateBudget();
        var budget = budgetCtrl.getBudget();
        UICtrl.displayBudget(budget);
    };

    var ctrlAddItem = function() {
        var input, newItem;
        input = UICtrl.getInput();
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            UIController.addListItem(newItem, input.type);
            UIController.clearFields();
            updateBudget();
        }
    };

    return {
        init: function() {
            console.log('Application has started');
            var initialObject = {
                budget: 0,
                totalIncome: 0,
                totalExp: 0,
                percentage: -1
            };
            UICtrl.displayBudget(initialObject);
            setupEventListeners();
        }
    };
})(budgetController, UIController);

controller.init();