const Category = require('../models/Categories')

module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard', { title: 'Aphosh | Dashboard' })
    },
    viewCategory: async (req, res) => {
        try {
            const category = await Category.find()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }
            res.render('admin/category/view_category', { category, alert, title: 'Aphosh | Category' })
        } catch (error) {
            res.redirect('/admin/category')
        }
    },
    addCategory: async (req, res) => {
        try {
            const { name } = req.body
            await Category.create({ name })
            req.flash('alertMessage', 'Success add Category')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/category')
        } catch (error) {
            req.flash('alertMessage', `$error.message`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/category')
        }
    },
    editCategory: async (req, res) => {
        try {

            const { id, name } = req.body
            const category = await Category.findOne({ _id: id })
            category.name = name
            await category.save()
            req.flash('alertMessage', 'Success edit Category')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/category')
        } catch (error) {
            req.flash('alertMessage', `$error.message`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/category')

        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params
            const category = await Category.findOne({ _id: id })
            await category.remove()
            req.flash('alertMessage', 'Success delete Category')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/category')

        } catch (error) {
            req.flash('alertMessage', `$error.message`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/category')
        }
    },
    viewBank: (req, res) => {
        res.render('admin/bank/view_bank', { title: 'Aphosh | Bank' })
    },
    viewItem: (req, res) => {
        res.render('admin/item/view_item', { title: 'Aphosh | Item' })
    },
    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking', { title: 'Aphosh | Booking' })
    }
}