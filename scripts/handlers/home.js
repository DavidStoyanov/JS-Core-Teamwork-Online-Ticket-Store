handlers.displayHome = function(ctx) {
    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        page: "./templates/home/home.hbs",
    }).then(function () {
        this.partial("./templates/common/main.hbs")
    })
};