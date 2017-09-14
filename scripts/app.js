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
        this.get('#/profile-edit', handlers.profileEdit);
        this.post('#/profile-edit', handlers.profileEditAction);

        this.get('#/cart', handlers.viewCart);
        this.post('#/cart-buy', handlers.cartBuyTicket);
        this.post('#/cart-update', handlers.cartUpdateTicket);
        this.post('#/cart-remove', handlers.cartRemoveTicket);

    }).run();

});

function filterInput(event) {
    var keyCode = ('which' in event) ? event.which : event.keyCode;

    isNotWanted = (keyCode == 69 || keyCode == 101);
    return !isNotWanted;
};

function handlePaste (e) {
    var clipboardData, pastedData;

    // Get pasted data via clipboard API
    clipboardData = e.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text').toUpperCase();

    if(pastedData.indexOf('E')>-1) {
        //alert('found an E');
        e.stopPropagation();
        e.preventDefault();
    }
};