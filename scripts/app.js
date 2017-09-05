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

        this.get('#/tickets/:id', handlers.ticketDetails);

        this.get('#/ticket/create', handlers.createTicket);
        this.post('#/ticket/create', handlers.createTicketAction);

        this.get('#/ticket/edit/:id', handlers.editTicket);
        this.post('#/ticket/edit/:id', handlers.editTicketAction);
    }).run();
});