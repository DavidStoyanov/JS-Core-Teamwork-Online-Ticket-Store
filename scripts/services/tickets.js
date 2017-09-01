let ticketsService = (() => {

    function loadAllTickets() {
        return requester.get('appdata', 'tickets', 'kinvey');
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

    function deleteTicket(id) {
        return requester.remove('appdata', 'tickets/' + id, 'kinvey');
    }

    return {
        loadAllTickets,
        createTicket,
        deleteTicket
    }
})();