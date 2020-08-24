const router = require('express').Router()
const adminController = require('../controllers/adminControllers')
const { uploadSingle } = require('../middlewares/multer')

router.get('/dashboard', adminController.viewDashboard)
// endPoint Category
router.get('/category', adminController.viewCategory)
router.post('/category', adminController.addCategory)
router.put('/category', adminController.editCategory)
router.delete('/category/:id', adminController.deleteCategory)
// endPoint Bank
router.get('/bank', adminController.viewBank)
router.post('/bank', uploadSingle, adminController.addBank)
router.put('/bank', uploadSingle, adminController.editBank)
router.delete('/bank/:id', adminController.deleteBank)
// endPoint Booking
router.get('/booking', adminController.viewBooking)
//endPoint Item
router.get('/item', adminController.viewItem)

module.exports = router