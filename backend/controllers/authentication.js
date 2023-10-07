const router =require("express").Router();

const { register, login } = require('../routes/user')

router.post("/signup", register);

router.post("/login", login);

module.exports = router;