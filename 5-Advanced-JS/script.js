//#region creando objetos con function constructor pattern

/* // function constructor
var Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;    
};

// herencia
Person.prototype.calculateAge = function () {
    console.log(2018 - this.yearOfBirth);
};

Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990, 'Teacher');
john.calculateAge();
console.log(john.lastName); */
//#endregion 

//#region creando objetos con object.create

// function constructor
var personProto = {
    calculateAge : function () {
        console.log(2018 - this.yearOfBirth);
    }
};
var john = Object.create(personProto);
john.name = 'john';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, {
    name: {value : 'Jane'},
    yearOfBirth : {value: 1969},
    job: {value: 'designer'}
});
//#endregion 

//#region primitives vs objects
/* var a = 23;
var b = a;
a = 46;
console.log(a); // 46
console.log(b); // 23

var obj1 = {
    name: 'John',
    age: 26
};
// ambos objetos apuntan a la misma referencia
var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age); //30
console.log(obj2.age); //30

var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a, b) {
    // se crea una copia de age, pero el age original permanece
    a = 30;
    b.city = 'San Francisco';
}

change (age, obj);
console.log(age); //27 se crea una copia de age, pero el age original permanece
console.log(obj.city); // San Francisco */
//#endregion 

//#region pasando funciones como argumentos
var years = [1990, 1965, 1937, 2005, 1998];
function arrayCalc(arr, fn) {
    var arrRes = [];
    for (let i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));        
    }
    return arrRes;
}

function calculateAge(el) {
    return 2016 - el;
}

function isFullAge(el) {
     return el >= 18;
}

function maxHeartRate(el) {
    if(el >= 18 && el <= 81)
    {
        return Math.round(206.9 - (0.67 * el));
    }
    else{
        return -1;
    }
}
 
var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge)
var rates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(rates);
//#endregion