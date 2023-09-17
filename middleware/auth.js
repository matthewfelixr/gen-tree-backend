const jwt = require('jsonwebtoken')
const Admin = require('../models').Admin

const adminAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).send({ error: "Token Otoritas Diperlukan!" })
  }

  const token = authorization.split(' ')[1]

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await Admin.findOne({ where: { id: id } })
    next()
  } catch (error) {
    // If the error is because the JWT expired, redirect to login
    if (error.name === 'TokenExpiredError') {
      return res.status(401).redirect('/login');
    }
    console.log(error);
    res.status(401).send({ error: "Permintaan membutuhkan otoritas!" })
  }
}


module.exports = {
  adminAuth
}
