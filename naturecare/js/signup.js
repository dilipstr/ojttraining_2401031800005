const API = 'http://localhost:3000';
const msg = document.getElementById('registerMsg');

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        msg.innerHTML = '<span class="text-danger">Passwords do not match</span>';
        return;
    }
    try {
        const res = await fetch(`${API}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, confirmPassword })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'home.html';
        } else {
            msg.innerHTML = `<span class="text-danger">${data.message}</span>`;
        }
    } catch {
        msg.innerHTML = '<span class="text-danger">Server not reachable. Is the backend running?</span>';
    }
});
