// GETTERS & SETTERS
/**In JavaScript, getters and setters are special methods (also called "accessor properties") that 
 allow you to control access to object properties. They are defined using the get and set keywords, 
 providing a function that runs automatically when a property is read or modified, respectively.  */

 class Employee {

    #salary

    constructor (name, salary){

        if (salary < 0) {
            throw new Error("Salary cannot be negative");
            
            
        }
        this.name = name
        this.#salary = salary           
    }
    get salary (){
        return 'You are not allowed to view the salary'
    }
    set salary (value){

        if (value < 0) {
            console.error('Invalid Salary');
        }
        else {
            this._salary = value
        }
    }
 }

 let newEmployee = new Employee('Yogi', -25000)
 console.log(newEmployee.salary);
 console.log(newEmployee.name);
 
 