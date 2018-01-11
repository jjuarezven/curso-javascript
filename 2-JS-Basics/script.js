// type coercion
var name = 'John';
var age = 26;
console.log(name + age);

//objects and methods
var john = {
    name: 'John',
    lastName: 'Smith',
    yearOfBirth: 1990,
    job: 'teacher',
    isMarried: false,
    family: ['Jane', 'Mark', 'Bob'],
    calculateAge: function () {
        this.age = (new Date()).getFullYear() - this.yearOfBirth;
    }
};
console.log(john.lastName);
console.log(john['lastName']);
var x = 'job';
console.log(john[x]);
console.log(john.family);
john.calculateAge();
console.log(john);