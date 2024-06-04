document.addEventListener('DOMContentLoaded', function() {
    let jwt = localStorage.getItem('jwt');
    if (!jwt) {
        console.log('JWT not found, redirecting to index page.');
        window.location.href = './../html/index.html';
        return;
    }

    try {
        console.log('JWT:', jwt);
    
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        console.log('Decoded JWT payload:', jsonPayload);

        const user = JSON.parse(jsonPayload);

        if (user && user.username) {
            const username = user.username;
            console.log('Username:', username);
            document.getElementById('username').innerText = username;
        } else {
            throw new Error('Invalid JWT payload');
        }
    } catch (error) {
        console.error('Error parsing JWT:', error);
        localStorage.removeItem('jwt');
        window.location.href = './../html/login.html';
    }
});
