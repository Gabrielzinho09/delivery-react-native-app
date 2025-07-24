const ReportModel = require('../models/reports');

module.exports = {
    getOrdersByDateRange: (req, res) => {
        const startDate = req.query.startDate; 
        const endDate = req.query.endDate;     

        ReportModel.getOrdersByDateRange(startDate, endDate, (err, orders) => {
            if (err) {
                console.error('Error al obtener las órdenes:', err);
                res.status(500).json({ error: 'Error al obtener las órdenes' });
            } else {
                res.status(200).json({ orders });
            }
        });
    }
};