
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



const container = document.querySelector('#item-form')
const inputy = document.querySelector('.form-input');
const AddButton = container.querySelector('.btn');
const itemz = document.querySelector('.items');
const listy = document.querySelectorAll('li')
const icon = itemz.querySelector('i');
const clearBtn = document.querySelector('.btn-clear')



function AddItems(e) {
    e.preventDefault();
    const vaLue = inputy.value;
    if (vaLue === '') {
        alert('Please Input an item');
        return;
    }
    itemz.appendChild(CreateListItem());
    inputy.value = '';
}

function CreateListItem() {
    const li = document.createElement('li');
    const vaLue = inputy.value;
    NewItm = document.createTextNode(vaLue);
    li.appendChild(NewItm);
    li.appendChild(CreateButton());
    return li;
}

function CreateButton() {
    const Button = document.createElement('button');
    Button.className = 'remove-item btn-link text-red';
    Button.appendChild(icony());
    return Button;
}

function icony() {
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-xmark';
    return icon;
}

function RemoveItems(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure you want to delete')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

function ClearAll(e) {
    while (itemz.firstChild) {
        itemz.removeChild(itemz.firstChild);

    }
}

//Add Event listeners
itemz.addEventListener('click', RemoveItems);
AddButton.addEventListener('click', AddItems);
clearBtn.addEventListener('click', ClearAll)
