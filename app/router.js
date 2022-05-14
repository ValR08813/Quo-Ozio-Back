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




module.exports = router; 