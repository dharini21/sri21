const express = require('express')
const router = express.Router();
const adminCtrl = require('./../controllers/adminController.js')
const { authorize } = require('../middlewares/authMiddleware.js') 
const Enum = require('../utils/enum.js')

//admin auth
router.post('/create/admin',adminCtrl.createAdmin)
router.post('/login/admin',adminCtrl.loginAdmin)
router.get('/get/admin/:id',authorize,adminCtrl.getAdmin)
router.put('/update/admin/:id',authorize,adminCtrl.updateAdmin)
router.delete('/delete/admin/:id',authorize,adminCtrl.deleteAdmin)

module.exports = router

