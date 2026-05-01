import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Task from '../models/Task.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Private
export const getTasks = async (req: any, res: Response, next: NextFunction) => {
  try {
    let query: any = {};

    // If not admin, only get own tasks
    if (req.user.role !== 'admin') {
      query.userId = req.user.id;
    }

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .populate({
        path: 'userId',
        select: 'name email',
      });

    // Remap mongoose population to match previous frontend expectations if needed
    // But usually I can just change the UI to look at .userId.name
    // Let's keep it consistent by mapping
    const formattedTasks = tasks.map((task: any) => {
      const obj = task.toObject();
      return {
        ...obj,
        id: obj._id.toString(), // Ensure id field exists for frontend
        user: task.userId, // Map userId populate back to user field
      };
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: formattedTasks,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Private
export const getTask = async (req: any, res: Response, next: NextFunction) => {
  try {
    const task = await Task.findById(req.params.id).populate({
      path: 'userId',
      select: 'name email',
    });

    if (!task) {
      return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is task owner or admin
    if (task.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to access this task`, 401));
    }

    res.status(200).json({
      success: true,
      data: {
        ...task.toObject(),
        id: task._id.toString(),
        user: task.userId,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new task
// @route   POST /api/v1/tasks
// @access  Private
export const createTask = async (req: any, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status: status || 'pending',
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: {
        ...task.toObject(),
        id: task._id.toString()
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Private
export const updateTask = async (req: any, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is task owner or admin
    if (task.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to update this task`, 401));
    }

    const { title, description, status } = req.body;
    const updateFields: any = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (status !== undefined) updateFields.status = status;

    task = await Task.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: {
        ...task.toObject(),
        id: task._id.toString()
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
export const deleteTask = async (req: any, res: Response, next: NextFunction) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is task owner or admin
    if (task.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to delete this task`, 401));
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
