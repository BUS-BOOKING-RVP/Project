const express = require('express');
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add-bus', isAdmin, adminController.addBus);
router.delete('/delete-bus/:busId', isAdmin, adminController.deleteBus);


module.exports = router;
