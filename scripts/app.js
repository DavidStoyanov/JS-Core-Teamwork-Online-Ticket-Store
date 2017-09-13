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
        this.get('#/search', handlers.searchTickets);
        this.get('#/details/:id', handlers.viewTicket);

        this.get('#/ticket/create', handlers.createTicket);
        this.post('#/ticket/create', handlers.createTicketAction);

        this.get('#/ticket/edit/:id', handlers.editTicket);
        this.post('#/ticket/edit/:id', handlers.editTicketAction);

        this.get('#/ticket/delete/:id', handlers.deleteTicket);
        this.post('#/ticket/delete/:id', handlers.deleteTicketAction);

        this.get('#/profile', handlers.viewProfile);
        //this.get('#/profile/:id', handlers.viewOtherProfile);

        this.get('#/profile-edit', handlers.profileEdit);
        this.post('#/profile-edit', handlers.profileEditAction);

        this.get('#/about', handlers.viewAbout);
        this.get('#/contacts', handlers.viewContact);

        //this.debug = true;
    }).run();

});