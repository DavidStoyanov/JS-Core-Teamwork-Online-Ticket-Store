handlers.displayHome = function(ctx) {
    auth.setAuth(ctx);

    if (!sessionStorage.getItem('authtoken')) {
        auth.guestSession();
    }

    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        page: "./templates/home/home.hbs",
    }).then(function () {
        this.partial("./templates/common/main.hbs")
    })
};