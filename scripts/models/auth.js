let auth = (() => {

    // user/login
    function login(username, password) {
        let userData = {
            username,
            password
        };

        return requester.post('user', 'login', 'basic', userData);
    }

    // guest/register
    function registerGuest() {
        return requester.post('user', '', 'basic', {name:null});
    }

    // user/register
    function register(username, password, name, email) {
        let id = sessionStorage.getItem('userId');
        let userData = {
            username,
            password,
            name,
            email
        };

        console.log(id);
        return requester.update('user', id, 'kinvey', userData);
    }

    // user/logout
    function logout() {
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };

        return requester.post('user', '_logout', 'kinvey', logoutData);
    }

    function showInfo(message) {
        let infoBox = $('#notifications').find('#infoBox');
        infoBox.html(`${message}`);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $('#notifications').find('#errorBox');
        errorBox.html(`${message}`);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    }

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    function saveSession(userInfo, status = "regular") {
        let id = userInfo['_id'];
        let username = userInfo['username'];
        let authtoken = userInfo['_kmd']['authtoken'];

        sessionStorage.setItem('userId', id);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('authtoken', authtoken);
        sessionStorage.setItem('status', status);
    }

    function setAuth(ctx) {
        ctx.loggedIn = sessionStorage.getItem('status') === ("regular" || "administrator");
        ctx.username = sessionStorage.getItem('username');
    }

    function guestSession() {
        auth.registerGuest()
            .then((userInfo) => {auth.saveSession(userInfo, "guest")})
            .catch(auth.handleError);
    }

    return {
        login,
        register,
        registerGuest,
        logout,
        showInfo,
        showError,
        handleError,
        saveSession,
        guestSession,
        setAuth
    }
})();