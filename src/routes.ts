import { Router } from 'express'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { CreateUserController } from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { ListUserReciverComplimentsController } from './controllers/ListUserReciverComplimentsController'
import { ListUserSenderComplimentsController } from './controllers/ListUserSenderComplimentsController'
import listTagsController from './controllers/ListTagsController'
import listUsersController from './controllers/ListUserController'

const router = Router()
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReciveComplimentsController = new ListUserReciverComplimentsController();
const listUserSendComplimentsController = new ListUserSenderComplimentsController();

router.post('/users', createUserController.handle)
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle)
router.post('/login', authenticateUserController.handle)
router.post('/compliments', ensureAuthenticated, createComplimentController.handle)

router.get('/users/compliments/send', ensureAuthenticated, listUserSendComplimentsController.handle)
router.get('/users/compliments/recive', ensureAuthenticated, listUserReciveComplimentsController.handle )
router.get('/tags', ensureAuthenticated, listTagsController.handle )
router.get('/users', ensureAuthenticated, listUsersController.handle )


export { router }