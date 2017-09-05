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

handlers.editTicket = function (ctx) {
    auth.getUser(sessionStorage.getItem('userId'))
        .then(successGetUser)
        .catch(message.handleError);

    function successGetUser(userInfo) {
        let partials = {
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            editTicketForm: "./templates/tickets/editTicket/ticketForm.hbs",
            page: "./templates/tickets/editTicket/ticketPage.hbs"
        };

        if (userInfo.status !== 'administrator') {
            partials.page = "./templates/common/error.hbs"
        }

        let ticketId = ctx.params.id.substr(1);
        ticketsService.loadTicket(ticketId)
            .then(successLoadTicket)
            .catch(message.handleError);

        function successLoadTicket(ticketInfo) {
            for (let obj in ticketInfo) {
                ctx[obj] = ticketInfo[obj];
            }

            auth.setAuth(ctx);
            ctx[ticketInfo.eventType] = true;
            ctx.loadPartials(partials).then(function () {
                this.partial("./templates/common/main.hbs")
            });
        }
    }
};

handlers.editTicketAction = function (ctx) {
    let ticketId = ctx.target.baseURI.split('ticket/edit/:')[1];
    let {title, description, location, price, availability,
        dateAndTime, imageUrl, eventType} = this.params;

    let ticketData = {
        title, description, location, price,
        availability, dateAndTime, imageUrl, eventType
    };


    //TODO: Validation
    if (false) {
        message.showError("TODO");
        return;
    }

    ticketsService.editTicket(ticketData, ticketId)
        .then(successEditTicket)
        .catch(auth.handleError);

    function successEditTicket() {
        message.showInfo("Ticket edited.");
        ctx.redirect('#/tickets');
    }
};

handlers.deleteTicket = function (ctx) {
    auth.getUser(sessionStorage.getItem('userId'))
        .then(successGetUser)
        .catch(message.handleError);

    function successGetUser(userInfo) {
        let partials = {
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            detailsView: "./templates/tickets/deleteTicket/detailsView.hbs",
            deleteView: "./templates/tickets/deleteTicket/deleteView.hbs",
            page: "./templates/tickets/deleteTicket/deletePage.hbs"
        };

        if (userInfo.status !== 'administrator') {
            partials.page = "./templates/common/error.hbs"
        }

        let ticketId = ctx.params.id.substr(1);
        ticketsService.loadTicket(ticketId)
            .then(successLoadTicket)
            .catch(message.handleError);

        function successLoadTicket(ticketInfo) {
            ctx.ticket = ticketInfo;
            auth.setAuth(ctx);
            ctx[ticketInfo.eventType] = true;
            ctx.loadPartials(partials).then(function () {
                this.partial("./templates/common/main.hbs")
            });
        }
    }
};

handlers.deleteTicketAction = function (ctx) {
    let ticketId = ctx.target.baseURI.split('ticket/delete/:')[1];

    ticketsService.deleteTicket(ticketId)
        .then(successDeleteTicket)
        .catch(message.handleError);

    function successDeleteTicket() {
        message.showInfo('Ticket deleted!');
        ctx.redirect('#/tickets')
    }
};