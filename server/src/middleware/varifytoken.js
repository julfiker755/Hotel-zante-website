const jwt = require('jsonwebtoken')

exports.varifytoken =async (req, res, next) => {
    const token = req.cookies?.token

    if (!token) {
      return res.status(401).send({ message: 'unauthorized access token nai' })
    }
    jwt.verify(token, admin123, (err, decoded) => {
      if (err) {
        console.log(err)
        return res.status(401).send({ message: 'unauthorized access' })
      }
      req.user = decoded
      next()
    })
};

 // For admins
 const verifyAdmin = async (req, res, next) => {
  const user = req.user
  console.log('user from verify admin', user)
  const query = { email: user?.email }
  const result = await usersCollection.findOne(query)
  if (!result || result?.role !== 'admin')
    return res.status(401).send({ message: 'unauthorized access' })
  next()
}
// For hosts
const verifyHost = async (req, res, next) => {
  const user = req.user
  const query = { email: user?.email }
  const result = await usersCollection.findOne(query)
  if (!result || result?.role !== 'host')
    return res.status(401).send({ message: 'unauthorized access' })
  next()
}

