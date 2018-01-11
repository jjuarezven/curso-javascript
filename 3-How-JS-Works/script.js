///////////////////////////////////////
// Lecture: Hoisting
// SIMPLE: podamos usar la función antes de declararla, debido a la forma en que el Variable Object (VO) es construído por el Execution Context Object, como se muestra en la imágen.  
//#region functions
calculateAge(1978);

function calculateAge(year) {
    var result = new Date().getFullYear() - year;
    console.log(result);
    return result;
}

//Hoisting no funciona con function expressions, porque son tratadas como variables, es decir, se inicializan con undefined 
//retirement(1978); 
var retirement = function (year) {
    console.log(65 - calculateAge(year));
}
//#endregion

//#region variables 
// con las variables, el hoisting funciona poniendo los valores de la variable = undefined
console.log(age);
var age = 25;

function foo() {
    var age = 55;
    //age del execution context de la funcion
    console.log(age);
}
foo();
// age del global execution context
console.log(age);
//#endregion











///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword









