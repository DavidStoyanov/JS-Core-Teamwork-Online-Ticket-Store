let message = (() => {

    function showInfo(message) {
        let infoBox = $('#notifications').find('#infoBox');
        infoBox.html(`${message}`);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $('#notifications').find('#errorBox');
        errorBox.html(`${message}`);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    }

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    return {
        showInfo,
        showError,
        handleError
    }
})();