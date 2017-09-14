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

handlers.viewCart = function (ctx) {
    cartsService.loadUserCart(sessionStorage.getItem('userId'))
        .then(successLoadUserCart)
        .catch(message.handleError);

    function successLoadUserCart(cartItems) {
        cartItems.map(x => x.price = round(Number(x.price)));
        cartItems.map(x => x.total = round(Number(x.price) * Number(x.quantity)));

        ctx.totalItems = cartItems.map(x => Number(x.quantity)).reduce((a, b) => a + b);
        ctx.subTotal = cartItems.map(x => x.total).reduce((a, b) =>  Number(a) + Number(b));

        ctx.tickets = cartItems;
        auth.setAuth(ctx);
        ctx.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            ticket: "./templates/cart/cartItem.hbs",
            page: "./templates/cart/cartView.hbs"
        }).then(function () {
            this.partial("./templates/common/main.hbs")
                .then(auth.avatarDropDown)
                .then(attachEvents);
        });

        function attachEvents() {
            $('button.up').click(function () {
                changeQuantity($(this), 1);
            });

            $('button.down').click(function () {
                changeQuantity($(this), -1);
            });

            let inputs = $('input.cart-quantity');

            inputs.on('input',(that) => {
                let target = $(that.target);
                if (target.val() < 1)
                    target.val(1);
            });

            inputs.on('input', (that) => {
                makeSubmit($(that.target));
            });


            function changeQuantity(btn, act) {
                let input = btn.parent().find('input[type=number]');
                let quantity = Number(input.val()) + act;
                quantity < 1 ? input.val(1) : input.val(quantity);
                makeSubmit(input);
            }

            function makeSubmit(that) {
                let form = $(that.closest('form'));
                form.find('input[type=submit]').click();
            }
        }
    }

    function round(num) {
        return parseFloat(Math.round(Number(num) * 100) / 100).toFixed(2);
    }
};

handlers.cartBuyTicket = function (ctx) {
    let userId = sessionStorage.getItem('userId');
    let ticketId = ctx.target.name;

    cartsService.loadUserCart(userId)
        .then(successLoadUserCart)
        .catch(message.handleError);

    function successLoadUserCart(userCart) {
        let tickets = userCart.map(x => x.ticketId);
        if (tickets.includes(ticketId)) {
            message.showError("Ticket is already in Basket!");
            ctx.redirect('#/cart');
            return
        }

        ticketsService.loadTicket(ticketId)
            .then(successLoadTicket)
            .catch(message.handleError);
    }

    function successLoadTicket(ticketInfo) {
        let ticketId = ticketInfo._id;
        let title = ticketInfo.title;
        let imageUrl = ticketInfo.imageUrl;
        let price = ticketInfo.price;

        cartsService.buyTicket(userId, ticketId, title, imageUrl, price)
            .then(successBuyTicket)
            .catch(message.handleError);

        function successBuyTicket() {
            message.showInfo(`Ticket ${title} moved to your Basket.`);
            ctx.redirect('#/cart');
        }
    }
};

handlers.cartUpdateTicket = function (ctx) {
    let itemId = ctx.target.name;
    let quantity = ctx.params.quantity;

    cartsService.loadCartItem(itemId)
        .then(successLoadCartItem)
        .catch(message.handleError);

    function successLoadCartItem(itemInfo) {

        cartsService.updateTicketQuantity(itemId, itemInfo.userId,
            itemInfo.ticketId, itemInfo.title, itemInfo.imageUrl, itemInfo.price, quantity);
    }
};

handlers.cartRemoveTicket = function (ctx) {
    let itemId = ctx.target.name;

    cartsService.removeTicket(itemId)
        .then(successRemoveTicket)
        .catch(message.handleError);

    function successRemoveTicket() {
        message.showInfo('Removed!');
        location.reload();
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