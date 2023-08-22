
const PatientappModel = require("../Models/Patientapp.model");

const PatientappRouter = require('express').Router();

PatientappRouter.post("/add_Patientapp", (request, response) => {

    let Patientapp = new PatientappModel;

    Patientapp.Patientname = request.body.Patientname;
    Patientapp.date = request.body.date;
    Patientapp.time = request.body.time;
    Patientapp.symptoms = request.body.symptoms;
    Patientapp.contact = request.body.contact;
    Patientapp.address = request.body.address;


    Patientapp.save().then((data) => {
        response.status(200).send({ message: "Patis created successfully", data: data })
    })
        .catch((err) => {
            response.status(400).send({ message: err.message })
        })
})


PatientappRouter.get("/Patientapp_list", async (req, res) => {

    try {
        // const allUsers = await UserModel.find({}).sort({updatedAt:-1})
        const allUsers = await PatientappModel.aggregate([
            {
                $group:
                {
                    _id: "$_id",
                    Patientname: {"$first" : "$Patientname"},
                    date: {"$first" : "$date"},
                    time: {"$first" : "$time"},
                    symptoms: {"$first" : "$symptoms"},
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

PatientappRouter.get('/:id', async (req, res) => {

    try {
        const getByUser = await PatientappModel.findById({ _id: req.params.id })
        console.log(getByUser);
        res.status(200).send({
            status: 'User get by id successfully',
            data: getByUser
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }

})

PatientappRouter.put('/edit_Patientapp/:id', async (req, res) => {

    // console.log(req.body._id)

    try {
        const updateresult = await PatientappModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        // console.log(updateresult)
        res.status(200).send({
            message: 'Patientapp updated successfully',
            data: updateresult,
        })
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }

})

PatientappRouter.delete('/delete_Patientapp/:id', async (req, res) => {

    try {
        const PatientappDelete = await PatientappModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send({
            message: 'Patient application deleted successfully',
            // data: userDelete,
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})


module.exports = PatientappRouter;