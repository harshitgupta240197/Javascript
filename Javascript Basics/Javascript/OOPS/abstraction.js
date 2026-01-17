// ABSTRACTION
/**Abstraction in JavaScript is a core principle of object-oriented programming (OOP) that involves 
 hiding the complex implementation details of an object and showing only the essential features or 
 functionality to the user. This simplifies code usage, improves maintainability, and increases security.  
 
 Abstraction hides the complex implementation details*/
class coffeeMachine{
    
    start(){
        //call DB
        //filter value
        //any complex tasks
        return 'starting the machine'
    }
    brewCoffee(){
        //complex tasks
        return 'brewing coffee'
    }

    pressMasterButton(){            // this is a method
        let msg1 = this.start()
        let msg2 = this.brewCoffee()
        return `${msg1}, ${msg2}`
    }
}

let myMachine = new coffeeMachine()
// console.log(myMachine.start());
// console.log(myMachine.brewCoffee());
console.log(myMachine.pressMasterButton());


