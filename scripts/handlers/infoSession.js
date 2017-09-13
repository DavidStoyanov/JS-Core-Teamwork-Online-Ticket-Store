handlers.viewAbout = function (ctx) {
    auth.setAuth(ctx);

    if (!sessionStorage.getItem('authtoken')) {
        auth.guestSession();
    }
    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        aboutBox: "./templates/info/about/aboutBox.hbs",
        page: "./templates/info/about/aboutPage.hbs",
    }).then(function () {
        this.partial("./templates/common/main.hbs")
            .then(auth.avatarDropDown);
    })
};

handlers.viewContact = function (ctx) {
    auth.setAuth(ctx);

    if (!sessionStorage.getItem('authtoken')) {
        auth.guestSession();
    }
    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        contactBox: "./templates/info/contact/contactBox.hbs",
        page: "./templates/info/contact/contactPage.hbs",
    }).then(function () {
        this.partial("./templates/common/main.hbs")
            .then(auth.avatarDropDown);
    })
};