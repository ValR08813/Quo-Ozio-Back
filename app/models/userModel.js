const { response } = require('express');
const client = require('../database.js');
const bcrypt = require('bcrypt');


class User {

  
    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async findAll() {
        try {
            const { rows } = await client.query('SELECT * FROM "USER"');
            return rows.map(row => new User(row));


        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }

    }

    
    static async findOne(id) {
        const { rows } = await client.query(`SELECT * FROM "USER" WHERE id=$1`, [id]);

        // Vérification : existe-t-il un user qui a cet id ?
        if (rows[0]) {
            const user = new User(rows[0]);
            delete user.password;
            return user;
        } else {
            console.log(`No user found for id ${id}`);
            return null;
        }

    }

    
    static async findByMail(mail, password) {

        try {
            const { rows } = await client.query(`SELECT * FROM "USER" WHERE mail=$1`, [mail]);

            if (rows[0]) {
                const isPwdValid = await bcrypt.compare(password, rows[0].password);

                if (isPwdValid === false) {

                    throw new Error('Email ou mot de passe incorrect.');

                } else {
                    const user = new User(rows[0]);
                    delete user.password
                    return user;
                }
            } else {

                throw new Error('Email ou mot de passe incorrect.');
            }
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }


    }

    
    async addUser(mail, password, pseudo) {

        try {
            const checkMail = await client.query(`SELECT * FROM "USER" WHERE mail=$1`, [mail]);

            if (!checkMail.rows[0]) {
                
                const checkPseudo = await client.query(`SELECT * FROM "USER" WHERE pseudo=$1`, [pseudo]);

                if (!checkPseudo.rows[0]) {

                    const hashedPwd = await bcrypt.hash(password, 10);

                    const {rows} = await client.query('INSERT INTO "USER"(mail, lastname, firstname, pseudo, "password") VALUES($1, $2, $3, $4, $5) RETURNING id',
                        [this.mail,
                        this.lastname,
                        this.firstname,
                        this.pseudo,
                            hashedPwd]);

                    this.id = rows[0].id;
                    delete this.password;
                    delete this.password_confirmation;
                    console.log(Date.now)
;
                    return this;

                } else {
                    throw new Error('Ce pseudo est déjà pris.');
                }

            } else {
                throw new Error('Un utilisateur avec cet email existe déjà.');
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }

    }

  
    async updateUser(password) {
        try {
            if (password) {
                const hashedPwd = await bcrypt.hash(password, 10);
                this.password = hashedPwd;

            }

            await client.query('SELECT * FROM update_user($1)', [this]);
            
            delete this.password;
            delete this.password_confirmation;
            return this;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }

    }

    static async delete(id) {

        try {
            const { rows } = await client.query(`SELECT FROM "USER" WHERE id=$1`, [id]);

            if (rows[0] === undefined) {
                throw new Error(`il n'existe aucun compte avec cet id`);

            } else {


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