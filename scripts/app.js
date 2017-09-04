const handlers = {};

$(() => {
    auth.guestSession();

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

        this.get('#/create', handlers.createTicket);

        this.get('#/details/:id', handlers.viewTicket);
    }).run();
});