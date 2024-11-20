const Router = require("express")
const { registerOwner, loginOwner, logoutOwner } = require("../controllers/owner.controller")

const router = Router();
router.post("/register", registerOwner)

router.post("/login", loginOwner)
router.get("/logout", logoutOwner)
module.exports = router;