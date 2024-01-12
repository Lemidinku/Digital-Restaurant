document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var usernameInput = document.getElementById('username');
            var passwordInput = document.getElementById('password');
            var phoneInput = document.getElementById('phone');
            var passwordError = document.getElementById('password_error');
            var username = usernameInput.value;
            var password = passwordInput.value;
            var phone = phoneInput.value;
            var body = { username: username, password: password, phone: phone };
            console.log(body, 0);
            fetch('http://localhost:5000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                // console.log('Success:', data);
                if (data.success) {
                    alert(data.message);
                    window.location.href = 'login.html';
                }
                else {
                    passwordError.innerHTML = data.message;
                }
            })
                .catch(function (error) {
                console.error('Error during signup:', error);
            });
        });
    }
});
