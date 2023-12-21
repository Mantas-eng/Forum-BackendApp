import AnswerModel from '../models/Answer.js';

const getAnswersForQuestion = async (req, res) => {
  try {
    const answers = await AnswerModel.find({ questionId: req.params.id });
    res.status(200).json({ answers: answers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAnswerForQuestion = async (req, res) => {
  const { content } = req.body;
  const { id: questionId } = req.params;

  try {
    const answer = new AnswerModel({ content, questionId });
    const savedAnswer = await answer.save();

    res.status(201).json({ answer: savedAnswer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAnswer = async (req, res) => {
  try {
    const deletedAnswer = await AnswerModel.findByIdAndDelete(req.params.id);

    if (!deletedAnswer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    res.status(200).json({ message: `Answer with ID ${req.params.id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAnswersForQuestion, createAnswerForQuestion, deleteAnswer };
