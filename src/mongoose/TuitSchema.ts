import mongoose from 'mongoose';
import User from "../models/User";

const TuitSchema = new mongoose.Schema({
  tuit: {type: String, required: true},
  postedOn: {type: Date, default: Date.now, required: true},
  postedBy: {type: User, required: true},
}, {collection: 'tuits'});

export default TuitSchema;
