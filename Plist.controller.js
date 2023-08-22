
const PlistModel = require("../Models/Plist.model");

const PlistRouter = require('express').Router();

PlistRouter.post("/add_Plist", (request, response) => {

    let Plist = new PlistModel;

    Plist.patientname = request.body.patientname;
    Plist.age = request.body.age;
    Plist.phonenumber = request.body.phonenumber;
    Plist.address = request.body.address;
    Plist.gender = request.body.gender;
    Plist.problem = request.body.problem;
    Plist.email = request.body.email;
    Plist.password = request.body.password;
    Plist.accountType = "Patient"


    Plist.save().then((data) => {
        response.status(200).send({ message: "Patis created successfully", data: data })
    })
        .catch((err) => {
            response.status(400).send({ message: err.message })
        })
})


PlistRouter.get("/Plist_list", async (req, res) => {

    try {
        // const allUsers = await UserModel.find({}).sort({updatedAt:-1})
        const allUsers = await PlistModel.aggregate([
            {
                $group:
                {
                    _id: "$_id",
                    patientname: {"$first" : "$patientname"},
                    age: {"$first" : "$age"},
                    phonenumber: {"$first" : "$phonenumber"},
                    address: {"$first" : "$address"},
                    gender: {"$first" : "$gender"},
                    problem: {"$first" : "$problem"},
                    email: { "$first": "$email" },
                    password: { "$first": "$password" },
                    updatedAt: {"$first" : "$updatedAt"}
                }
            }
        ]).sort({updatedAt:-1})
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

PlistRouter.get('/:id', async (req, res) => {

    try {
        const getByUser = await PlistModel.findById({ _id: req.params.id })
        console.log(getByUser);
        res.status(200).send({
            status: 'User get by id successfully',
            data: getByUser
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }

})

PlistRouter.put('/edit_Plist/:id', async (req, res) => {

    // console.log(req.body._id)

    try {
        const updateresult = await PlistModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        // console.log(updateresult)
        res.status(200).send({
            message: 'Plist updated successfully',
            data: updateresult,
        })
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }

})

PlistRouter.delete('/delete_Plist/:id', async (req, res) => {

    try {
        const PlistDelete = await PlistModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send({
            message: 'Plist deleted successfully',
            // data: userDelete,
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

// PlistRouter.post("/Login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const userlogin = await UserModel.findOne({ email: email, password: password })
//         const patientLogin = await patientModel.findOne({  email: email, password: password })
//         // console.log("bala", userlogin);
//         if (patientLogin||userlogin) {
//             if (email == patientLogin.email) {
//                 res.status(200).send({ data: patientLogin, message: "login sucess" })
//             }
//             else {
//                 res.status(500).send({ message: "wrong credentials" })
//             }
//         }
//         else {
//             res.status(500).send("not register")
//         }
//     } catch (error) {
//         res.status(500).send({ error: error.message })
//     }

// });


module.exports = PlistRouter;