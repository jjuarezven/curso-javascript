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
/* var personProto = {
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
}); */
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

/* //#region pasando funciones como argumentos
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
//#endregion */

/* //#region funciones retornando funciones
function interviewQuestion(job){
	if(job ==="designer") {
		return function (name) {
			console.log(name + ' can you please about design');
		}
	}
	else {
		if (job === "teacher") {
			return function (name) {
				console.log('What subject do you teach, ' + name);
			}
		}
		else {
			return function (name) {
				console.log('Hello ' + name + ' waht do you do?');
			}            
		}        
	}
}

var teacherQuestion = interviewQuestion("teacher");
teacherQuestion('John');
var designerQuestion = interviewQuestion("designer");
designerQuestion('John');

interviewQuestion('teacher')("Jose");
//#endregion */

//#region IIFE
// se obtiene privacidad y no se interfiere con variables globales
/* The parentheses trick the parser to treat function declaration as an expression, so it won't throw an error if we immediately call it or if we don't give a name for this function. */
/* (function (goodLuck) {
	var score = Math.random() * 10;
	console.log(score >= 5 - goodLuck);
})(5) */

/*
https://programacionymas.com/blog/funciones-javascript-invocadas-inmediatamente-IIFE
After this lecture I understand how to solve an exercise, from a test,  that I had at 1&1 job interview and second one from Oracle interview:

1. This code suppose to print out numbers from 1 to 5, after 1 second. The code has a bug. How you fix it?
	for (var i = 0; i < 5; i++) {
  setTimeout(function() { 
	console.log(i); 
  }, i * 1000 );
}

Wrapping our code in an immediately invoked function expression  is the solution, to not let the for loop to overwrite to every loop our i variable, but to every loop to have 1, 2, 3.. :

for (var i = 0; i < 5; i++) {
  (function(x) {
	  setTimeout(function() { // anonymous function
		console.log(x); 
	  }, x * 1000 );
  })(i + 1);
}

2. What will the code below output to the console and why? (the test was on a paper so I could't use the computer. Most of the advance tests are on paper)

var myObject = {
	foo: "bar",
	func: function() {
		var self = this;
		console.log("outer func:  this.foo = " + this.foo);
		console.log("outer func:  self.foo = " + self.foo);
		(function() {
			console.log("inner func:  this.foo = " + this.foo);
			console.log("inner func:  self.foo = " + self.foo);
		}());
	}
};
myObject.func();
Output:

outer func:  this.foo = bar
outer func:  self.foo = bar
inner func:  this.foo = undefined
inner func:  self.foo = bar

In the outer function, both this and self refer to myObject and therefore both can properly reference and access foo.

In the inner function, though, this no longer refers to myObject. As a result, this.foo is undefined in the inner function, whereas the reference to the local variable self remains in scope and is accessible there.
*/
//#endregion

//#region closures
// http://davidshariff.com/blog/javascript-scope-chain-and-closures/
//
/* function retirement(retirementAge) {
    var a = " years left until retirement";
    return function(yearOfBirth) {
        var age = 2016 - yearOfBirth;
        console.log(retirementAge - age + a);
    };
}

// 2 formas de hacer lo mismo, la variable retirementUS es una funcion y la otra es el llamado directo a la funcion retirement
var retirementUS = retirement(66);
retirementUS(1990);
retirement(66)(1990);

function interviewQuestion(job) {
    return function(name) {
        if (job === "designer") {
            console.log(name + " can you please about design");
        } else {
            if (job === "teacher") {
                console.log("What subject do you teach, " + name);
            } else {
                console.log("Hello " + name + " waht do you do?");
            }
        }
    };
}
interviewQuestion("designer")("Peter"); */

// primer intento, no funciona, explicacion:
/*
	The helpText array defines three helpful hints, each associated with the ID of an input field in the document. The loop cycles through these definitions, hooking up an onfocus event to each one that shows the associated help method.

If you try this code out, you'll see that it doesn't work as expected. No matter what field you focus on, the message about your age will be displayed.

The reason for this is that the functions assigned to onfocus are closures; they consist of the function definition and the captured environment from the setupHelp function's scope. Three closures have been created by the loop, but each one shares the same single lexical environment, which has a variable with changing values (item.help). The value of item.help is determined when the onfocus callbacks are executed. Because the loop has already run its course by that time, the item variable object (shared by all three closures) has been left pointing to the last entry in the helpText list.

One solution in this case is to use more closures: in particular, to use a function factory 
	*/
/* function showHelp(help) {
  document.getElementById("help").innerHTML = help;
}

function setupHelp() {
  var helpText = [
	{ id: "email", help: "Your e-mail address" },
	{ id: "name", help: "Your full name" },
	{ id: "age", help: "Your age (you must be over 16)" }
  ];

  for (var i = 0; i < helpText.length; i++) {
	var item = helpText[i];
	document.getElementById(item.id).onfocus = function() {
	  showHelp(item.help);
	};
  }
}

setupHelp(); */

/*
This works as expected. Rather than the callbacks all sharing a single lexical environment, the makeHelpCallback function creates a new lexical environment for each callback, in which help refers to the corresponding string from the helpText array.
*/
function showHelp(help) {
    document.getElementById("help").innerHTML = help;
}

function makeHelpCallback(help) {
    return function() {
        showHelp(help);
    };
}

function setupHelp() {
    var helpText = [
        { id: "email", help: "Your e-mail address" },
        { id: "name", help: "Your full name" },
        { id: "age", help: "Your age (you must be over 16)" }
    ];

    for (var i = 0; i < helpText.length; i++) {
        var item = helpText[i];
        document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
    }
}

setupHelp();

/*
 Otra manera de hacer lo mismo usando IIFE
 function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    (function() {
       var item = helpText[i];
       document.getElementById(item.id).onfocus = function() {
         showHelp(item.help);
       }
    })(); // Immediate event listener attachment with the current value of item (preserved until iteration).
  }
}

setupHelp();
*/

/*
If you don't want to use more closures, you can use the let keyword introduced in ES2015 :

function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    let item = helpText[i];
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }
}

setupHelp();
This example uses let instead of var, so every closure binds the block-scoped variable, meaning that no additional closures are required.
*/
//#endregion closures

//#region Bind, call, apply
/* var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === "formal") {
            console.log('Good ' + timeOfDay + ', Ladies and Gentlemen! I\'m ' + this.name + ' I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old');
        } else {
            console.log('Hola, I\'m ' + this.name + ' I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.  Have a nice ' + timeOfDay + '.');
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation('formal', 'morning');
// call
john.presentation.call(emily, 'friendly', 'afternoon');
// apply
john.presentation.apply(emily, ['friendly', 'afternoon']);
// bind
var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('morning')
var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');

var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (let i = 0; i < arr.length; i++) {
        // la magia esta aqui
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return new Date().getFullYear() - el;
}

function isFullAge(limit, el) {
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(fullJapan);

// otro ejemplo
var obj = { name: "Niladri" };

var greeting = function(a, b, c) {
    return "welcome " + this.name + " to " + a + " " + b + " in " + c;
};

//creates a bound function that has same body and parameters 
var bound = greeting.bind(obj);

console.dir(bound); ///returns a function
console.log("Output using .bind() below ");
console.log(bound("Newtown", "KOLKATA", "WB")); //call the bound function */
/*
When functions use the this  variable, the this  variable is pointing to the Object that is executing the function.  In this case, it does not really matter what the this context is for the isFullAge  method, 
since neither isFullAge nor isFullAge.binds() use the this  context again.  (In other words, isFullAge  doesn't care about the context.  But other functions that use bind may, so you tell those functions what the context is).  
(Note that I am referring to this  using the terms variable and context as two separate concepts). 

In functions that use the this variable, the this variable points to either the global window object, or whatever object that contains that function.  

http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/ : "First, know that all functions in JavaScript have properties, just as objects have properties. 
And when a function executes, it gets the this property—a variable with the value of the object that invokes the function where this is used."
*/
//#endregion Bind, call, apply

//#region ejercicio
(function() {
    function Question(question, answers, correct) {
        this.question = question,
        this.answers = answers,
        this.correct = correct
    };

    Question.prototype.getQuestion = function() {
        console.log(this.question);
        for (var index = 0; index < this.answers.length; index++) {
            console.log(index + ":" + this.answers[index]);
        }
    };

    Question.prototype.getAnswer = function(answer, callBack) {
        var sc;
        if (answer === this.correct) {
            console.log("correct answer");
            sc = callBack(true);
        }
        else{
            console.log("wrong answer");
            sc = callBack(false);
        }
        this.displayScore(sc);
    };

    Question.prototype.displayScore = function(score) {
       console.log("Your current score is: " + score);
       console.log("--------------------");
    };

    
    function score() {
        var sc = 0;
        return function (isCorrect) {
            if (isCorrect) {
                sc++;
            }
            return sc;
        }
    }
    var keepScore = score();

    var q1 = new Question("Donde nació Bolivar?", ["Caracas", "Quito", "Bogotá"], 0);
    var q2 = new Question("Cual es el continente mas grande?", ["America", "Europa", "Asia"], 2);
    var q3 = new Question("Capital de Rusia?", ["Madrid", "Lima", "Moscu", "Londres"], 2);
    var questions = [q1, q2, q3];    

    function nexQuestion() {        
        var n = Math.floor(Math.random() * questions.length);
        questions[n].getQuestion();
        var answer = prompt("Indique la respuesta correcta:");        
        if (answer !== "exit") {            
            questions[n].getAnswer(parseInt(answer), keepScore);
            nexQuestion();
        }
    }
    nexQuestion();
})();



//#endregion ejercicio