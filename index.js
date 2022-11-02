const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const FriendModel = require("./models/Friends");
require("dotenv").config();
app.use(cors());
app.use(express.json());

//connectdb

mongoose.connect(
  "mongodb+srv://rishab:rishab@cluster0.jgqrh38.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.post("/addfriend", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const friend = new FriendModel({
    name: name,
    age: age,
  });
  await friend.save();
  res.send(friend);
});

app.get("/read", (req, res) => {
  FriendModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", async (req, res) => {
  const newAge = req.body.newAge;
  const id = req.body.id;
  try {
    await FriendModel.findById(id, (error, friendToUpdate) => {
      friendToUpdate.age = Number(newAge);
      friendToUpdate.save();
    });
  } catch (err) {
    console.log(err);
  }
  res.send("updated");
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FriendModel.findByIdAndRemove(id).exec();
  res.send("item deleted");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("connected");
});

// mongodb+srv://rishab:<password>@cluster0.jgqrh38.mongodb.net/?retryWrites=true&w=majority
