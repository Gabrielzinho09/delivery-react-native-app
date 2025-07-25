const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');

module.exports = {

    findByStatus(req, res) {
        const status = req.params.status;

        Order.findByStatus(status, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }

            for (const d of data) {
                console.log("Cadena a analizar:", d.address);
                try {
                    d.address = d.address;
                    d.client = d.client;
                    d.products = d.products;
                    //d.delivery = d.delivery;

                } catch (error) {
                    console.error("Error al analizar JSON:", error);
                }
            }


            return res.status(201).json(data);
        });
    },

    findByDeliveryAndStatus(req, res) {
        const id_delivery = req.params.id_delivery;
        const status = req.params.status;

        Order.findByDeliveryAndStatus(id_delivery, status, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }

            for (const d of data) {
                try {
                    d.address = d.address;
                    d.client = d.client;
                    d.products = d.products;
                    d.delivery = d.delivery;

                } catch (error) {
                    console.error("Error al analizar JSON en delivery:", error);

                }

            }


            return res.status(201).json(data);
        });
    },

    findByClientAndStatus(req, res) {
        const id_client = req.params.id_client;
        const status = req.params.status;

        Order.findByClientAndStatus(id_client, status, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }

            for (const d of data) {
                try {
                    d.address = d.address;
                    d.client = d.client;
                    d.products = d.products;
                    d.delivery = d.delivery;

                } catch (error) {
                    console.error('Error al analizar JSON:', error);
                }

            }


            return res.status(201).json(data);
        });
    },

    async create(req, res) {

        const order = req.body;

        Order.create(order, async (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de crear la orden',
                    error: err
                });
            }

            for (const product of order.products) {
                await OrderHasProducts.create(id, product.id, product.quantity, (err, id_data) => {
                    if (err) {
                        return res.status(501).json({
                            success: false,
                            message: 'Hubo un error con la creacion de los productos en la orden',
                            error: err
                        });
                    }
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se ha creado correctamente',
                data: `${id}` // EL ID DE LA NUEVA CATEGORIA
            });

        });

    },

    updateToDispatched: async (req, res) => {
        const order = req.body;
    
        try {
            const id_order = await Order.updateToDispatched(order.id, order.id_delivery);
            return res.status(201).json({
                success: true,
                message: 'La orden se ha actualizado correctamente',
                data: `${id_order}`
            });
        } catch (err) {
            return res.status(501).json({
                success: false,
                message: `Hubo un error al momento de actualizar la orden: ${err.message}`,
                error: err
            });
        }
    },
    updateToOnTheWay(req, res) {
        const order = req.body;

        Order.updateToOnTheWay(order.id, order.id_delivery, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se ha actualizado correctamente',
                data: `${id_order}` // EL ID 
            });

        });
    },
    updateToDelivered(req, res) {
        const order = req.body;

        Order.updateToDelivered(order.id, order.id_delivery, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se ha actualizado correctamente',
                data: `${id_order}` // EL ID 
            });

        });
    },

}