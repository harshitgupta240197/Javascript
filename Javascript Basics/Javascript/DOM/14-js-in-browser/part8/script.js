// Example 1 : Accessing DOM Elements
document
  .getElementById('changeTextButton')
  .addEventListener('click', function () {
    let para = document.getElementById('myParagraph');
    para.textContent = 'This is not a paragraph'
    
  
})

// Example 2 : Traversing the DOM
document
  .getElementById('highlightFirstCity')
  .addEventListener('click', function(){
    let cityList = document.getElementById('citiesList');
    cityList.firstElementChild.classList.add('highlight');
  
})

// Example 3 : Manipulating DOM Elements
document
  .getElementById('changeOrder')
  .addEventListener('click', function(){
    let manipulate = document.getElementById('coffeeType');
    manipulate.textContent = 'Espresso';
    manipulate.style.backgroundColor = 'brown'; // Adding CSS styling
    manipulate.style.padding = '5px'
    
  })

  // Example 4 : Creating and Inserting Elements
  document
    .getElementById('addNewItem')
    .addEventListener('click', function(){

      //Creating the Element
      let newItem = document.createElement('li')
      newItem.textContent = 'Eggs'

      let shop = document.getElementById('shoppingList');
      shop.appendChild(newItem);  // This is a node
      
    })


    // Example 5 : Removing DOM Elements
document
    .getElementById('removeLastTask')
    .addEventListener('click', function(){

      let tasks = document.getElementById('taskList')
      tasks.lastElementChild.remove()
      
    })

// Example 6 : Event Handling in the DOM
document 
  .getElementById('clickMeButton')
  .addEventListener('dblclick', function(){
    alert('chai')
  })

  // Example 7 : Event Delegation
  document
    .getElementById('teaList')
    .addEventListener('click', function(event){

      if (event.target && event.target.matches('.teaItem')) {
        alert(`You selected ${event.target.textContent}`)
      }
    })

// Example 8 : Form Handling
document
  .getElementById('feedbackForm')
  .addEventListener('submit', function(event){    // The event listener will be SUBMIT
    event.preventDefault()
    let feedback = document.getElementById('feedbackInput').value   // .value ensures the entered word
    console.log(feedback);
    document.getElementById('feedbackDisplay').textContent = `The feedback is ${feedback}`
    
  })
    
  // Example 9 : DOM Content Loaded