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
      shop.append('Yolk');
      
    })
