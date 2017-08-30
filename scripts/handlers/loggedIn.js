handlers.viewTickets = function (ctx) {

    /* TODO:
    ticketsService.loadAllTickets()
        .then(successLoadTickets)
        .catch(auth.handleError);
    */

    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        filterBox: "./templates/tickets/viewTickets/filterBox.hbs",
        ticketBox: "./templates/tickets/viewTickets/ticketBox.hbs",
        page: "./templates/tickets/viewTickets/ticketsPage.hbs"
    }).then(function () {
        this.partial("./templates/common/main.hbs")
    });
};