const express = require("express");
var notesRouter = express("router");
const Note = require("../../db/models/note.model");
const mongoose = require("mongoose")

notesRouter.get("/", async (req, res) => {
  try {
    const notes = await Note.find({});
    res.json({
      listOfNotes: notes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});
notesRouter.post("/", async (req, res) => {
  try {
    const newNote = new Note(req.body);
    const savedNote = await newNote.save();
    const notes = await Note.find({});
    res.json({
      listOfNotes: savedNote,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

notesRouter.get("/:id", async (req, res) => {
  try {
    const noteID = req.params.id;

    const objectId = new mongoose.Types.ObjectId(noteID);

    const note = await Note.findById(objectId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({
      note: note,
      message: "Get by ID successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});
notesRouter.delete("/:id", async (req, res) => {
  try {
    const ID = req.params.id;
    const deletedID = new mongoose.Types.ObjectId(ID)
    const notes = await Note.findByIdAndRemove(deletedID);

    if(!notes){
      res.status(400).json({
        message : "note not found"
      })
    }
    res.json({
      listOfNotes: "delete successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});
notesRouter.put("/:id", async (req, res) => {
  try {
    const ID = req.params.id;
    const updatedID = new mongoose.Types.ObjectId(ID)
    const updatedBody = req.body;
    const notes = await Note.findByIdAndUpdate(updatedID,updatedBody,{new:true});

    if(!notes){
      res.status(400).json({
        message : "note not found"
      })
    }
    res.json({
      listOfNotes: "updated successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});
module.exports = { notesRouter };
