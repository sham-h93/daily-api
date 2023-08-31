const Note = require("../models/note");

exports.getNotes = async (req, res) => {
  try {
    // console.log(req);
    // if (req.body != null) {
    //   const queryNotes = await Note.find(req.query);
    //   res.status(200).json(queryNotes);
    //   return;
    // }
    const notes = await Note.find().exec();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.filterNotes = async (req, res) => {
  try {
    if (req.body != null && req.body.title) {
      const notes = await Note.find().exec();
      const filteredNotes = notes.filter((note) => {
        return note.title.includes(req.body.title);
      });
      if (filteredNotes.length > 0) {
        res.status(200).json(filteredNotes);
      } else {
        res.status(200).json({ message: "not found" });
      }
    } else {
      res.status(400).json({ message: "invalid request" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    console.log(req.query._id);
    const note = await Note.findById(req.query._id);
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteNoteById = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body._id) {
      const deletedNote = await Note.findOneAndDelete({
        _id: req.body._id,
      }).exec();
      console.log(deletedNote);
      res.status(201).json({ message: "deleted successfully" });
      return;
    }
    res.status(400).json({ message: "bad request" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addNote = async (req, res) => {
  try {
    const dt = new Date();
    let note = new Note();
    note = req.body;
    if (req.body._id) {
      note.modifiedDate = dt.getTime().toString();
      await Note.updateOne({ _id: req.body._id }, note).exec();
      res.status(201).json({ message: "updated successfully" });
      return;
    }
    note.createdDate = dt.getTime().toString();
    console.log("Adding" + req);
    await Note.create(note).then(() => {
      res.status(201).json({ message: "added successfully" });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

exports.dropDatabase = async (req, res) => {
  await Note.deleteOne(req.body._id).exec();
  res.json({ message: req.body.title + "deleted successfully" });
};
