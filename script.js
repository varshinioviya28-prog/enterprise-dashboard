// Enterprise Dashboard - Persistent State

const STORAGE_KEY = "enterprise_users";

const defaultUsers = [
  { name: "Oviya", email: "oviya@example.com", status: "Active" },
  { name: "Arun", email: "arun@example.com", status: "Active" },
  { name: "Priya", email: "priya@example.com", status: "Inactive" }
];

// Load users from localStorage
function getUsers() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : defaultUsers;
}

// Save users to localStorage
function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// Initialize storage
if (!localStorage.getItem(STORAGE_KEY)) {
  saveUsers(defaultUsers);
}

console.log("Enterprise Dashboard loaded");
console.log("Users:", getUsers());
