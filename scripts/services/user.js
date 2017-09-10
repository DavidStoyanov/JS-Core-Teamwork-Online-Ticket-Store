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

    function avatarShow() {
        userService.getUser(sessionStorage.getItem('userId'))
            .then(successGetUser)
            .catch(message.handleError);


        function successGetUser(userInfo) {
            let avatar = $('#avatar-img');
            let dropdown = $('#avatar-dropdown');

            avatar.attr('src', userInfo.imageUrl ?
                `${userInfo.imageUrl}` :
                `./img/unknown_user.png`);

            avatar.click(() => {
                dropdown.hasClass('avatar-dropdown') ?
                    dropdown.removeClass('avatar-dropdown') :
                    dropdown.addClass('avatar-dropdown');
            });
        }
    }

    return {
        avatarShow,
        getUser,
        updateUser
    }
})();