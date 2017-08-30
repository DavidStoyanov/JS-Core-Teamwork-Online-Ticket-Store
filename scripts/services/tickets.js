let ticketsService = (() => {

    function loadAllTickets() {
        return requester.get('appdata', 'tickets', 'kinvey');
    }

    return {
        loadAllTickets
    }
})();