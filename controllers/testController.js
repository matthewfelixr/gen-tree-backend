
exports.testPost = async(req,res) =>{
    res.status(200).send({ message: "test post"})
    return res;
}