document.getElementById('addEmployeeButton').addEventListener('click', addEmployee);
document.getElementById('generateReportButton').addEventListener('click', generateReport);

let employees = [];
let totalEmployees = 0;
let totalPayroll = 0;

function addEmployee() {
    const name = document.getElementById('employeeName').value.trim();
    const salary = parseFloat(document.getElementById('employeeSalary').value.trim());
    const allowances = parseFloat(document.getElementById('allowances').value.trim());
    const deductions = parseFloat(document.getElementById('deductions').value.trim());
    const loans = parseFloat(document.getElementById('loans').value.trim());
    const savings = parseFloat(document.getElementById('savings').value.trim());
    const arrears = parseFloat(document.getElementById('arrears').value.trim());

    if (name && salary) {
        const netSalary = salary + allowances - deductions - loans - savings + arrears;
        employees.push({ name, salary, allowances, deductions, loans, savings, arrears, netSalary });
        totalEmployees++;
        totalPayroll += netSalary;

        updateEmployeeTable();
        updateSummary();
        clearInputFields();
    } else {
        alert('Please enter valid employee details!');
    }
}

function updateEmployeeTable() {
    const tbody = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing table content

    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>$${employee.salary.toFixed(2)}</td>
            <td>$${employee.allowances.toFixed(2)}</td>
            <td>$${employee.deductions.toFixed(2)}</td>
            <td>$${employee.loans.toFixed(2)}</td>
            <td>$${employee.savings.toFixed(2)}</td>
            <td>$${employee.arrears.toFixed(2)}</td>
            <td>$${employee.netSalary.toFixed(2)}</td>
            <td><button onclick="removeEmployee(${index})">Remove</button></td>
        `;
        tbody.appendChild(row);
    });
}

function updateSummary() {
    document.getElementById('totalEmployees').textContent = totalEmployees;
    document.getElementById('totalPayroll').textContent = totalPayroll.toFixed(2);
}

function clearInputFields() {
    document.getElementById('employeeName').value = '';
    document.getElementById('employeeSalary').value = '';
    document.getElementById('allowances').value = '';
    document.getElementById('deductions').value = '';
    document.getElementById('loans').value = '';
    document.getElementById('savings').value = '';
    document.getElementById('arrears').value = '';
}

function removeEmployee(index) {
    totalPayroll -= employees[index].netSalary;
    totalEmployees--;

    employees.splice(index, 1);
    updateEmployeeTable();
    updateSummary();
}

document.getElementById('addEmployeeButton').addEventListener('click', addEmployee);
document.getElementById('generateReportButton').addEventListener('click', generateReport);


function addEmployee() {
    const name = document.getElementById('employeeName').value.trim();
    const salary = parseFloat(document.getElementById('employeeSalary').value.trim());
    const allowances = parseFloat(document.getElementById('allowances').value.trim());
    const deductions = parseFloat(document.getElementById('deductions').value.trim());
    const loans = parseFloat(document.getElementById('loans').value.trim());
    const savings = parseFloat(document.getElementById('savings').value.trim());
    const arrears = parseFloat(document.getElementById('arrears').value.trim());

    if (name && !isNaN(salary)) {
        const netSalary = salary + allowances - deductions - loans - savings + arrears;
        employees.push({ name, salary, allowances, deductions, loans, savings, arrears, netSalary });
        totalEmployees++;
        totalPayroll += netSalary;

        saveToLocalStorage();
        updateEmployeeTable();
        updateSummary();
        clearInputFields();
    } else {
        alert('Please enter valid employee details!');
    }
}

function updateEmployeeTable() {
    const tbody = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing table content

    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>$${employee.salary.toFixed(2)}</td>
            <td>$${employee.allowances.toFixed(2)}</td>
            <td>$${employee.deductions.toFixed(2)}</td>
            <td>$${employee.loans.toFixed(2)}</td>
            <td>$${employee.savings.toFixed(2)}</td>
            <td>$${employee.arrears.toFixed(2)}</td>
            <td>$${employee.netSalary.toFixed(2)}</td>
            <td><button onclick="removeEmployee(${index})">Remove</button></td>
        `;
        tbody.appendChild(row);
    });
}

function updateSummary() {
    document.getElementById('totalEmployees').textContent = totalEmployees;
    document.getElementById('totalPayroll').textContent = totalPayroll.toFixed(2);
}

function clearInputFields() {
    document.getElementById('employeeName').value = '';
    document.getElementById('employeeSalary').value = '';
    document.getElementById('allowances').value = '';
    document.getElementById('deductions').value = '';
    document.getElementById('loans').value = '';
    document.getElementById('savings').value = '';
    document.getElementById('arrears').value = '';
}

function removeEmployee(index) {
    totalPayroll -= employees[index].netSalary;
    totalEmployees--;

    employees.splice(index, 1);
    saveToLocalStorage();
    updateEmployeeTable();
    updateSummary();
}

function generateReport() {
    // Simple implementation for generating a report
    const reportWindow = window.open('', '', 'width=800,height=600');
    reportWindow.document.write('<html><head><title>Employee Payroll Report</title>');
    reportWindow.document.write('<link rel="stylesheet" href="styles.css">');
    reportWindow.document.write('</head><body>');
    reportWindow.document.write('<h1>Employee Payroll Report</h1>');
    reportWindow.document.write('<table border="1"><thead><tr><th>Name</th><th>Salary</th><th>Allowances</th><th>Deductions</th><th>Loans</th><th>Savings</th><th>Arrears</th><th>Net Salary</th></tr></thead><tbody>');

    employees.forEach(employee => {
        reportWindow.document.write(`
            <tr>
                <td>${employee.name}</td>
                <td>$${employee.salary.toFixed(2)}</td>
                <td>$${employee.allowances.toFixed(2)}</td>
                <td>$${employee.deductions.toFixed(2)}</td>
                <td>$${employee.loans.toFixed(2)}</td>
                <td>$${employee.savings.toFixed(2)}</td>
                <td>$${employee.arrears.toFixed(2)}</td>
                <td>$${employee.netSalary.toFixed(2)}</td>
            </tr>
        `);
    });

    reportWindow.document.write('</tbody></table>');
    reportWindow.document.write('</body></html>');
    reportWindow.document.close();
}

function saveToLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('totalEmployees', totalEmployees);
    localStorage.setItem('totalPayroll', totalPayroll);
}

function loadFromLocalStorage() {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
        employees = JSON.parse(storedEmployees);
        totalEmployees = parseInt(localStorage.getItem('totalEmployees'), 10) || 0;
        totalPayroll = parseFloat(localStorage.getItem('totalPayroll')) || 0;

        updateEmployeeTable();
        updateSummary();
    }
}

// Load data from local storage when the page is loaded
window.onload = loadFromLocalStorage;
