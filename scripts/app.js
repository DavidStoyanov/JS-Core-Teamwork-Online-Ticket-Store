const handlers = {};

$(() => {
    Sammy("#container", function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', handlers.displayHome);
        this.get('#/home', handlers.displayHome);

        this.get('#/login', handlers.login);

        this.get('#/register', handlers.register);

        this.get('#/tickets', handlers.viewTickets);

        this.get('#/create', handlers.createTicket)
    }).run();
});