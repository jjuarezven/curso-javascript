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

let firstName= 'John';
let lastName= 'Smith';
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