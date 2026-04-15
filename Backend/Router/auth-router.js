const express = require("express");
const router = express.Router();
const authcontrollers= require("../Controllers/auth-controller")
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const validate = require("../Middlewares/validate-middleware");
const authmiddleware = require("../Middlewares/auth-middleware");

router.route("/").get(authcontrollers.home);
router.route("/register").post(validate(signupSchema),  authcontrollers.register);
router.route("/login").post(validate(loginSchema),  authcontrollers.login);

router.route("/user").get(authmiddleware, authcontrollers.user);

module.exports = router;




















// router.get('/', (req, res) => {
//     res.status(200).send('message is send successfully');
// });
// router.route("/").get((req, res) => {
//     res.status(200).send('message is send successfully home');
// })
// router.route("/").get(home);
 
// router.route("/register").get((req, res) => {
//     res.status(200).send("message is send getester");
// })

// module.exports = router;
