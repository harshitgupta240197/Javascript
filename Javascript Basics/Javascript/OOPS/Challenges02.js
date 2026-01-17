/**Encapsulation, Polymorphism, Abstraction, and Getters/Setters
Task 1: Encapsulation Using Getters and Setters
Create a class BankAccount with a private property _balance. Add methods deposit(amount) and withdraw(amount). 
Use getters and setters to access and modify the _balance while ensuring the balance never goes negative.
 */

// Task 1
class BankAccount {

  constructor(balance = 0) {
    this._balance = balance;
  }
  deposit(amount){

    if (amount < 0) {
        throw new Error("Balance cannot be negative");
    }
    this.balance += amount
    return this.balance
  }
  withdraw(amount){

    if (amount < 0) {
        throw new Error("Balance cannot be negative");
    }
    if (amount > this._balance) {
        throw new Error("Insufficient funds");
    }
    this._balance -= amount
    return this.balance
  }
  get balance(){
    return this._balance
  }
  set balance(amount){

    if (amount < 0) {
        throw new Error("Balance cannot be negative");
    }
    else {
        this._balance = amount
    }
  }
}

/**Task 2: Polymorphism with Method Overriding
Create a class Shape with a method area() that returns 0. Create two subclasses Circle and Rectangle 
that override the area() method to calculate the area of a circle and a rectangle, respectively. */

// Task 2
class Shape {
    area(){
        return 0
    }
}

class Circle extends Shape{

    constructor(radius){
        super();
        this.radius = radius
    }
    area(){
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape{

    constructor(length, width){
        super();
        this.length = length;
        this.width = width;
    }
    area(){
        return this.length * this.width
    }
}

let newCircle = new Circle(2)
console.log(newCircle.area());
