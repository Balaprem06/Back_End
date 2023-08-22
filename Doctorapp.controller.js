
const DoctorappModel = require("../Models/Doctorapp.model");

const DoctorappRouter = require('express').Router();

DoctorappRouter.post("/add_Doctorapp", (request, response) => {

    let Doctorapp = new DoctorappModel;

    Doctorapp.doctorname = request.body.doctorname;
    Doctorapp.date = request.body.date;
    Doctorapp.time = request.body.time;
    Doctorapp.specialization = request.body.specialization;
    Doctorapp.contact = request.body.contact;
    Doctorapp.address = request.body.address;


    Doctorapp.save().then((data) => {
        response.status(200).send({ message: "Doctor App is created successfully", data: data })
    })
        .catch((err) => {
            response.status(400).send({ message: err.message })
        })
})


DoctorappRouter.get("/Doctorapp_list", async (req, res) => {

    try {
        // const allUsers = await UserModel.find({}).sort({updatedAt:-1})
        const allUsers = await DoctorappModel.aggregate([
            {
                $group:
                {
                    _id: "$_id",
                    doctorname: {"$first" : "$doctorname"},
                    date: {"$first" : "$date"},
                    time: {"$first" : "$time"},
                    specialization: {"$first" : "$specialization"},
                    contact: {"$first" : "$contact"},
                    address: {"$first" : "$address"},
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

DoctorappRouter.get('/:id', async (req, res) => {

    try {
        const getByUser = await DoctorappModel.findById({ _id: req.params.id })
        console.log(getByUser);
        res.status(200).send({
            status: 'User get by id successfully',
            data: getByUser
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }

})

DoctorappRouter.put('/edit_Doctorapp/:id', async (req, res) => {

    // console.log(req.body._id)

    try {
        const updateresult = await DoctorappModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        // console.log(updateresult)
        res.status(200).send({
            message: 'Doctorapp updated successfully',
            data: updateresult,
        })
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }

})

DoctorappRouter.delete('/delete_Doctorapp/:id', async (req, res) => {

    try {
        const DoctorappDelete = await DoctorappModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send({
            message: 'Patient application deleted successfully',
            // data: userDelete,
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})


module.exports = DoctorappRouter;