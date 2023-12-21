import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;