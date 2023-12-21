import Question from '../models/Question.js';

export const getAllQuestions = async (req, res) => {
    try {
      const questions = await Question.find();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const createQuestion = async (req, res) => {
    const question = new Question({
      title: req.body.title,
      content: req.body.content,
    });
  
    try {
      const newQuestion = await question.save();
      res.status(201).json(newQuestion);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const deleteQuestion = async (req, res) => {
    try {
      await Question.findByIdAndRemove(req.params.id);
      res.json({ message: 'Question deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  