USE frontend_handwriting_lab;

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM login_records;
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM products;
DELETE FROM employees;
DELETE FROM departments;
DELETE FROM users;

ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE departments AUTO_INCREMENT = 1;
ALTER TABLE employees AUTO_INCREMENT = 1;
ALTER TABLE products AUTO_INCREMENT = 1;
ALTER TABLE orders AUTO_INCREMENT = 1;
ALTER TABLE order_items AUTO_INCREMENT = 1;
ALTER TABLE login_records AUTO_INCREMENT = 1;

INSERT INTO users (id, name, email, city, gender, created_at) VALUES
  (1, 'Alice', 'alice@example.com', 'Beijing', 'female', '2024-01-05 09:00:00'),
  (2, 'Bob', 'bob@example.com', 'Shanghai', 'male', '2024-01-10 10:30:00'),
  (3, 'Carol', 'carol@example.com', 'Beijing', 'female', '2024-02-01 15:20:00'),
  (4, 'David', 'david@example.com', 'Shenzhen', 'male', '2024-02-14 08:45:00'),
  (5, 'Eva', 'eva@example.com', 'Hangzhou', 'female', '2024-03-01 11:15:00'),
  (6, 'Frank', 'frank@example.com', 'Shanghai', 'male', '2024-03-12 16:40:00'),
  (7, 'Grace', 'grace@example.com', 'Chengdu', 'female', '2024-04-09 13:00:00'),
  (8, 'Henry', 'henry@example.com', 'Beijing', 'male', '2024-05-20 09:10:00'),
  (9, 'Ivy', 'ivy@example.com', 'Guangzhou', 'female', '2024-06-01 17:25:00'),
  (10, 'Jack', 'jack@example.com', 'Nanjing', 'male', '2024-06-18 14:10:00');

INSERT INTO departments (id, name) VALUES
  (1, 'Engineering'),
  (2, 'Product'),
  (3, 'Sales'),
  (4, 'HR'),
  (5, 'Operations');

INSERT INTO employees (id, name, department_id, salary, manager_id, hire_date) VALUES
  (1, 'Liam', 1, 22000.00, NULL, '2022-01-03'),
  (2, 'Emma', 2, 19500.00, NULL, '2022-02-10'),
  (3, 'Noah', 3, 18000.00, NULL, '2022-03-15'),
  (4, 'Olivia', 1, 15000.00, 1, '2023-07-01'),
  (5, 'Mason', 1, 12000.00, 1, '2023-10-21'),
  (6, 'Ava', 2, 13800.00, 2, '2023-11-12'),
  (7, 'Ethan', 3, 10800.00, 3, '2023-12-07'),
  (8, 'Sophia', 2, 12800.00, 2, '2024-01-05'),
  (9, 'James', 4, 9300.00, NULL, '2024-02-19'),
  (10, 'Isabella', 3, 9800.00, 3, '2024-04-08');

INSERT INTO products (id, name, category, price, stock) VALUES
  (1, 'MacBook Pro', 'Electronics', 12999.00, 20),
  (2, 'iPad Air', 'Electronics', 5999.00, 35),
  (3, 'Mechanical Keyboard', 'Electronics', 699.00, 80),
  (4, 'Wireless Mouse', 'Electronics', 299.00, 120),
  (5, 'Notebook', 'Office', 25.00, 300),
  (6, 'Coffee Mug', 'Lifestyle', 199.00, 60),
  (7, 'Desk Lamp', 'Office', 159.00, 40),
  (8, 'Phone Stand', 'Accessories', 39.00, 150);

INSERT INTO orders (id, user_id, total_amount, status, created_at) VALUES
  (101, 1, 13698.00, 'paid', '2024-06-01 10:00:00'),
  (102, 1, 499.00, 'paid', '2024-06-15 12:30:00'),
  (103, 2, 6249.00, 'paid', '2024-06-16 14:20:00'),
  (104, 3, 299.00, 'pending', '2024-06-18 09:00:00'),
  (105, 4, 184.00, 'paid', '2024-07-02 15:15:00'),
  (106, 5, 159.00, 'cancelled', '2024-07-04 11:25:00'),
  (107, 6, 1798.00, 'paid', '2024-07-10 18:30:00'),
  (108, 8, 64.00, 'paid', '2024-07-21 13:10:00'),
  (109, 9, 399.00, 'paid', '2024-08-01 16:00:00'),
  (110, 3, 6198.00, 'paid', '2024-08-08 09:40:00'),
  (111, 5, 398.00, 'pending', '2024-08-13 20:05:00'),
  (112, 9, 25.00, 'cancelled', '2024-08-15 08:45:00');

INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES
  (1001, 101, 1, 1, 12999.00),
  (1002, 101, 3, 1, 699.00),
  (1003, 102, 4, 1, 299.00),
  (1004, 102, 6, 1, 199.00),
  (1005, 103, 2, 1, 5999.00),
  (1006, 103, 7, 1, 159.00),
  (1007, 104, 4, 1, 299.00),
  (1008, 105, 5, 1, 25.00),
  (1009, 105, 8, 1, 39.00),
  (1010, 105, 7, 1, 159.00),
  (1011, 106, 7, 1, 159.00),
  (1012, 107, 3, 2, 699.00),
  (1013, 107, 6, 2, 199.00),
  (1014, 108, 5, 1, 25.00),
  (1015, 108, 8, 1, 39.00),
  (1016, 109, 6, 1, 199.00),
  (1017, 109, 4, 2, 100.00),
  (1018, 110, 2, 1, 5999.00),
  (1019, 110, 4, 1, 299.00),
  (1020, 111, 6, 2, 199.00),
  (1021, 112, 5, 1, 25.00);

INSERT INTO login_records (id, user_id, login_date) VALUES
  (1, 1, '2024-08-01'),
  (2, 1, '2024-08-02'),
  (3, 1, '2024-08-03'),
  (4, 2, '2024-08-01'),
  (5, 2, '2024-08-04'),
  (6, 3, '2024-08-05'),
  (7, 3, '2024-08-06'),
  (8, 3, '2024-08-08'),
  (9, 4, '2024-08-01'),
  (10, 4, '2024-08-02'),
  (11, 4, '2024-08-03'),
  (12, 4, '2024-08-04'),
  (13, 5, '2024-08-10'),
  (14, 6, '2024-08-09'),
  (15, 6, '2024-08-10'),
  (16, 6, '2024-08-11'),
  (17, 7, '2024-08-12'),
  (18, 8, '2024-08-13'),
  (19, 9, '2024-08-13'),
  (20, 9, '2024-08-14'),
  (21, 9, '2024-08-15');

SET FOREIGN_KEY_CHECKS = 1;
