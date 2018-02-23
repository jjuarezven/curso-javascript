// module pattern
var budgetController = (function() {

})();

var UIController = (function() {
    var domStrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"
    };
    return {
        getInput: function() {
            return {
                type: document.querySelector(domStrings.inputType).value,
                description: document.querySelector(domStrings.inputDescription).value,
                value: document.querySelector(domStrings.inputValue).value
            };
        },

        getDomStrings: function() {
            return domStrings;
        }
    };
})();

var controller = (function(budgetCtrl, UICtrl) {
    // The main difference between function declarations and function expressions is that function declarations are hoisted, meaning that we can use function declarations in our code even before declaring them. Function expressions are not hoisted, so you can't call the function unless it appears earlier in your code.
    var DOM = UICtrl.getDomStrings();
    var ctrlAddItem = function() {
        console.log(UICtrl.getInput());
    };
    document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener("keypress", function(event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    })
})(budgetController, UIController);