handlers.viewTickets = function (ctx) {
    ticketsService.loadAllTickets()
        .then(successLoadTickets)
        .catch(auth.handleError);

    function successLoadTickets(ticketsData) {
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
                .then(userService.avatarShow);
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
            this.partial("./templates/common/main.hbs")
                .then(userService.avatarShow);
        });
    }
};

handlers.viewProfile = function (ctx) {
    let userId = sessionStorage.getItem('userId');
    userService.getUser(userId)
        .then(successGetUser)
        .catch(auth.handleError);

    function successGetUser(userInfo) {
        let hours = new Date(Date.now()).getHours();

        if (hours >= 12 && hours < 16)
            ctx.greeting = "Good afternoon";
        if (hours >= 16 && hours < 24)
            ctx.greeting = "Good evening";
        else
            ctx.greeting = "Good morning";

        userInfo.imageUrl ?
            ctx.imageUrl = userInfo.imageUrl :
            ctx.imageUrl = "./img/unknown_user.png";

        ctx.userInfo = userInfo;
        ctx.memberSince = userInfo._kmd.ect.split("T")[0];

        auth.setAuth(ctx);
        ctx.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            page: "./templates/profile/profile.hbs"
        }).then(function () {
            this.partial("./templates/common/main.hbs")
                .then(userService.avatarShow);
        });
    }
};