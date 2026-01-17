// POLYMORPHISM
/**Polymorphism in JavaScript is an object-oriented programming concept that allows objects of different types 
 to share the same method name but exhibit different behaviors based on the object calling the method. 
 This enables a single interface to have multiple implementations, promoting code reusability, flexibility, 
 and extensibility.  */

 class bird {

    fly(){
        return `I am flying in the sky`
    }
 }

 class penguin extends bird {

    fly(){
        return `penguins cannot fly`
    }
 }

 let newBird = new bird()
 let newPenguin = new penguin()

 // In this example we can see that the method name is same but the behavior of both are different
 
 console.log(newBird.fly());          // I am flying in the sky
 console.log(newPenguin.fly());       // penguins cannot fly


 
 