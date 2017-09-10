const handlers = {};

$(() => {
    if (!sessionStorage.getItem('authtoken')) {
        auth.guestSession();
    }

    Sammy("#container", function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', handlers.displayHome);
        this.get('#/home', handlers.displayHome);

        this.get('#/login', handlers.login);
        this.post('#/login', handlers.loginAction);

        this.get('#/register', handlers.register);
        this.post('#/register', handlers.registerAction);

        this.get('#/logout', handlers.logout);

        this.get('#/tickets', handlers.viewTickets);
        this.get('#/details/:id', handlers.viewTicket);

        this.get('#/ticket/create', handlers.createTicket);
        this.post('#/ticket/create', handlers.createTicketAction);

        this.get('#/ticket/edit/:id', handlers.editTicket);
        this.post('#/ticket/edit/:id', handlers.editTicketAction);

        this.get('#/ticket/delete/:id', handlers.deleteTicket);
        this.post('#/ticket/delete/:id', handlers.deleteTicketAction);

        this.get('#/profile', handlers.viewProfile);
        //this.get('#/profile/:id', handlers.viewOtherProfile);

    }).run();

    //setTimeout(avatar, 1000);

    function avatar() {
        userService.getUser(sessionStorage.getItem('userId'))
            .then(successGetUser)
            .catch(message.handleError);


        function successGetUser(userInfo) {
            let avatar = $('#avatar-img');
            let dropdown = $('#avatar-dropdown');

            console.log([avatar,dropdown, userInfo]);

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

});