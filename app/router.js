const {Router} = require ('express');
const userController = require('./controllers/userController');
const msgController = require('./controllers/msgController');
const authentification = require('./middlewares/jwtMiddleware');
const { validateBody } = require('./middlewares/Validation');
const userSchema = require('./schemas/userSchema');




const router = Router();
router.get('/users', userController.findAll);

router.get('/user/:id', userController.getUserInfos);

router.post('/signup', userController.validSignup);
// router.post('/signup', validateBody(userSchema), userController.validSignup);

router.post('/login', userController.validLogin);

router.patch('/user', authentification, userController.updateUser);


router.delete('/user', authentification, userController.deleteUser);

router.post('/msg/save', authentification, msgController.saveAndSendMsg);

router.post('/msg/send', authentification, msgController.sendMsg);





module.exports = router; 