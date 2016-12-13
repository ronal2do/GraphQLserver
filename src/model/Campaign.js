// @flow


import mongoose from 'mongoose';
import bcrypt from 'bcrypt-as-promised';

const Schema = new mongoose.Schema({
  title: {
      type: String,
      required: true
  },
  slug: {
      type: String,
      required: true,
  },
  slogan: {
      type: String,
      required: true
  },
  bg: {
      type: String,
      required: true
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  collection: 'campaign',
});


export default mongoose.model('Campaign', Schema);
