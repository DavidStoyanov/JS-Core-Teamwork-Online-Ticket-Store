handlers.viewTickets = function (ctx) {
    ticketsService.loadAllTickets()
        .then(successLoadTickets)
        .catch(auth.handleError);

    function successLoadTickets(ticketsData) {
        ctx.tickets = ticketsData;
        ctx.pattern = "Search"
        auth.setAuth(ctx);
        ctx.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            filterBox: "./templates/tickets/viewTickets/filterBox.hbs",
            ticketBox: "./templates/tickets/viewTickets/ticketBox.hbs",
            page: "./templates/tickets/viewTickets/ticketsPage.hbs"
        }).then(function () {
            this.partial("./templates/common/main.hbs");
        });
    }


};

handlers.viewTicket = function (ctx) {
    let id = ctx.params.id.substr(0);
    ticketsService.loadTicket(id)
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

handlers.searchTickets = function(ctx) {
    ticketsService.loadAllTickets()
        .then(successLoadTickets)
        .catch(auth.handleError);

    function successLoadTickets(ticketsData) {
        let pattern = ctx.params.pattern;

        let ticketsFound = [];

        // console.log(pattern);
        // console.log(ticketsData);
        for (let ticket of ticketsData) {
            let resTitle = ticket.title.match(new RegExp(pattern, 'gi'));
            let resDescr = ticket.description.match(new RegExp(pattern, 'gi'));

            if(resTitle !== null ||  resDescr!== null){
                ticketsFound.push(ticket)
            }

        }

        ctx.tickets = ticketsFound;
        ctx.pattern = pattern;


        auth.setAuth(ctx);
        ctx.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            filterBox: "./templates/tickets/viewTickets/filterBox.hbs",
            ticketBox: "./templates/tickets/viewTickets/ticketBox.hbs",
            page: "./templates/tickets/viewTickets/ticketsPage.hbs"
        }).then(function () {
            this.partial("./templates/common/main.hbs");
        });
    }
}