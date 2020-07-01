const passport = require('passport')
const router = require('express').Router()

// AUTH with google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// Google auth callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect()
    }
)

module.exports = router