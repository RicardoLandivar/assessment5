--Question 1

SELECT email FROM customers
ORDER BY email ASC;

--Question 2

SELECT * FROM orders where customer_id = 1;

--Question 3

SELECT SUM(num_cupcakes) FROM orders WHERE processed = FALSE;

--Question 4

SELECT cupcakes.name AS cupcake_name, COALESCE(SUM(num_cupcakes), 0) AS total_ordered --Coalesce returns the first non null values, so we set the zero to place a zero where we would have a null.
FROM cupcakes
LEFT JOIN orders ON cupcakes.id = orders.cupcake_id
GROUP BY cupcakes.name
ORDER BY cupcake_name ASC;

--Question 5

SELECT customers.email AS customer_email, COALESCE(SUM(num_cupcakes), 0) AS total_ordered
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id
LEFT JOIN cupcakes ON orders.cupcake_id = cupcakes.id
GROUP BY customers.email
ORDER BY total_ordered DESC;

--Question 6

SELECT DISTINCT customers.fname, customers.lname, customers.email
FROM customers
JOIN orders ON customers.id = orders.customer_id
JOIN cupcakes ON orders.cupcake_id = cupcakes.id
WHERE cupcakes.name = 'funfetti' AND orders.processed = 't';

--Part 2







