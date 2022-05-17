const { response } = require('express');
const client = require('../database.js');
const bcrypt = require('bcrypt');
const User = require ('../models/userModel');

class Message {

  
    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async findAllByUser(id) {
        try {
            const { rows } = await client.query(`SELECT * FROM "MESSAGE" WHERE user_id=$1`, [id]);
            return rows.map(row => new User(row));


        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }

    }
    
       
    async addMsg(userId, msg) {

        try {
            const {rows} = await db.query('SELECT * FROM add_message($1)', [this])
                this.id = rows[0].id;
                return this;
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }

    }

  
   

    static async delete(id) {

        try {
            const { rows } = await client.query(`SELECT FROM "USER" WHERE id=$1`, [id]);

            if (rows[0] === undefined) {
                throw new Error(`il n'existe aucun compte avec cet id`);

            } else {

                await client.query('DELETE FROM USER_LIKES_ALBUM WHERE user_id=$1', [id]);
                await client.query('DELETE FROM USER_LIKES_ARTIST WHERE user_id=$1', [id]);
                await client.query('DELETE FROM USER_LIKES_TRACK WHERE user_id=$1', [id]);

                await client.query('DELETE FROM "USER" WHERE id=$1', [id]);
            }
        } catch (error) { 
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

}

module.exports = User;