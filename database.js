import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST ,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

export async function getProducts(){
    const [products] = await pool.query("SELECT * FROM Products");
    return products;
} 

export async function getCategories(){
    const [category] = await pool.query("SELECT * FROM category");
    return category;
} 


export async function getCateroyWiseProduct(id){  
    const [categoryProducts] = await pool.query(`SELECT * FROM Products WHERE category_id = ${id}`);
    return categoryProducts;
} 

export async function getSingleProduct(id){  
    const [singleProduct] = await pool.query(`SELECT * FROM Products WHERE id = ${id}`);
    return singleProduct;
} 

export async function searchResults(text){  
    // console.log(text);
    const [results] = await pool.query(`SELECT * FROM Products WHERE Title LIKE '%${text}%' OR Description LIKE '%${text}%'`);
    return results;
} 

export async function addOrderIntoDb(email, purchaseItems, total){  
    const [results] = await pool.query('INSERT INTO user (email, items_purchased, total_cart_price) VALUES (?, ?, ?)', [email, purchaseItems, total], (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Data inserted successfully!');
      }
    });
    return results;
} 