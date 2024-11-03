// dataBase.js

import { config } from "./config.js";
import mysql from "mysql2/promise";

export const connect = async () => {
    try {
        return await mysql.createConnection(config);
        
    } catch (error) {
        console.error('Error connecting or executing query:', error);
    }
}; 
