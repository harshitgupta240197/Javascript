class Employee {
    constructor(name, salary) {
        this.name = name
        this._salary = salary
    }

    get salary() {
        return `The salary of ${this.name} is ${this._salary}`
    }

    set salary(value) {
        if (value < 0) {
            console.error('Invalid Salary: Salary cannot be negative')
        } else {
            this._salary = value
        }
    }
}


let Rajesh = new Employee('Rajesh', 50000)
console.log(Rajesh.salary)
Rajesh.salary = -10000