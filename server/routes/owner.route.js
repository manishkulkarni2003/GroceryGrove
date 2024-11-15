const Router = require("express")
const { registerOwner, loginOwner } = require("../controllers/owner.controller")

const router = Router();
router.post("/register", registerOwner)

router.post("/login", loginOwner)
module.exports = router;