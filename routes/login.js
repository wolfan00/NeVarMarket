const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
    try {
        const {email, password } = req.body;

        const user = await User.findOne({where:{ email }});
        if (!user) return res.status(400).json({ message: "Kullanıcı bulunamadı!" });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Şifre hatalı!" });
        
        const token = jwt.sign({ 
            userId: user.getDataValue("id"),
            role: user.getDataValue("role")
        }, "SECRET_KEY", { expiresIn: "1h" });
        res.status(200).json({
            token: `Bearer ${token}` // Token'ı Authorization başlığında 'Bearer' formatında gönderiliyor.
        });
    } catch (error) {
        res.status(500).json({ message: "Bir hata oluştu!" });
    }
});


module.exports = router;