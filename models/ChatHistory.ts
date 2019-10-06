import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ChatHistory = new Schema({
  messages: [
    {
      username: String,
      text: String,
      me: Boolean,
    },
  ],
});

export default mongoose.model('ChatHistory', ChatHistory);
