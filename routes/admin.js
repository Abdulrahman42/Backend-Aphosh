const router = require('express').Router()
const adminController = require('../controllers/adminControllers')
const { uploadSingle, uploadMultiple } = require('../middlewares/multer')
const adminControllers = require('../controllers/adminControllers')

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
router.post('/item', uploadMultiple, adminController.addItem)
router.get('/item/:id', adminControllers.showEditItem)
router.get('/item/show-image/:id', adminControllers.showImageItem)

module.exports = router