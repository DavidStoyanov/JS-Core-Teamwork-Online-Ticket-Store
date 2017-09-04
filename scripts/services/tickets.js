let ticketsService = (() => {

    function loadAllTickets() {
        return requester.get('appdata', 'tickets', 'kinvey');
    }

    function loadAllTicket(id) {
        return requester.get('appdata', 'tickets/' + id, 'kinvey');
    }

    return {
        loadAllTickets,
        loadAllTicket
    }
})();