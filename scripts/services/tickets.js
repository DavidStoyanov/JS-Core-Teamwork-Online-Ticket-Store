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

    return {
        loadAllTickets,
        createTicket
    }
})();