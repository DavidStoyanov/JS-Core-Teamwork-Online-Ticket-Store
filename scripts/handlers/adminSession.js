handlers.createTicket = function (ctx) {
    auth.getUser(sessionStorage.getItem('userId'))
        .then(successGetUser)
        .catch(message.handleError);

    function successGetUser(userInfo) {
        let partials = {
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            createTicketForm: "./templates/tickets/createTicket/ticketForm.hbs",
            page: "./templates/tickets/createTicket/ticketPage.hbs"
        };

        if (userInfo.status !== 'administrator') {
            partials.page = "./templates/common/error.hbs"
        }

        auth.setAuth(ctx);
        ctx.loadPartials(partials).then(function () {
            this.partial("./templates/common/main.hbs")
        });
    }
};

handlers.createTicketAction = function (ctx) {
    let {title, description, location, price, availability,
        dateAndTime, imageUrl, eventType} = this.params;

    //TODO: Validation
    if (false) {
        message.showError("TODO");
        return;
    }

    ticketsService.createTicket(title, description, location, price,
        availability, dateAndTime, imageUrl, eventType)
        .then(successCreateTicket)
        .catch(auth.handleError);

    function successCreateTicket() {
        message.showInfo("Ticket created.");
        ctx.redirect('#/tickets');
    }
};