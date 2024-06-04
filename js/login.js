document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    console.log('Users from localStorage:', users);

    // Check if the username exists
    const user = users.find(user => user.username === username);

    if (!user) {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'User not found. Please check your username.',
        });
        return;
    }

    // Check if the password is correct
    if (user.password !== password) {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Incorrect password. Please try again.',
        });
        return;
    }

    Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have logged in successfully!',
    }).then(() => {
        console.log('Redirecting to index.html');
        window.location.href = './../html/index.html';
    });

    document.getElementById('loginForm').reset();
});
