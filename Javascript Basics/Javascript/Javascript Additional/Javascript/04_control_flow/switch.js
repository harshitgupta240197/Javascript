//Common syntax of SWITCH

// switch (key) {
//     case value:
        
//         break;

//     default:
//         break;
// }


// We will build a Month Checker
// BREAK will break the Control Flow
const month = 3

switch (month) {
    case 1:
        console.log("January");
        break;
    case 2:
        console.log("February");
        break;
    case 3:
        console.log("March");
        break;
    case 4:
        console.log("April");
        break;

    default:
        console.log("default case match");      
        break;
}