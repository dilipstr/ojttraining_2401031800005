(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const authLink = document.getElementById('authLink');

    if (!authLink) return;

    if (token && user) {
        authLink.textContent = `Logout (${user.name})`;
        authLink.href = '#';
        authLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = 'login.html';
            }
        });
    } else {
        authLink.textContent = 'Login';
        authLink.href = 'login.html';
    }
})();
