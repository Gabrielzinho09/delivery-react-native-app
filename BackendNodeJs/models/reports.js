
const db = require('../config/config');

const ReportModel = {};

ReportModel.getOrdersByDateRange = (startDate, endDate, result) => {
    const sql = `
    SELECT 
        subquery.order_id,
        subquery.order_date,
        GROUP_CONCAT(subquery.product_name) as product_names, 
        GROUP_CONCAT(subquery.product_price) as product_prices,
        GROUP_CONCAT(subquery.quantity) as quantities,
        subquery.total_price
    FROM (
        SELECT 
            orders.id as order_id,
            orders.created_at as order_date,
            products.name as product_name,
            products.price as product_price,
            order_has_products.quantity,
            SUM(products.price * order_has_products.quantity) OVER (PARTITION BY orders.id) as total_price
        FROM
            orders
        JOIN
            order_has_products ON orders.id = order_has_products.id_order
        JOIN
            products ON order_has_products.id_product = products.id
        WHERE
            orders.created_at BETWEEN ? AND ?
        GROUP BY
            orders.id, orders.created_at, products.id
    ) AS subquery
    GROUP BY
        subquery.order_id, subquery.order_date, subquery.total_price;
    `;

    db.query(sql, [startDate, endDate], (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            console.log('Resultado de la consulta:', res);
            result(null, res);
        }
    });
};

module.exports = ReportModel;