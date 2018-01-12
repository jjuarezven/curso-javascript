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




// Example to show the differece between execution stack and scope chain


var d = 'Hello!';
first();

function first() {
    var e = 'Hi!';
    second();

    function second() {
        var f = 'Hey!';
        third();
    }
}

function third() {
    var g = 'John';
    // se produce el error porque la funcion third no puede acceder al scope donde f está definido
    //console.log(f);
    console.log(d + g);
}




///////////////////////////////////////
// Lecture: The this keyword

// window object
//console.log(this);
calculateAge(1959);
function calculateAge(year) {
    new Date().getFullYear() - year;
    // window object, porque la funcion calculateAge esta atachada a window object
    console.log(this);
}

var john = {
    name: 'John',
    yearOfbirth: 1990,
    calculateAge: function () {
        console.log(this);
        console.log(new Date().getFullYear() - this.yearOfbirth);
        // window object porque una funcion regular (no un metodo definido dentro de un objeto) se atacha al window object
        
        /*
        function inner() {
            console.log(this);
        }
        inner();
        */
    }
}
john.calculateAge();

var mike = {
    name: 'Mike',
    yearOfbirth: 1963
}

// method borrowing!!!! toma los metodos definidos en otro objeto como propios
// 'this' only becomes something as soon as the method is called
//mike.calculateAge = john.calculateAge;
//mike.calculateAge();

// otra forma: With call(), you can use a method belonging to another object.
john.calculateAge.call(mike);



