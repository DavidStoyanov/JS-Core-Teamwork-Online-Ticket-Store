handlers.viewTickets = function (ctx) {
    ticketsService.loadAllTickets()
        .then(successLoadTickets)
        .catch(auth.handleError);

    function successLoadTickets(ticketsData) {
        console.log(ticketsData);
        ctx.tickets = ticketsData;
        auth.setAuth(ctx);
        ctx.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            filterBox: "./templates/tickets/viewTickets/filterBox.hbs",
            ticketBox: "./templates/tickets/viewTickets/ticketBox.hbs",
            page: "./templates/tickets/viewTickets/ticketsPage.hbs"
        }).then(function () {
            this.partial("./templates/common/main.hbs")
        });
    }
};

handlers.viewTicket = function (ctx) {
    let id = ctx.params.id.substr(0);
    ticketsService.loadAllTicket(id)
        .then(successLoadTickets)
        .catch(auth.handleError);

    function successLoadTickets(ticketData) {
        ctx.ticket = ticketData;
        auth.setAuth(ctx);
        ctx.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            detailsView: "./templates/tickets/detailsTicket/detailsView.hbs",
            page: "./templates/tickets/detailsTicket/detailsPage.hbs"
        }).then(function () {
            this.partial("./templates/common/main.hbs");
        });
    }
};