import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  getAnswersForQuestion,
  createAnswerForQuestion,
  deleteAnswer,
} from '../controllers/answers.js';

const router = express.Router();

router.get('/:id/answers', authMiddleware, getAnswersForQuestion);
router.post('/:id/answers', authMiddleware, createAnswerForQuestion);
router.delete('/answer/:id', authMiddleware, deleteAnswer);

export default router;