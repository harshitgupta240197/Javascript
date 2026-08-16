let question = prompt('Welcome to ToDo App! What do you want to do today ?')
const storage = []

while (question !== 'q') {
    if (question === 'new') {
        let newToDo = prompt('Enter New ToDo: ');
        storage.push(newToDo);
        console.log(`Added ${newToDo} to the list`);
    } else if (question === 'list') {
        for (const word of storage) {
            console.log(word);
        }
    } else if (question === 'delete') {
        let deleteWhat = prompt('What do you want to delete ? ')
        const index = storage.indexOf(deleteWhat)
        if (index !== -1) {
            storage.splice(index, 1)
            console.log(`Deleted ${deleteWhat}`);
        } else {
            console.log(`Not found ${deleteWhat}`);
            
        }
    } 
    question = prompt('Welcome to ToDo App! What do you want to do today ?')
    } 
    
console.log('Ok quitting now');



