class Employee {
    constructor(name, jobtitle) {
        this.name = name;
        this.jobtitle = jobtitle;
    }
 
    describe() {
        return `${this.name} is ${ this.jobtitle}.`;
    }
}
 
class Department {
    constructor(name) {
        this.name = name;
        this.employees = [];
    }
 
    addEmployee(employee) {
        if (employee instanceof Employee) {
            this.employees.push(employee);
        } else {
            throw new Error(`You can only add an instance of Employee. Arguement is not an employee: ${employee}`);
        }
    }
 
    describe() {
        return `${this.name} has ${this.employees.length} employees.`;
    }
}
 
class Menu {
    constructor() {
        this.departments = [];
        this.selectedDepartment = null;
    }
 
    start() {
        let selection = this.showMainMenuOptions();
 
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createDepartment();
                    break;
                case '2':
                    this.viewDepartment();
                    break;
                case '3':
                    this.deleteDepartment();
                    break;
                case '4':
                    this.displayDepartments();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
 
        alert('Goodbye!');
    }
 
    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new department
        2) view department
        3) delete department
        4) display all departments
        `);
    }
 
    showDepartmentMenuOptions(departmentInfo) {
        return prompt(`
        0) back
        1) create employee
        2) delete employee
        ---------------------
        ${departmentInfo}
        `);
    }
 
    displayDepartments() {
        let departmentString = '';
        for (let i = 0; i < this.departments.length; i++) {
            departmentString += i + ') ' + this.departments[i].name + '\n';
        }
        alert(departmentString);
    }
 
    createDepartment() {
        let name = prompt('Enter name for new department:');
        this.departments.push(new Department(name));
    }
 
    viewDepartment() {
        let index = prompt('Enter the index of the department you wish to view:');
        if (index > -1 && index < this.departments.length) {
            this.selectedDepartment = this.departments[index];
            let description = 'Department Name: ' + this.selectedDepartment.name + '\n';
 
            for (let i = 0; i < this.selectedDepartment.employees.length; i++) {
                description += i + ') ' + this.selectedDepartment.employees[i].name
                + ' - ' + this.selectedDepartment.employees[i].jobtitle + '\n';
            }
           
            let selection = this.showDepartmentMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createEmployee();
                    break;
                case '2':
                    this.deleteEmployee();
            }
        }
    }

    deleteEmployee() {
        let index = prompt('Enter the index of the employee you wish to delete:');
        if (index > -1 && index < this.departments.length) {
            this.departments.splice(index, 1);
        }
    }
 
    createEmployee() {
        let name = prompt('Enter name for new employee:');
        let jobtitle = prompt('Enter job title for new employee:');
        this.selectedDepartment.employees.push(new Employee(name, jobtitle));
    }
 
    deleteEmployee() {
        let index = prompt('Enter the index of the employee you wish to delete:');
        if (index > -1 && index < this.selectedDepartment.employees.length) {
            this.selectedDepartment.employees.splice(index, 1);
        }
    }
}
 
let menu = new Menu();
menu.start();