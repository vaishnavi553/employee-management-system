CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id VARCHAR(50),
  name VARCHAR(100),
  department VARCHAR(50),
  designation VARCHAR(50),
  project VARCHAR(100),
  type VARCHAR(50),
  status VARCHAR(50),
  image VARCHAR(255)
);