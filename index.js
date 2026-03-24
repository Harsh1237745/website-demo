
const express = require("express");
const path = require("path");
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 8000;


const dbPath = path.join(__dirname, ".database", "datasource.db");

const publicPath = path.join(__dirname, "public"); 

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'shop.html'));
});

app.get('/shop.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'shop.html'));
});

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error("Error connecting to the database: " + err.message);
    } else {
        console.log("Database connected successfully.");


        app.get("/api/products", (req, res) => {
            const sql = "SELECT * FROM Products";
            
            db.all(sql, [], (err, rows) => {
                if (err) {
  
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.json({
                    "message": "success",
                    "data": rows
                });
            });
        });
        
        app.listen(PORT, () => {
            console.log(`Server is running on Port ${PORT}. Visit http://localhost:${PORT}/ to see your shop.`);
        });
    }
});