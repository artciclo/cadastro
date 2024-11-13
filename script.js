const { jsPDF } = window.jspdf;
const employeeList = [];

document.getElementById('employee-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const country = document.getElementById('country').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;

    const employee = { name, position, email, phone, country, skills, experience };
    employeeList.push(employee);

    addEmployeeToTable(employee);
    this.reset();
});

function addEmployeeToTable(employee) {
    const tableBody = document.querySelector('#employee-table tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${employee.name}</td>
        <td>${employee.position}</td>
        <td>${employee.email}</td>
        <td>${employee.phone}</td>
        <td>${employee.country}</td>
        <td>${employee.skills}</td>
        <td>${employee.experience}</td>
    `;
    tableBody.appendChild(row);
}

document.getElementById('export-btn').addEventListener('click', function() {
    const doc = new jsPDF();
    let yOffset = 10;

    doc.setFontSize(16);
    doc.text('Lista de Funcionários', 105, yOffset, { align: 'center' });
    yOffset += 10;

    employeeList.forEach((employee, index) => {
        doc.setFontSize(12);
        doc.text(`Funcionário ${index + 1}:`, 10, yOffset);
        yOffset += 8;
        doc.text(`Nome: ${employee.name}`, 10, yOffset);
        yOffset += 6;
        doc.text(`Cargo: ${employee.position}`, 10, yOffset);
        yOffset += 6;
        doc.text(`E-mail: ${employee.email}`, 10, yOffset);
        yOffset += 6;
        doc.text(`Telefone: ${employee.phone}`, 10, yOffset);
        yOffset += 6;
        doc.text(`País: ${employee.country}`, 10, yOffset);
        yOffset += 6;
        doc.text(`Habilidades: ${employee.skills}`, 10, yOffset);
        yOffset += 6;
        doc.text(`Experiência: ${employee.experience}`, 10, yOffset);
        yOffset += 12;
    });

    doc.save('funcionarios.pdf');
});
