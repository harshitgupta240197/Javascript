class CoffeeMachine {

    start(){
        // Action 1
        // Action 2
        return `Starting the machine`
    }

    brewCoffee() {
        // Action 3
        // Action 4
        return `Brewing coffee`
    }

    pressStart() {
        this.start();
        this.brewCoffee();
        console.log('Your coffee is ready');
    }
}

let myMachine = new CoffeeMachine();
console.log(myMachine.pressStart());
