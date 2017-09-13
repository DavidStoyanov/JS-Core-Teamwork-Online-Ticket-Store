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
                .then(auth.avatarDropDown);
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
                .then(auth.avatarDropDown);
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
        .catch(auth.handleError);

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
                $('.editBtn').click(function () {
                    let row = $(this).parent().parent().parent();
                    row.find('.edit').hide();
                    row.find('.save').fadeIn();
                });

                $('.saveBtn').click(function () {
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

handlers.searchTickets = function (ctx) {
    ticketsService.loadAllTickets()
        .then(successLoadTickets)
        .catch(message.handleError);

    function successLoadTickets(ticketsData) {
        let pattern = ctx.params.pattern;
        let ticketsFound = [];
        let eventCriteria = ctx.params.event;
        let timeCriteria = convertDateTimeCriteria(ctx.params.time);

        for (let ticket of ticketsData) {

            let resTitle = ticket.title.match(new RegExp(pattern, 'gi'));
            let resDescr = ticket.description.match(new RegExp(pattern, 'gi'));

            if (timeCriteria && new Date(ticket.dateAndTime) > timeCriteria) {
                continue;
            }

            if (eventCriteria && eventCriteria != 'any' && ticket.eventType != eventCriteria) {
                continue;
            }

            if (resTitle == null && resDescr == null) {
                continue;
            }

            ticketsFound.push(ticket)
        }

        ctx.tickets = ticketsFound;
        ctx.pattern = ctx.params.pattern;
        ctx.time = ctx.params.time;
        ctx.event = ctx.params.event;
        resetCheckedButtons(ctx);
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

    function convertDateTimeCriteria(string) {
        let time = new Date();
        if (string == '7days') {
            time.setDate(time.getDate() + 7);
        }
        else if (string == '30days') {
            time.setDate(time.getDate() + 30);
        }
        else {
            return null;
        }
        return time;
    }

    function resetCheckedButtons(ctx) {
        ctx.checkTime = {};
        ctx.checkEvent = {};
        let timeButtonsMap = {"7days": "button1", "30days": "button2", "any": "button3"};
        let eventButtonsMap = {
            "movie": "button1",
            "concert": "button2",
            "festival": "button3",
            "theater": "button4",
            "play": "button5",
            "sport": "button6",
            "any": "button7"
        };

        let group1 = timeButtonsMap[ctx.params.time];
        ctx.checkTime[group1] = "checked";

        let group2 = eventButtonsMap[ctx.params.event];
        ctx.checkEvent[group2] = "checked";
    }
}
