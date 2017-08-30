handlers.tickets = function (ctx) {
    /* TODO:
    ticketsService.loadAllPosts()
        .then(successLoadTickets)
        .catch(auth.handleError);
    */

    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        createTicketForm: "./templates/tickets/createTicketForm.hbs",
        page: "./templates/tickets/createTicketPage.hbs"
    }).then(function () {
        this.partial("./templates/common/main.hbs")
    });
};