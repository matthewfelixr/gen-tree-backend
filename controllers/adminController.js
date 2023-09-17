const Admin = require("../models").Admin;
const jwt = require("jsonwebtoken")
const response = require("../helper/macro");
const bcrypt = require('bcryptjs')

const createToken = (id) => {
    const payload = { id }
    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" })
  }


exports.loginAdmin = async (req,res) => {
    const {
        userName,
        password,
    } = req.body;

    try {
        if(!userName){
            res.status(400).send({ message: "Semua kolom harus di isi!"});
            return
        }

        const admin = await Admin.findOne({where:{ userName: userName}})
        if(!admin){
            res.status(401).send('Akun admin tidak ditemukan')
            return
        }

        const match = await bcrypt.compare(password, admin.password)
        if(!match){
            res.status(401).send("Kata sandi tidak sesuai!")
        }

        const token = createToken(admin.id)

        const data = {
            id: admin.id,
            userName:admin.userName,
            token:token
        }
        res.status(200).send({
            success:true,
            message:"Berhasil masuk akun Admin",
            data,
        })

        // console.log(process.env.JWT_SECRET)
    } catch {
        res.status(400).json({ error: error.message })
    }
}