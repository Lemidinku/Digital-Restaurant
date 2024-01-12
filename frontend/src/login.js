document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var usernameInput = document.getElementById('username');
            var passwordInput = document.getElementById('password');
            var username = usernameInput.value;
            var password = passwordInput.value;
            var body = { username: username, password: password };
            // console.log(body, 0);
            fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
                .then(function (data) {
                    // console.log('Success:', data);
                    console.log(data)
                    if (data.success === true) {
                        localStorage.setItem('token', "Bearer ".concat(data.token));
                        if (data.roles[0] === 'admin') {
                            window.location.href = 'admin/dashboard.html';
                            
                        } else {
                            
                            window.location.href = 'main/index.html';
                        }
                        
                    } else {
                        alert(data.message);
                    }
            })
                .catch(function (error) {
                console.error('Error during login:', error);
            });
        });
    }
});
