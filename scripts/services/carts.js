let cartsService = (() => {

    function loadUserCart(userId) {
        return requester.get('appdata', `carts?query={"id":"${userId}"}`, 'kinvey');
    }

    function buyTicket(userId, ticketId, imageUrl, price) {
        const quantity = "1";

        let cartTicket = {
            userId, ticketId, imageUrl, price, quantity
        };

        return requester.post('appdata', 'carts', 'kinvey', cartTicket);
    }

    function updateTicketQuantity(id, userId, ticketId, imageUrl, price, quantity) {

        let cartTicket = {
            userId, ticketId, imageUrl, price, quantity
        };

        return requester.update('appdata', 'carts/' + id, 'kinvey', cartTicket);
    }

    function removeTicket(id) {
        return requester.remove('appdata', 'carts/' + id, 'kinvey');
    }

    return {
        loadUserCart,
        buyTicket,
        updateTicketQuantity,
        removeTicket
    }
})();