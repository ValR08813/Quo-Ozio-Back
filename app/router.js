const {Router} = require ('express');
const userController = require('./controllers/userController');
const msgController = require('./controllers/msgController');
const authentification = require('./middlewares/jwtMiddleware');


const router = Router();
router.get('/users', userController.findAll);

router.get('/user/:id', userController.getUserInfos);


module.exports = router; 