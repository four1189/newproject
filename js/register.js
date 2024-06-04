
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const isExistingUser = users.some(user => user.username === username);

    if (isExistingUser) {
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'Username already exists. Please choose a different username.',
        });
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'User registered successfully!',
    }).then(() => {
        window.location.href = './../html/login.html';
    });
    document.getElementById('registerForm').reset();

    displayUserList();
});

document.addEventListener('DOMContentLoaded', displayUserList);
