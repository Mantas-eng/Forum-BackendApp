import express from 'express';
import authMiddleware from '../middleware/auth.js';

import { getAllQuestions, createQuestion, deleteQuestion } from '../controllers/questions.js';

const router = express.Router();

router.get('/questions/:id/answers', authMiddleware, getAllQuestions);
router.post('/questions/:id/answers', createQuestion);
router.delete('/:id', deleteQuestion);

export default router;