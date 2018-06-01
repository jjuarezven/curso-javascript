//#region let and const
function driversLicense5(passedTest) {
    if (passedTest) {
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    console.log(firstName + ', born in ' + yearOfBirth + ' puede manejar');
}
driversLicense5(true);

function driversLicense6(passedTest) {
    if (passedTest) {
        // estas 2 variables son accesibles solamente dentro del bloque donde estan definidas
        let firstName = 'John';
        const yearOfBirth = 1990;
    }
    console.log(firstName + ', born in ' + yearOfBirth + ' puede manejar');
}
//driversLicense6(true);

// variables diferentes
let i = 23;
for (let i = 0; i < 5; i++) {
    console.log(i);
}
console.log(i);

function hello(place) {
    // In the case of “world”, string is declared and provided a value, however that declaration and value pass out of scope after the following }.
    if (place === 'world') {
        let string = 'SO CREATIVE OF YOU';
    }
    // In the case of “friend”, string is not declared. Its use after return is an invalid reference.
    return string || `hello ${place}`;
}
//hello('friend'); // => throws ReferenceError: string is not defined
//hello('world'); // => throws ReferenceError: string is not defined

//#endregion

//#region blocks and IIFEs

(function() {
    var scoped = 42;
}());
//console.log(scoped); // ReferenceError

{
    let scoped = 42;
}
//console.log(scoped); // ReferenceError

//#endregion

//#region string

let firstName = 'John';
let lastName = 'Smith';
cosnt = yearOfBirth = 1990;

function calcAge(year) {
    return 2018 - year;
}
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// template literals
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old. `);

// nuevos metodos
const n = `${firstName} ${lastName}`;
console.log(n.startsWith('J'));
console.log(n.endsWith('t'));
console.log(n.includes('oh'));
console.log(`${firstName} `.repeat(5));
//#endregion

//#region arrow functions
const years = [1990, 1965, 1982, 1937];
// ES5
var ages5 = years.map(function(el) {
    return 2018 - el;
});
console.log(ages5);

//ES6
// un solo parametro
let ages6 = years.map(el => 2018 - el);
console.log(ages6);

// 2 parametros
ages6 = years.map((el, index) => `Age element ${index + 1}: ${2018 - el}.`);
//console.log(ages6);

// mas de una linea
ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`
});
//console.log(ages6);

// las arrow function usan el this del ambito en el que estan escritas 
//ES5
var box5 = {
    color: 'green',
    postion: 1,
    clickMe: function() {
        // self es un hack, porque dentro de la funcion, this hace referencia al global context (window), no al objeto box5
        var self = this;
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.postion + ' and it is ' + self.color;
            alert(str);
        })
    }
};
//box5.clickMe();

//ES6
const box6 = {
    color: 'green',
    postion: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.postion + ' and it is ' + this.color;
            alert(str);
        })
    }
};
//box6.clickMe();

// otro ejemplo
function Person(name) {
    this.name = name;
};
//ES5
Person.prototype.myFriends5 = function(friends) {
    var arr = friends.map(function(elem) {
        return this.name + ' is friend of ' + elem;
    }.bind(this));
    console.log(arr);
};
var friends = ['Bob', 'Pedro', 'Ana'];
//new Person('John').myFriends5(friends);

//ES6
Person.prototype.myFriends6 = function(friends) {
    let arr = friends.map(elem => `${this.name} is friend of ${elem}`);
    console.log(arr);
};
var friends = ['Bob', 'Pedro', 'Ana'];
new Person('Mike').myFriends6(friends);
//#endregion

//#region Destructuring
//extraer datos de alguna estructura de datos
//ES5
var john = ['John', 26];
/* var name = john[0];
var age = john[1]; */

//ES6
const [name, age] = ['John', 26];
console.log(name, age);

const obj = {
    firstName1: 'John',
    lastName1: 'Smith'
};
const { firstName1, lastName1 } = obj;
console.log(firstName1, lastName1);

// si no se quiere usar los mismos nombres
const { firstName1: a, lastName1: b } = obj;
console.log(a, b);

function calcRetirementAge(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [age2, retirement] = calcRetirementAge(1978);
console.log(age2, retirement);

// otro ejemplo
function convertCurrency(amount) {
    const converted = {
        USD: amount * 0.76,
        GPB: amount * 0.53,
        AUD: amount * 1.01,
        MEX: amount * 13.30
    };
    return converted;
}
const { USD, GPB, AUD, MEX } = convertCurrency(100);
console.log(`USD: ${USD}, GPB: ${GPB}, AUD: ${AUD}, MEX: ${MEX}`);
//#endregion

//#region Arrays
// esto es un nodeList, no un array
const boxes = document.querySelectorAll('.box');

//ES5
// convertir a array
/* var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function (item) {
    item.style.backgroundColor = 'dodgerblue';
});
for (var index = 0; index < boxesArr5.length; index++) {
    if (boxesArr5[index].className === 'box blue') {
        continue;
    }
    boxesArr5[index].textContent = 'I changed to blue';
} */


//ES6
const boxesArr6 = Array.from(boxes);
Array.from(boxes).forEach(item => {
    item.style.backgroundColor = 'dodgerblue';
});
// for of loop
for (const item of boxesArr6) {
    if (item.className.includes('blue')) {
        continue;
    }
    item.textContent = 'I changed to blue';
}

// encontrar elementos dentro de un array
//ES5
var ages = [12, 17, 8, 21, 14, 11];
/* var full = ages.map(function (item) {
    return item >= 18;
});
console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]); */

//ES6
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));
//#endregion

//#region operador spread
function addFourAges(a, b, c, d) {
    return a + b + c + d;
}
var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

var ages = [18, 30, 12, 21];
//ES5
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

//ES6
const sum3 = addFourAges(...ages);
console.log(sum3);

// otro ejemplo, union de arrays
const familySmith = ['Juan', 'Maria', 'Bebe'];
const familyMiller = ['Petro', 'Petra', 'Bebito'];
const bigFamily = [...familySmith, 'Lily', ...familyMiller];
console.log(bigFamily);

// tambien funciona con nodeList
const h = document.querySelector('h1');
const boxes2 = document.querySelectorAll('.box');
const all = [h, ...boxes2];

Array.from(all).forEach(item => item.style.color = 'red');
//#endregion

//#region rest parameters
//ES5
function isFullAge5(limiteDeEdad) {
    var argsArray = Array.prototype.slice.call(arguments, 1);
    argsArray.forEach(function (item) {
        console.log(new Date().getFullYear() - item >= limiteDeEdad);
    });
}
isFullAge5(18, 1990, 2009, 1965);

//ES6
function isFullAge6(limiteDeEdad, ...years) {
    years.forEach(item => console.log(new Date().getFullYear() - item >= limiteDeEdad));
}
isFullAge6(18, 1990, 2009, 1965);
//#endregion

//#region default parameters
//ES5
/* function smithPerson(firstName, yearOfbirth, lastName, nationality) {
    lastName === undefined ? lastName = 'Smith' : lastName;
    nationality === undefined ? nationality = 'american' : nationality;
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfbirth = yearOfbirth;
    this.nationality = nationality;
} */

var john = new smithPerson('John', 1990);
var emily = new smithPerson('Emily', 1983, 'Diaz', 'spanish');
//ES6
function smithPerson(firstName, yearOfbirth, lastName = 'Smith', nationality = 'american') {    
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfbirth = yearOfbirth;
    this.nationality = nationality;
}
//#endregion

//#region ES6 maps
const question = new Map();
question.set('question', 'what is the official name of the latest major JS version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'correct answer');
question.set(false, 'wrong, please try again');
console.log(question.get('question'));
if(question.has(4)){
    //question.delete(4);
}
/* question.forEach((key, value) => {
    console.log(`This is ${value}, and it's set to ${key}`);
}); */

for (let [key, value] of question.entries()){
    //console.log(`This is ${value}, and it's set to ${key}`);
    if(typeof(key) === 'number'){
        console.log(`Answer ${key} ${value}`);
    }
}
const answer = parseInt(prompt('Write the correct answer'));
console.log(question.get(answer === question.get('correct')));
//#endregion

//#region ES6 classes
// ES5
/* var Person5 = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfbirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function () {
    var age = new Date().getFullYear() - this.yearOfbirth;
    console.log(age);
}; */
//var john5 = new Person5('John', 1990, 'teacher');
//john5.calculateAge();

// ES6
/* class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfbirth = yearOfBirth;
        this.job = job;
    }
    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfbirth;
        console.log(age);
    }
    static greeting(){
        console.log('hi');
    }
}; */

//Person6.greeting();

//const john6 = new Person6('John', 1978, 'master');
//john6.calculateAge();

//#endregion

//#region ES6 classes con subclases
// ES5
var Person5 = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfbirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function () {
    var age = new Date().getFullYear() - this.yearOfbirth;
    console.log(age);
};

var Athlete5 = function (name, yearOfBirth, job, olympicGames, medals) {
    /* About the call  method, this will be invoked only when we create an instance of Athlete5.
    The Athlete5 function constructor will run, and the first thing it does is call the Person5 function constructor with the ‘this’ keyword
    set to our newly created Athlete5 object
    */
    Person5.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
};

Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.wonMedal = function () {
    this.medals++;
    console.log(this.medals);
};
console.log('JS 5');
var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 8);
johnAthlete5.wonMedal();

// ES6
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfbirth = yearOfBirth;
        this.job = job;
    }
    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfbirth;
        console.log(age);
    }
};

class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }
    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}
console.log('JS 6');
const johnAthlete6 = new Athlete6('John', 1978, 'pesas', 3, 10);
johnAthlete6.wonMedal();
johnAthlete6.calculateAge();
//#endregion