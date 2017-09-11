let userService = (() => {

    function getUser(id) {
        return requester.get('user', id, 'kinvey');
    }

    function updateUser(id, username, name, email, imageUrl, status) {
        let userObj = {
            username, name, email, imageUrl, status
        };

        return requester.update('user', id, 'kinvey', userObj);
    }

    return {
        getUser,
        updateUser
    }
})();