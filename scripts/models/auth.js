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
        let guestData = {status:"guest"};

        return requester.post('user', '', 'basic', guestData);
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

        userData.status = "regular";

        return requester.update('user', id, 'kinvey', userData);
    }

    // user/logout
    function logout() {
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };

        return requester.post('user', '_logout', 'kinvey', logoutData);
    }

    // templates
    function setAuth(ctx) {
        ctx.username = sessionStorage.getItem('username');
        ctx.isAdmin = sessionStorage.getItem('status') === "administrator";
        ctx.loggedIn = sessionStorage.getItem('status') === "regular" ||
            sessionStorage.getItem('status') === "administrator";
    }

    function saveSession(userInfo, status = "regular") {
        let id = userInfo['_id'];
        let username = userInfo['username'];
        let authtoken = userInfo['_kmd']['authtoken'];

        sessionStorage.setItem('userId', id);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('authtoken', authtoken);
        sessionStorage.setItem('status', userInfo.status ?
            userInfo.status : status);
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
        saveSession,
        guestSession,
        setAuth
    }
})();