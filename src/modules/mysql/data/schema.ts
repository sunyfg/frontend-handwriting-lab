import type { MysqlTableSchema } from '../types'

export const mysqlTableSchemas: MysqlTableSchema[] = [
  {
    name: 'users',
    title: 'Users',
    description: '平台用户基础信息。',
    columns: [
      { name: 'id', type: 'BIGINT', primaryKey: true },
      { name: 'name', type: 'VARCHAR(100)' },
      { name: 'email', type: 'VARCHAR(150)' },
      { name: 'city', type: 'VARCHAR(100)' },
      { name: 'gender', type: 'VARCHAR(20)', nullable: true },
      { name: 'created_at', type: 'DATETIME' },
    ],
  },
  {
    name: 'departments',
    title: 'Departments',
    description: '公司部门信息。',
    columns: [
      { name: 'id', type: 'BIGINT', primaryKey: true },
      { name: 'name', type: 'VARCHAR(100)' },
    ],
  },
  {
    name: 'employees',
    title: 'Employees',
    description: '员工与部门、经理关系。',
    columns: [
      { name: 'id', type: 'BIGINT', primaryKey: true },
      { name: 'name', type: 'VARCHAR(100)' },
      { name: 'department_id', type: 'BIGINT', foreignKey: 'departments.id' },
      { name: 'salary', type: 'DECIMAL(10,2)' },
      { name: 'manager_id', type: 'BIGINT', nullable: true, foreignKey: 'employees.id' },
      { name: 'hire_date', type: 'DATE' },
    ],
  },
  {
    name: 'products',
    title: 'Products',
    description: '商品信息。',
    columns: [
      { name: 'id', type: 'BIGINT', primaryKey: true },
      { name: 'name', type: 'VARCHAR(120)' },
      { name: 'category', type: 'VARCHAR(80)' },
      { name: 'price', type: 'DECIMAL(10,2)' },
      { name: 'stock', type: 'INT' },
    ],
  },
  {
    name: 'orders',
    title: 'Orders',
    description: '用户订单主表。',
    columns: [
      { name: 'id', type: 'BIGINT', primaryKey: true },
      { name: 'user_id', type: 'BIGINT', foreignKey: 'users.id' },
      { name: 'total_amount', type: 'DECIMAL(10,2)' },
      { name: 'status', type: 'VARCHAR(30)' },
      { name: 'created_at', type: 'DATETIME' },
    ],
  },
  {
    name: 'order_items',
    title: 'Order Items',
    description: '订单商品明细。',
    columns: [
      { name: 'id', type: 'BIGINT', primaryKey: true },
      { name: 'order_id', type: 'BIGINT', foreignKey: 'orders.id' },
      { name: 'product_id', type: 'BIGINT', foreignKey: 'products.id' },
      { name: 'quantity', type: 'INT' },
      { name: 'price', type: 'DECIMAL(10,2)' },
    ],
  },
  {
    name: 'login_records',
    title: 'Login Records',
    description: '用户登录记录，用于连续登录和留存题目。',
    columns: [
      { name: 'id', type: 'BIGINT', primaryKey: true },
      { name: 'user_id', type: 'BIGINT', foreignKey: 'users.id' },
      { name: 'login_date', type: 'DATE' },
    ],
  },
]

export const mysqlSampleRows: Record<string, Array<Record<string, unknown>>> = {
  users: [
    { id: 1, name: 'Alice', city: 'Beijing', gender: 'female', created_at: '2024-01-05 09:00:00' },
    { id: 2, name: 'Bob', city: 'Shanghai', gender: 'male', created_at: '2024-01-10 10:30:00' },
    { id: 3, name: 'Carol', city: 'Beijing', gender: 'female', created_at: '2024-02-01 15:20:00' },
    { id: 7, name: 'Grace', city: 'Chengdu', gender: 'female', created_at: '2024-04-09 13:00:00' },
  ],
  departments: [
    { id: 1, name: 'Engineering' },
    { id: 2, name: 'Product' },
    { id: 3, name: 'Sales' },
    { id: 5, name: 'Operations' },
  ],
  employees: [
    { id: 1, name: 'Liam', department_id: 1, salary: 22000, manager_id: null, hire_date: '2022-01-03' },
    { id: 4, name: 'Olivia', department_id: 1, salary: 15000, manager_id: 1, hire_date: '2023-07-01' },
    { id: 8, name: 'Sophia', department_id: 2, salary: 12800, manager_id: 2, hire_date: '2024-01-05' },
    { id: 10, name: 'Isabella', department_id: 3, salary: 9800, manager_id: 3, hire_date: '2024-04-08' },
  ],
  products: [
    { id: 1, name: 'MacBook Pro', category: 'Electronics', price: 12999, stock: 20 },
    { id: 3, name: 'Mechanical Keyboard', category: 'Electronics', price: 699, stock: 80 },
    { id: 5, name: 'Notebook', category: 'Office', price: 25, stock: 300 },
    { id: 8, name: 'Phone Stand', category: 'Accessories', price: 39, stock: 150 },
  ],
  orders: [
    { id: 101, user_id: 1, total_amount: 13698, status: 'paid', created_at: '2024-06-01 10:00:00' },
    { id: 104, user_id: 3, total_amount: 299, status: 'pending', created_at: '2024-06-18 09:00:00' },
    { id: 107, user_id: 6, total_amount: 1798, status: 'paid', created_at: '2024-07-10 18:30:00' },
    { id: 112, user_id: 9, total_amount: 25, status: 'cancelled', created_at: '2024-08-15 08:45:00' },
  ],
  order_items: [
    { id: 1001, order_id: 101, product_id: 1, quantity: 1, price: 12999 },
    { id: 1002, order_id: 101, product_id: 3, quantity: 1, price: 699 },
    { id: 1008, order_id: 107, product_id: 6, quantity: 3, price: 199 },
    { id: 1012, order_id: 110, product_id: 2, quantity: 1, price: 5999 },
  ],
  login_records: [
    { id: 1, user_id: 1, login_date: '2024-08-01' },
    { id: 2, user_id: 1, login_date: '2024-08-02' },
    { id: 3, user_id: 1, login_date: '2024-08-03' },
    { id: 8, user_id: 3, login_date: '2024-08-08' },
  ],
}

export function getTableSchema(tableName: string) {
  return mysqlTableSchemas.find((table) => table.name === tableName)
}
