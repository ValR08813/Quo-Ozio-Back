const request = require('request-promise');
const Message = require('../models/msgModel');



const ouke = 'T03FENZNZML/B03FR81F24S/UOFZQsE9p0lIJnfIN0fbYmD4';



module.exports = {


    saveMsg: async (request, response) => {
        try {

            const msg = request.body.msg;
            const hook = request.body.hook;
            const userId = request.userId;
            const date = Math.round(new Date().getTime() / 1000);
            console.log('date', date);
            
            const instance = new Message(request.body);

            const msgSaved = await instance.addMsg(msg, date, userId);



            return response.status(201).json(`Message "${msg}" ajouté`);



            

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }

    },

    sendMsg: async (request, response) => {
        try {

            const msg = request.body.msg;
            const hook = request.body.hook;
            const userId = request.userId;
            const date = Math.round(new Date().getTime() / 1000);
            console.log('date', date);

            const instance = new Message(request.body);


            const msgSent = await instance.sendMsg(msg, hook);


            return response.status(201).json(`Message "${msg}" ajouté`);



            

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }

    }

    
}