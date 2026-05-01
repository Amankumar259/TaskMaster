import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { taskValidator } from '../validators/authValidators.js';

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getTasks)
  .post(taskValidator, createTask);

router
  .route('/:id')
  .get(getTask)
  .put(taskValidator, updateTask)
  .delete(deleteTask);

export default router;
