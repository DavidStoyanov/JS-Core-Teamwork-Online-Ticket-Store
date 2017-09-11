handlers.viewTickets = function (ctx) {
    ticketsService.loadAllTickets()
        .then(successLoadTickets)
        .catch(message.handleError);

    function successLoadTickets(ticketsData) {
        ctx.tickets = ticketsData;
        ctx.pattern = "Search";
        auth.setAuth(ctx);
        ctx.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            filterBox: "./templates/tickets/viewTickets/filterBox.hbs",
            ticketBox: "./templates/tickets/viewTickets/ticketBox.hbs",
            page: "./templates/tickets/viewTickets/ticketsPage.hbs"
        }).then(function () {
            this.partial("./templates/common/main.hbs")
                .then(auth.avatarDropDown);
        });
    }


};

handlers.viewTicket = function (ctx) {
    let id = ctx.params.id.substr(0);
    ticketsService.loadTicket(id)
        .then(successLoadTickets)
        .catch(message.handleError);

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
                .then(auth.avatarDropDown);
        });
    }
};

handlers.viewProfile = function (ctx) {
    let userId = sessionStorage.getItem('userId');
    userService.getUser(userId)
        .then(successGetUser)
        .catch(message.handleError);

    function successGetUser(userInfo) {
        let hours = new Date(Date.now()).getHours();

        if (hours >= 12 && hours < 16) {
            ctx.greeting = "Good afternoon";
        } else if (hours >= 16 && hours < 24) {
            ctx.greeting = "Good evening";
        } else {
            ctx.greeting = "Good morning";
        }

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
                .then(auth.avatarDropDown);
        });
    }
};

handlers.profileEdit = function (ctx) {
    let userId = sessionStorage.getItem('userId');
    userService.getUser(userId)
        .then(successGetUser)
        .catch(message.handleError);

    function successGetUser(userInfo) {
        let hours = new Date(Date.now()).getHours();
        
        if (hours >= 12 && hours < 16) {
            ctx.greeting = "Good afternoon";
        } else if (hours >= 16 && hours < 24) {
            ctx.greeting = "Good evening";
        } else {
            ctx.greeting = "Good morning";
        }

        userInfo.imageUrl ?
            ctx.imageUrl = userInfo.imageUrl :
            ctx.imageUrl = "./img/unknown_user.png";

        ctx.userInfo = userInfo;
        ctx.memberSince = userInfo._kmd.ect.split("T")[0];

        auth.setAuth(ctx);
        ctx.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            page: "./templates/profile/profile-edit.hbs"
        }).then(function () {
            this.partial("./templates/common/main.hbs")
                .then(auth.avatarDropDown)
                .then(attachEditBtns);

            function attachEditBtns() {
                $('.editBtn').click(function() {
                    let row = $(this).parent().parent().parent();
                    row.find('.edit').hide();
                    row.find('.save').fadeIn();
                });

                $('.saveBtn').click(function() {
                    let row = $(this).parent().parent().parent();
                    let inputVal = row.find('.save span input').val();
                    row.find('.edit span h5').text(inputVal);
                    row.find('.save').hide();
                    row.find('.edit').fadeIn();
                });
            }
        });
    }
};

handlers.profileEditAction = function (ctx) {
    let userId = sessionStorage.getItem('userId');
    let username = $('#username').text();
    let name = $('#name').text();
    let email = $('#email').text();
    let imageUrl = $('#imageUrl').val();
    let status = sessionStorage.getItem('status');

    //TODO: Validation
    if (false) {
        message.showError("TODO");
        return;
    }

    userService.updateUser(userId, username, name, email, imageUrl, status)
        .then(successUpdateUser)
        .catch(message.handleError);

    function successUpdateUser(updatedUser) {
        sessionStorage.setItem('authtoken', updatedUser['_kmd']['authtoken']);
        sessionStorage.setItem('avatar', imageUrl);
        message.showInfo('Pofile edited.');
        ctx.redirect('#/profile');
    }
};

handlers.searchTickets = function(ctx) {
    ticketsService.loadAllTickets()
        .then(successLoadTickets)
        .catch(message.handleError);

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
            this.partial("./templates/common/main.hbs")
                .then(auth.avatarDropDown);
        });
    }
};