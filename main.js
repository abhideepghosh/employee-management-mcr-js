'use strict';
(async () => {
    try{
        const data = await fetch('./mock_data/employee.json');
        const employeesList = await data.json();
        const listView = document.querySelector('#list-view');
        const employeeDetails = document.querySelector('#emp-details');
        employeesList.forEach(employee => {
            const listEl = `<li class="list-el" id="${employee.id}">${employee.name}</li>`;
            listView.insertAdjacentHTML('beforeend', listEl);
        })
        listView.addEventListener('click', (e) => {
            const currentSelection = e.target.tagName;
            if(currentSelection === 'LI') {
                const currentEmployee = employeesList.find(el => Number(el.id) === Number(e.target.id));
                console.log(currentEmployee);
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
    }
    catch (err) {
        console.log(err);
        document.querySelector('#app').innerHTML = `<h1>Something Went Wrong!</h1>`;
    }
}



)();

