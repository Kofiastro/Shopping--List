
// PlAN
// *****
// Allow user to type  and add an item when clicked on.
// allow user to remove the items  or clear

// PSEUDOCODE
// **********
// First identify all targets
// using query selectors
// using event listeners 
// using functions to compute a particular task
//Fucntion for handling Input items===CHEKCED 
//Function for handling additemsButtons==CHecked
//Function for Creating the LISt item with all attributes
//FUnction ot remove items when clicked on the x icon 
//Function to clear all items when click on the clear all button

const inputy = document.querySelector('.form-input');
const AddButton = document.querySelector('#item-form');
const itemz = document.querySelector('.items');
const clearBtn = document.querySelector('.btn-clear');
const filter = document.querySelector('#filter');


function displayItems() {
    const itemFromStorage = getitemFromStorage();
    itemFromStorage.forEach((itemz) => addItemToDOM(itemz));
    checkUI();
}
function onaddItemsSubmit(e) {
    e.preventDefault();
    inputItem = inputy.value;
    if (inputItem === '') {
        alert('Please input an item');
        return;
    }
    //crating item DOM
    addItemToDOM(inputItem);
    //Add item tostorage
    addItemtoStorage(inputItem);
    checkUI();
    inputy.value = '';

}
function addItemtoStorage(item) {
    const itemFromStorage = getitemFromStorage();

    itemFromStorage.push(item);

    //Convert to json string and set to LocalStorage
    localStorage.setItem('items', JSON.stringify(itemFromStorage));
}

function getitemFromStorage() {
    let itemFromStorage;
    if (localStorage.getItem('items') === null) {
        itemFromStorage = [];
    }
    else {
        itemFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemFromStorage;
}
function addItemToDOM(item) {
    const li = document.createElement('li');
    NewItm = document. createTextNode(item);
    li.appendChild(NewItm);
    buttonCreate = CreateButton('remove-item btn-link text-red');
    li.appendChild(buttonCreate);
    itemz.appendChild(li);
}

function CreateButton(classes) {
    const Button = document.createElement('button');
    Button.className = classes;
    addICon = icony('fa-solid fa-xmark');
    Button.appendChild(addICon);
    return Button;
}

function icony(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}


function onClickRemove(e){
    if (e.target.parentElement.classList.contains('remove-item')) {
          RemoveItems(e.target.parentElement.parentElement);
        }
}

function RemoveItems(item) {
    if (confirm('Are you sure you want to Remove')) {
        //Remove item from DOM
        item.remove()

        //remove item from storage
        removeItemfromStorage(item.textContent);
        checkUI();
    }
}

function removeItemfromStorage(item){
    let itemFromStorage=getitemFromStorage();
    // Filter out items
    itemFromStorage=itemFromStorage.filter((i)=> i !==item);


    // Re-set to local Storage
    localStorage.setItem('items',JSON.stringify(itemFromStorage));

}


function ClearAll(e) {
    while (itemz.firstChild) {
        itemz.removeChild(itemz.firstChild);
    }
    //Clear from local storage
    localStorage.removeItem('items');
    checkUI();
}


function FilterItem(e) {
    const itemz = document.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    itemz.forEach((item) => {
        const inputy = item.firstChild.textContent.toLowerCase();
        if (inputy.indexOf(text) != -1) {
            item.style.display = 'flex';
        }
        else {
            item.style.display = 'none';
        }
    });
}


function checkUI() {
    const listy = itemz.querySelectorAll('li');
    if (listy.length === 0) {
        clearBtn.style.display = 'none';
        filter.style.display = 'none';
    }
    else {
        clearBtn.style.display = 'block';
        filter.style.display = 'block';
    }
}


//Add Event listeners
function init() {
    AddButton.addEventListener('submit', onaddItemsSubmit)
    itemz.addEventListener('click', onClickRemove);
    clearBtn.addEventListener('click', ClearAll);
    filter.addEventListener('input', FilterItem);
    document.addEventListener('DOMContentLoaded', displayItems);
    checkUI();
}
init();