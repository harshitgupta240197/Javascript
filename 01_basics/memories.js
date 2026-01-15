// There are two types of memories : 1. Stack 2. Heap

// Stack memories are used for all the Primitive Datatypes
// Heap memories are used for all the Non-Primitive Datatypes

let myYoutubename = "yoyowhatsup"
let anothername = "yoitsharshit"
console.log(myYoutubename)
console.log(anothername)
// This will make the changes to a copy and not to the original one // STACK MEMORY

let userOne = {
    email: "user@google.com",
    name: "google"
}
let userTwo = userOne
userTwo.email = "facebook@google.com"
console.log(userOne.email)
console.log(userTwo.email)
// This will print the new value since the original file is changed in this case //HEAP MEMORY


