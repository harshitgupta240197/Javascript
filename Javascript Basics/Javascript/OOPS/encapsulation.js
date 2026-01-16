// Encapsulation
/** Encapsulation in JavaScript is the object-oriented programming (OOP) concept of bundling data (properties) 
 and the methods that operate on that data within a single unit (like a function or a class) and restricting 
 direct external access to the internal state.  
 
 Encapsulation is the concept of restricting the direct access to data object*/

 class bankAccount {
    #balance = 1000;

    deposit(amount){
        this.#balance += amount                    // You can access #balance only inside the class because of #
        return this.#balance
    }
    getBalance(){
        return `$${this.#balance}`
    }
 }

 let account = new bankAccount();
 console.log(account.getBalance());      // We cannot directly access #balance outside the class so we try to access it via a method
 