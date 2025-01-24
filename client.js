//create a form to add employee
function addInputElement(type, placeholder){
    const element = document.createElement('input');
    element.type = type;
    element.placeholder = placeholder;
    element.style.margin = '5px';    
    return element;
}
// create headline for the form
const headline = document.createElement('h2');
headline.innerText = 'Adding a new employee to the database:';
headline.style.textAlign = 'center';
headline.style.fontFamily = 'Arial';
headline.style.color = 'green';
headline.style.margin = '10px';

document.body.appendChild(headline); // append the headline to the body

// create input elements for the form
const empName = addInputElement('text', 'Employee Name');
const department = addInputElement('text', 'Department');
const age = addInputElement('number', 'Age');
const salary = addInputElement('number', 'Salary');

//create a button to add employee
const addButton = document.createElement('button');
addButton.innerText = 'Add Employee';
addButton.style.margin = '5px auto'; // center the button

addButton.addEventListener('click', addEmployee);// add event listener to the button

// create a form element and style it
const form = document.createElement('form');
form.style.display = 'flex';
form.style.flexDirection = 'column';
form.style.width = '200px';
form.style.margin = 'auto';
form.style.padding = '5px';

// append the input elements and the button to the form
form.appendChild(empName);
form.appendChild(department);
form.appendChild(age);
form.appendChild(salary);
form.appendChild(addButton);
document.body.appendChild(form);

//function to add employee
async function addEmployee(){
    const employee = {
        name: empName.value,
        department: department.value,
        age: age.value,
        salary: salary.value
    };
    // post request to the server  
    await axios.post('http://localhost:3000/addEmployee', employee);
    // Clear the input fields
    empName.value = '';
    department.value = '';
    age.value = '';
    salary.value = '';
}

//Header to delete employee
const deleteHeader =  document.createElement('h2');
deleteHeader.innerText = 'Deletion of all the employees above this age:';
deleteHeader.style.textAlign = 'center';
deleteHeader.style.fontFamily = 'Arial';
deleteHeader.style.color = 'red';
deleteHeader.style.marginTop = '30px';

document.body.appendChild(deleteHeader);// append the headline to the body

//create input element for the age of the employees to delete
const deleteInput =  addInputElement('number','Enter a age');
deleteInput.style.margin = 'auto';
deleteInput.style.display = 'block';
deleteInput.style.margin = '10px auto'; // Add margin to create space
deleteInput.style.width = '100px';

//button to delete employees above a certain age
const deleteButton = document.createElement('button');
deleteButton.innerText = 'Delete Employees';
deleteButton.style.display = 'block';
deleteButton.style.margin = 'auto';
deleteButton.style.margin = '10px auto'; // Add margin to create space

// Append the input element and the button to the body
document.body.appendChild(deleteInput);
document.body.appendChild(deleteButton);

deleteButton.addEventListener('click', deleteEmployee);// add event listener to the button

async function deleteEmployee(){
    const age = deleteInput.value;
    // delete request to the server
    await axios.delete(`http://localhost:3000/deleteEmployees/${age}`);
    deleteInput.value = '';
}

// Create a form to change the department of employees
const changeDeptHeader = document.createElement('h2');
changeDeptHeader.innerText = 'Change Department of Employees:';
changeDeptHeader.style.textAlign = 'center';
changeDeptHeader.style.fontFamily = 'Arial';
changeDeptHeader.style.color = 'blue';
changeDeptHeader.style.marginTop = '40px';

document.body.appendChild(changeDeptHeader); // Append the header to the body

// Create input elements for the old and new department names
const oldDeptInput = addInputElement('text', 'Old Department Name');
oldDeptInput.style.margin = 'auto';
oldDeptInput.style.display = 'block';
oldDeptInput.style.width = '200px';

const newDeptInput = addInputElement('text', 'New Department Name');
newDeptInput.style.margin = '10px auto'; // Add margin to create space
newDeptInput.style.display = 'block';
newDeptInput.style.width = '200px';

// Create a button to change the department
const changeDeptButton = document.createElement('button');
changeDeptButton.innerText = 'Change Department';
changeDeptButton.style.margin = '10px auto'; // Add margin to create space
changeDeptButton.style.display = 'block';

// Append the input elements and the button to the body
document.body.appendChild(oldDeptInput);
document.body.appendChild(newDeptInput);
document.body.appendChild(changeDeptButton);

// Function to change the department of employees
async function changeDepartment() {
    const oldDept = oldDeptInput.value;
    const newDept = newDeptInput.value;
    // PUT request to the server
    await axios.put('http://localhost:3000/changeDepartment', { oldDept, newDept });
    // Clear the input fields
    oldDeptInput.value = '';
    newDeptInput.value = '';
}

// Add event listener to the button
changeDeptButton.addEventListener('click', changeDepartment);
