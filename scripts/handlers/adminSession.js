handlers.createTicket = function (ctx) {
    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        createTicketForm: "./templates/tickets/createTicket/ticketForm.hbs",
        page: "./templates/tickets/createTicket/ticketPage.hbs"
    }).then(function () {
        this.partial("./templates/common/main.hbs")
    });
};