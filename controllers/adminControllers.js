const Category = require('../models/Categories')
const Bank = require('../models/Bank')
const fs = require('fs-extra')
const path = require('path')

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
            req.flash('alertMessage', `${error.message}`)
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
            req.flash('alertMessage', `${error.message}`)
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
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/category')
        }
    },
    viewBank: async (req, res) => {
        try {
            const bank = await Bank.find()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }
            res.render('admin/bank/view_bank', { title: 'Aphosh | Bank', alert, bank })

        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }
    },
    addBank: async (req, res) => {
        try {
            const { bankName, accountNumber, name } = req.body;
            console.log(req.file)
            await Bank.create({
                name,
                bankName,
                accountNumber,
                imageUrl: `images/${req.file.filename}`
            });
            req.flash('alertMessage', 'Success add Bank')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/bank')

        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }
    },
    editBank: async (req, res) => {
        try {

            const { id, name, bankName, accountNumber } = req.body
            console.log(req.body)
            const bank = await Bank.findOne({ _id: id })
            if (req.file === undefined) {
                bank.name = name;
                bank.bankName = bankName;
                bank.accountNumber = accountNumber
                await bank.save()
                req.flash('alertMessage', 'Success edit Bank')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/bank')
            } else {
                await fs.unlink(path.join(`public/${bank.imageUrl}`));
                bank.name = name
                bank.bankName = bankName
                bank.accountNumber = accountNumber
                bank.imageUrl = `images/${req.file.filename}`
                await bank.save()
                req.flash('alertMessage', 'Success edit Bank')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/bank')
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')

        }
    },
    deleteBank: async (req, res) => {
        try {
            const { id } = req.params
            const bank = await Bank.findOne({ _id: id })
            await bank.remove()
            req.flash('alertMessage', 'Success delete Bank')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/bank')

        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }
    },
    viewItem: (req, res) => {
        res.render('admin/item/view_item', { title: 'Aphosh | Item' })
    },
    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking', { title: 'Aphosh | Booking' })
    }
}