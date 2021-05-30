const { ObjectID } = require("bson");
const express = require("express");
const admin = require("firebase-admin");
const db = require("../config/bd");
const router = express.Router();

const USERS_COLLECTION = "users";

router.get("/", async (req, res) => {
	const users = await db.get().collection(USERS_COLLECTION).find().toArray();
	res.send(users);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await db.get().collection(USERS_COLLECTION).findOne({
    _id: new ObjectID(id),
  });

  res.send(user);
});

router.post("/", async (req, res) => {
  const tokenId = req.body.tokenId;
  const decodedIdToken = await admin.auth().verifyIdToken(tokenId, true);

  const {email, uid} = decodedIdToken;
  const {name, username} = req.body;

  const newUser = {
    _id: uid,
    name,
    email,
    username,
    linkProfile: "",
    profilePic: "",
    headerPic: "",
    createdAt: Date.now(),
    followers: [],
    following: [],
  };

  await db.get().collection(USERS_COLLECTION).insertOne(newUser);

  res.send(newUser);
});

router.patch("/profile", async (req, res) => {
  const {name, username, email, tokenId} = req.body;
  const decodedIdToken = await admin.auth().verifyIdToken(tokenId, true);

  const currentUser = db.get().collection(USERS_COLLECTION).findOne({
    _id: decodedIdToken.uid
  });

  await db.get().collection(USERS_COLLECTION).updateOne({
    _id: decodedIdToken.uid
  }, {
    name: name === "" ? currentUser.name : name,
    username: username === "" ? currentUser.username : username,
    email: email === "" ? currentUser.email : email,
  });

  res.sendStatus(204);
});

router.patch("/follower", async (req, res) => {
  const {followerUserId, tokenId} = req.body;
  const decodedIdToken = await admin.auth().verifyIdToken(tokenId, true);
  
  await db.get().collection(USERS_COLLECTION).findOneAndUpdate({
    _id: decodedIdToken.uid
  }, {
    "$push": { followers: followerUserId },
  });

  res.sendStatus(204);
});

router.patch("/following", async (req, res) => {
  const {followingUserId, tokenId} = req.body;
  const decodedIdToken = await admin.auth().verifyIdToken(tokenId, true);
  
  await db.get().collection(USERS_COLLECTION).findOneAndUpdate({
    _id: decodedIdToken.uid
  }, {
    "$push": { following: followingUserId },
  });

  res.sendStatus(204);
});

module.exports = router;
