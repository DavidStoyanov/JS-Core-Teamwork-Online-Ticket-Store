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
                .then(attachDetailsEvents)
                .then(attachEditEvents)
                .then(attachDeleteEvents);

            function attachDetailsEvents() {
                let detailsButtons = $('#viewHome').find('.btn-details');
                detailsButtons.click(showDetails);

                function showDetails() {
                    let ticketId = $(this).attr('data-id');
                    location.hash = "#/tickets/:" + ticketId;
                }
            }
            
            function attachEditEvents() {
                let editButtons = $('#viewHome').find('.btn-edit');
                if(sessionStorage.getItem('status') !== 'administrator') {
                    editButtons.hide();
                    return;
                }

                editButtons.click(editTickets);

                function editTickets() {
                    let ticketId = $(this).attr('data-id');
                    ticketsService.editTicket(ticketId)
                        .then(successEditTicket)
                        .catch(message.handleError);

                    function successEditTicket() {
                        location.reload();

                    }
                }
            }

            function attachDeleteEvents() {
                let deleteButtons = $('#viewHome').find('.btn-delete');
                if(sessionStorage.getItem('status') !== 'administrator') {
                    deleteButtons.hide();
                    return;
                }

                deleteButtons.click(deleteTickets);

                function deleteTickets() {
                    let ticketId = $(this).attr('data-id');
                    ticketsService.deleteTicket(ticketId)
                        .then(successDeleteTicket)
                        .catch(message.handleError);

                    function successDeleteTicket() {
                        location.reload();
                    }
                }
            }
        });
    }
};

handlers.ticketDetails = function (ctx) {
    let ticketId = ctx.params.id.substr(1);

    ticketsService.loadTicket(ticketId)
        .then(successLoadTicket)
        .catch(message.handleError);

    function successLoadTicket(ticketInfo) {
        console.log(ticketInfo);
        for (let obj in ticketInfo) {
            ctx[obj] = ticketInfo[obj];
        }

        auth.setAuth(ctx);
        ctx.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            filterBox: "./templates/tickets/viewTickets/filterBox.hbs",
            ticketBox: "./templates/tickets/viewTickets/ticketBox.hbs",
            page: "./templates/tickets/ticketDetails.hbs"
        }).then(function () {
            this.partial("./templates/common/main.hbs");
        })
    }
};