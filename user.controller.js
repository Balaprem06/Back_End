
const UserModel = require("../Models/user.model");
const PlistModel = require("../Models/Plist.model");
const userRouter = require('express').Router();

userRouter.post("/add_user", (request, response) => {

    let user = new UserModel;

    user.doctorname = request.body.doctorname;
    user.degree = request.body.degree;
    user.phonenumber = request.body.phonenumber;
    user.address = request.body.address;
    user.specilazation = request.body.specilazation;
    user.experience = request.body.experience;
    user.email = request.body.email;
    user.password = request.body.password;
    user.accountType = "Doctor"


    user.save().then((data) => {
        response.status(200).send({ message: "User created successfully", data: data })
    })
        .catch((err) => {
            response.status(400).send({ message: err.message })
        })
})


userRouter.get("/user_list", async (req, res) => {

    try {
        // const allUsers = await UserModel.find({}).sort({updatedAt:-1})
        const allUsers = await UserModel.aggregate([
            {
                $group:
                {
                    _id: "$_id",
                    doctorname: { "$first": "$doctorname" },
                    degree: { "$first": "$degree" },
                    phonenumber: { "$first": "$phonenumber" },
                    address: { "$first": "$address" },
                    specilazation: { "$first": "$specilazation" },
                    experience: { "$first": "$experience" },
                    email: { "$first": "$email" },
                    password: { "$first": "$password" },
                    updatedAt: { "$first": "$updatedAt" }
                }
            }
        ]).sort({ updatedAt: -1 })
        console.log("getusers", allUsers)
        res.status(200).send({
            message: 'Success',
            data: allUsers,
        })
        // console.log(allUsers);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }

})

userRouter.get('/:id', async (req, res) => {

    try {
        const getByUser = await UserModel.findById({ _id: req.params.id })
        console.log(getByUser);
        res.status(200).send({
            status: 'User get by id successfully',
            data: getByUser
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }

})

userRouter.put('/edit_user/:id', async (req, res) => {

    // console.log(req.body._id)

    try {
        const updateresult = await UserModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        // console.log(updateresult)
        res.status(200).send({
            message: 'User updated successfully',
            data: updateresult,
        })
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }

})

userRouter.delete('/delete_user/:id', async (req, res) => {

    try {
        const userDelete = await UserModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send({
            message: 'User deleted successfully',
            // data: userDelete,
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})


userRouter.post("/Login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userlogin = await UserModel.findOne({ email: email, password: password })
        const patientLogin = await PlistModel.findOne({ email: email, password: password })
        console.log("bala", patientLogin);
        if (userlogin||patientLogin) {
            console.log("hii login",email)
                res.status(200).send({ data: userlogin||patientLogin, message: "login sucess" })
                }
        else {
            res.status(500).send("not register")
        }
    } catch (error) {
        res.status(500).send({ error: error.message })
    }

});

module.exports = userRouter;