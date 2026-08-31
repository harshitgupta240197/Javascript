class BankAccount {
    #balance = 0;

    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount
        }
        return this.#balance;
    } 

    getBalance(){
        return `$${this.#balance}`
    }
}

let account = new BankAccount()
console.log(account.deposit(100));
console.log(account.getBalance());
