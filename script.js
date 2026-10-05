const STORAGE_KEY = "enterprise_users";

const defaultUsers = [
    { name: "Oviya", email: "oviya@example.com", status: "Active" },
    { name: "Arun", email: "arun@example.com", status: "Active" },
    { name: "Priya", email: "priya@example.com", status: "Inactive" }
];

function getUsers() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultUsers;
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function renderUsers() {
    const tableBody = document.getElementById("userTableBody");

    if (!tableBody) return;

    const users = getUsers();

    tableBody.innerHTML = "";

    users.forEach((user, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.status}</td>
            <td>
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function addUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const status = document.getElementById("status").value;

    if (!name || !email) {
        alert("Please enter name and email.");
        return;
    }

    const users = getUsers();

    users.push({
        name: name,
        email: email,
        status: status
    });

    saveUsers(users);

    document.getElementById("userForm").reset();

    renderUsers();

    alert("User added successfully!");
}

function deleteUser(index) {
    const users = getUsers();

    if (confirm("Are you sure you want to delete this user?")) {
        users.splice(index, 1);
        saveUsers(users);
        renderUsers();
    }
}

function editUser(index) {
    const users = getUsers();
    const user = users[index];

    const newName = prompt("Enter new name:", user.name);
    if (newName === null) return;

    const newEmail = prompt("Enter new email:", user.email);
    if (newEmail === null) return;

    const newStatus = prompt(
        "Enter status (Active or Inactive):",
        user.status
    );

    if (newStatus === null) return;

    users[index] = {
        name: newName.trim(),
        email: newEmail.trim(),
        status: newStatus.trim()
    };

    saveUsers(users);
    renderUsers();

    alert("User updated successfully!");
}

const form = document.getElementById("userForm");

if (form) {
    form.addEventListener("submit", addUser);
}

if (!localStorage.getItem(STORAGE_KEY)) {
    saveUsers(defaultUsers);
}

renderUsers();
