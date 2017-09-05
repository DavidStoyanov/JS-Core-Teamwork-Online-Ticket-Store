let ticketsService = (() => {

    function loadAllTickets() {
        return requester.get('appdata', 'tickets', 'kinvey');
    }

    function loadTicket(ticketId) {
        return requester.get('appdata', 'tickets/' + ticketId, 'kinvey');
    }

    function createTicket(title, description, location, price, availability, dateAndTime, imageUrl, eventType) {
        let ticketData = {
            title,
            description,
            location,
            price,
            availability,
            dateAndTime,
            imageUrl,
            eventType
        };

        return requester.post('appdata', 'tickets', 'kinvey', ticketData);
    }

    function editTicket(ticketData, ticketId) {
        return requester.update('appdata', 'tickets/' + ticketId, 'kinvey', ticketData);
    }

    function deleteTicket(id) {
        return requester.remove('appdata', 'tickets/' + id, 'kinvey');
    }


    return {
        loadAllTickets,
        loadTicket,
        createTicket,
        editTicket,
        deleteTicket
    }
})();