let cartsService = (() => {

    function loadUserCart(userId) {
        return requester.get('appdata', `carts?query={"id":"${userId}"}`, 'kinvey');
    }

    function buyTicket(userId, ticketId) {
        const quantity = "1";

        let cartTicket = {
            userId, ticketId, quantity
        };

        return requester.post('appdata', 'carts', 'kinvey', cartTicket);
    }

    return {
        loadUserCart,
        buyTicket
    }
})();