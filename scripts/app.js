function startApp() {
    homeView();

    $("#linkHome").click(homeView);
    $("#linkLogin").click(loginView);
    $("#linkRegister").click(registrationView);
    $("#linkLogout").click(logout);
    $("#linkCreate").click(createView);


    async function showView(name) {
        // let header = await $.get('./templates/header.html');
        // Handlebars.registerPartial('header', header);

        let template = await $.get(`./templates/${name}View.html`);
        $('#main').html(template);
    }

    async function homeView() {
        await showView('home');
        //TODO
        $('#detailsEvent').click(() => showView('details'))
    }
    function loginView() {
        showView('login');
    }
    function registrationView() {
        showView('register');
    }

    function createView() {
        showView('create');
    }
    function logout() {

    }
}