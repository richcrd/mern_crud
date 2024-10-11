import express from "express";
import db from "../db/connection.js";
// This help convert the id from string to ObjectId for the _id field
import { ObjectId } from "mongodb";

// The router will be added as a middleware and will be used to handle requests
const router = express.Router();

// GET request to retrieve all records
router.get("/", async (req, res) => {
    let collection = db.collection("records");
    let result = await collection.find({}).toArray();
    res.send(result).status(200);
});

// GET request to retrieve a single record by id
router.get("/:id", async (req, res) => {
    let collection = db.collection("records");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if(!result) {
        res.status(404).send("Record not found");
    } else {
        res.send(result).status(200);
    }
});

// POST request to create a new record
router.post("/", async (req, res) => {
    try {
        let newDoc = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level
        };
        let collection = db.collection("records");
        let result = await collection.insertOne(newDoc);
        // 200 OK
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding record");
    }
});

// PATCH request to update a record
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const update = { 
            $set: {
                name: req.body.name,
                position: req.body.position,
                level: req.body.level
            },
        };

        let collection = db.collection("records");
        let result = await collection.updateOne(query, update); 
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating record");
    }
});

// DELETE request to delete a record
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        let collection = db.collection("records");
        let result = await collection.deleteOne(query);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting record");
    }
});
export default router;
