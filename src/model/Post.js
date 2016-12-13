// @flow


import mongoose from 'mongoose';
import bcrypt from 'bcrypt-as-promised';

const Schema = new mongoose.Schema({
  title: {
      type: String,
      required: true
  },
  type: {
      type: String,
      required: true,
  },
  text: {
      type: String,
      required: true,
  },
  file: {
      type: String
  },
  classe: {
      type: String
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  collection: 'post',
});


export default mongoose.model('Post', Schema);
