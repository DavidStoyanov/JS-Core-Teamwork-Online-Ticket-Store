handlers.login = function (ctx) {
    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        loginForm: "./templates/login/loginForm.hbs",
        page: "./templates/login/loginPage.hbs"
    }).then(function () {
        this.partial('./templates/common/main.hbs');
    })
};

handlers.loginAction = function (ctx) {
    let {username, password} = this.params;

    //TODO Validation
    if (username.length < 3) {
        auth.showError("TODO");
        return;
    }
    if (password.length < 5) {
        auth.showError("TODO");
        return;
    }

    auth.login(username, password)
        .then(successLogin)
        .catch(auth.handleError);

    function successLogin(userInfo) {
        auth.saveSession(userInfo);
        auth.showInfo("Login successful.");
        ctx.redirect('#/home');
    }
};

handlers.register = function (ctx) {
    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        registerForm: "./templates/register/registerForm.hbs",
        page: "./templates/register/registerPage.hbs"
    }).then(function () {
        this.partial('./templates/common/main.hbs');
    })
};

handlers.registerAction = function (ctx) {
    let {username, password, repeatPass, name, email} = this.params;

    //TODO: Validation
    if (username.length < 3 || !username.match(/^[\w-.]+$/)) {
        auth.showError("TODO");
        return;
    }
    if (password.length < 5 || !password.match(/^[a-zA-z0-9]+$/)) {
        auth.showError("TODO");
        return;
    }
    if (password !== repeatPass) {
        auth.showError("TODO");
        return;
    }

    auth.register(username, password, name, email)
        .then(successRegister)
        .catch(auth.handleError);

    function successRegister(userInfo) {
        auth.saveSession(userInfo);
        auth.showInfo("User registration successful.");
        ctx.redirect('#/home');
    }
};

handlers.logout = function (ctx) {
    auth.logout()
        .then(successLogout)
        .catch(auth.handleError);

    function successLogout() {
        sessionStorage.clear();
        ctx.redirect('#/home');
    }
};