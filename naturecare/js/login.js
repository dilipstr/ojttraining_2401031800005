const API = 'http://localhost:3000';
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const msg = document.getElementById('loginMsg');

document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailEl.value, password: passwordEl.value })
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
