const { response } = require('express');
const client = require('../database.js');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const request = require('request-promise');


class Message {


    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    // static async findAllByUser(id) {
    //     try {
    //         const { rows } = await client.query(`SELECT * FROM "MESSAGE" WHERE user_id=$1`, [id]);
    //         return rows.map(row => new User(row));


    //     } catch (error) {
    //         if (error.detail) {
    //             throw new Error(error.detail);
    //         }
    //         throw error;
    //     }

    // }


    async addMsg(msg, date, userId) {

        try {
            this.date = date;
            this.userId = userId;
            const { rows } = await client.query('INSERT INTO "MESSAGE" (content, user_id) VALUES ($1, $2) RETURNING id', [msg, userId])
            this.id = rows[0].id;
            console.log(this);
            return this;
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }

    }

    async sendMsg(userId) {

        try {
            console.log('this', this);

            const payload={
                text: this.msg,

            };

            console.log('payload', payload);

            const res = await request({
                url: `https://hooks.slack.com/services/${this.hook}`,
                method: 'POST',
                body: payload,
                json: true
            })
            console.log('res', res);

            return response.status(201);

            // return response.status(201).json(payload);

        } catch (error) {
            if (error.detail) {
                console.log('erreur ici')
                throw new Error(error.detail);
            }
            console.log('erreur là')

            throw new Error(error.message);
        }


    }






    // static async delete(id) {

    //     try {
    //         const { rows } = await client.query(`SELECT FROM "USER" WHERE id=$1`, [id]);

    //         if (rows[0] === undefined) {
    //             throw new Error(`il n'existe aucun compte avec cet id`);

    //         } else {

    //             await client.query('DELETE FROM USER_LIKES_ALBUM WHERE user_id=$1', [id]);
    //             await client.query('DELETE FROM USER_LIKES_ARTIST WHERE user_id=$1', [id]);
    //             await client.query('DELETE FROM USER_LIKES_TRACK WHERE user_id=$1', [id]);

    //             await client.query('DELETE FROM "USER" WHERE id=$1', [id]);
    //         }
    //     } catch (error) {
    //         if (error.detail) {
    //             throw new Error(error.detail);
    //         }
    //         throw error;
    //     }
    // }

}

module.exports = Message;