const authorize = (req, res, next) => {
    const {user} = req;
    if (['ADMIN'].findIndex((ele) => ele === user.role) > -1){
        next();
    }else{
        res.status(403).send('Ban khong co quyen');
    }
}

module.exports = {authorize}