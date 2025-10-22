import express from 'express';
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';
import authMiddleware from '../middleware/auth.js';

const taskRouter = express.Router();

taskRouter.get('/', authMiddleware, getTasks);
taskRouter.post('/', authMiddleware, createTask);
taskRouter.get('/:id', authMiddleware, getTaskById);
taskRouter.put('/:id', authMiddleware, updateTask);
taskRouter.delete('/:id', authMiddleware, deleteTask);

export default taskRouter;