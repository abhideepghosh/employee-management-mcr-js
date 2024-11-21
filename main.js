'use strict';
(async () => {
    try{
        const data = await fetch('./mock_data/employee.json');
        const employeesList = await data.json();
        const listView = document.querySelector('#list-view');
        const employeeDetails = document.querySelector('#emp-details');
        const addEmployeeBtn = document.querySelector('#add-employee-btn');
        const mainContainer = document.querySelector('#container');
        let addEmployeeModalToggle = false;
        employeesList.forEach(employee => {
            const listEl = `<li class="list-el" id="${employee.id}">${employee.name}</li>`;
            listView.insertAdjacentHTML('beforeend', listEl);
        })
        listView.addEventListener('click', (e) => {
            const currentSelection = e.target.tagName;
            if(currentSelection === 'LI') {
                const currentEmployee = employeesList.find(el => Number(el.id) === Number(e.target.id));
                const image = (currentEmployee.image) ? currentEmployee.image : './assets/default_profile.jpeg';
                employeeDetails.innerHTML = `
                    <div class="emp-image rows">
                      <img alt="Employee Image" class="emp-image" src=${image}>
                    </div>
                    <div class="rows">
                      <h4>Name: ${currentEmployee.name}</h4>
                      <h4>Role: ${currentEmployee.role}</h4>
                      <h4>Email: ${currentEmployee.email}</h4>
                    </div>
                `;
            }
        });
        addEmployeeBtn.addEventListener('click', (e) => {
            if(addEmployeeModalToggle) {
                addEmployeeModalToggle = false;
                addEmployeeBtn.textContent = 'Add Employee';
                document.querySelector('.employee-modal').remove();
                return;
            }
            addEmployeeModalToggle = true;
            addEmployeeBtn.textContent = 'Cancel';
            const modal = `
                <div class="employee-modal">
                    <form id="userForm">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" placeholder="Enter your name" required>
                        <br><br>
                    
                        <label for="role">Role:</label>
                        <input type="text" id="role" name="role" placeholder="Enter your role" required>
                        <br><br>
                    
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required>
                        <br><br>
                    
                        <label for="image">Image URL:</label>
                        <input type="url" id="image" name="image" placeholder="Paste image URL">
                        <br><br>
                    
                        <button type="submit">Submit</button>
                    </form>
                </div>`;
            mainContainer.insertAdjacentHTML('afterbegin', modal);
            document.querySelector('#userForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const newEmpImage = document.querySelector('#image').value || './assets/default_profile.jpeg';
                const employeeObj = {
                    id: employeesList[employeesList.length - 1].id + 1,
                    name: document.querySelector('#name').value,
                    role: document.querySelector('#role').value,
                    email: document.querySelector('#email').value,
                    image: newEmpImage
                };
                employeesList.push(employeeObj);
                const newEl = `<li class="list-el" id="${employeeObj.id}">${employeeObj.name}</li>`;
                listView.insertAdjacentHTML('beforeend', newEl);
                addEmployeeModalToggle = false;
                addEmployeeBtn.textContent = 'Add Employee';
                document.querySelector('.employee-modal').remove();
            })
        })
    }
    catch (err) {
        console.log(err);
        document.querySelector('#app').innerHTML = `<h1>Something Went Wrong!</h1>`;
    }
}



)();

