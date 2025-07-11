const employees = [{
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        department: "HR",
        role: "Manager"
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        department: "IT",
        role: "Developer"
    },
    {
        firstName: "Alice",
        lastName: "Brown",
        email: "alice@example.com",
        department: "Finance",
        role: "Analyst"
    }
];

function renderEmployees() {
    const container = document.getElementById("employeeContainer");
    container.innerHTML = "";
    employees.forEach((emp, index) => {
        container.innerHTML += `
      <div class="col-md-4 mb-3">
        <div class="card p-3">
          <h5>${emp.firstName} ${emp.lastName}</h5>
          <p>Email: ${emp.email}</p>
          <p>Dept: ${emp.department}</p>
          <p>Role: ${emp.role}</p>
          <button class="btn btn-primary btn-sm" onclick="editEmployee(${index})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Delete</button>
        </div>
      </div>
    `;
    });
}

function openForm() {
    document.getElementById("employeeForm").reset();
    document.getElementById("editIndex").value = "";
}

function editEmployee(index) {
    const emp = employees[index];
    document.getElementById("editIndex").value = index;
    document.getElementById("firstName").value = emp.firstName;
    document.getElementById("lastName").value = emp.lastName;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;
    document.getElementById("role").value = emp.role;
    new bootstrap.Modal(document.getElementById('employeeModal')).show();
}

function deleteEmployee(index) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees.splice(index, 1);
        renderEmployees();
    }
}

document.getElementById("employeeForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const emp = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim(),
        role: document.getElementById("role").value.trim()
    };

    const index = document.getElementById("editIndex").value;
    if (index === "") {
        employees.push(emp);
    } else {
        employees[index] = emp;
    }

    bootstrap.Modal.getInstance(document.getElementById('employeeModal')).hide();
    renderEmployees();
});

document.getElementById("searchInput").addEventListener("keyup", function() {
    const query = this.value.toLowerCase();
    const cards = document.querySelectorAll('#employeeContainer .card');
    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.parentElement.style.display = text.includes(query) ? 'block' : 'none';
    });
});

renderEmployees();
