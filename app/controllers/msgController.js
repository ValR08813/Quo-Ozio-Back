const request = require('request-promise');
const Message = require('../models/msgModel');



const hook = 'T03FENZNZML/B03FR81F24S/UOFZQsE9p0lIJnfIN0fbYmD4';



module.exports = {


    sendMsg: async (request, response) => {
        try {

            const msg = request.body.msg;
            const hook = request.body.hook;
            const userId = request.userId;
            const date = Date.now();

            const instance = new Message(msg, userId, date);

            const msgString = await instance.addMsg(userId, msg);


            return response.status(201).json(`Message "${msg}" ajouté`);



            const slackBody = {
                text:msg

            };

            request({
                url: `https://hooks.slack.com/services/${hook}`,
                method: 'POST', 
                body: slackBody,
                json: true
            })
           

            return response.status(201).json(msg);

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }

    },
}