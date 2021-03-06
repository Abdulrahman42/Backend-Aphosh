const Category = require('../models/Categories')
const Bank = require('../models/Bank')
const Item = require('../models/Items')
const Image = require('../models/Images')
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
    viewItem: async (req, res) => {
        try {
            const item = await Item.find()
                .populate({ path: 'imageId', select: 'id imageUrl' })
                .populate({ path: 'categoryId', select: 'id name' })
            const category = await Category.find()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }
            res.render('admin/item/view_item', { title: 'Aphosh | Item', category, alert, item, action: 'view', })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/item')
        }
    },
    addItem: async (req, res) => {
        try {
            const { categoryId, title, price, city, about, } = req.body
            if (req.files.length > 0) {
                const category = await Category.findOne({ _id: categoryId })
                const newItem = {
                    categoryId,
                    title,
                    price,
                    city,
                    description: about
                }
                const item = await Item.create(newItem)
                category.itemId.push({ _id: item._id })
                await category.save()
                for (let i = 0; i < req.files.length; i++) {
                    const imageSave = await Image.create({ imageUrl: `images/${req.files[i].filename}` })
                    item.imageId.push({ _id: imageSave._id })
                    await item.save()
                }
                req.flash('alertMessage', 'Success add Item')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/item')
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/item')
        }
    },
    showImageItem: async (req, res) => {
        try {
            const { id } = req.params
            const item = await Item.findOne({ _id: id })
                .populate({ path: 'imageId', select: 'id imageUrl' })
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }
            res.render('admin/item/view_item', { title: 'Aphosh | Image Item', alert, item, action: 'show image', })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/item')
        }
    },
    showEditItem: async (req, res) => {
        try {
            const { id } = req.params
            const item = await Item.findOne({ _id: id })
                .populate({ path: 'imageId', select: 'id imageUrl' })
                .populate({ path: 'categoryId', select: 'id name' })
            const category = await Category.find()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }
            res.render('admin/item/view_item', { title: 'Aphosh | Edit Item', alert, item, category, action: 'edit', })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/item')
        }
    },

    // editItem: async (req, res) => {
    //     try {
    //         const {}
    //     } catch (error) {

    //     }
    // },
    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking', { title: 'Aphosh | Booking' })
    }
}