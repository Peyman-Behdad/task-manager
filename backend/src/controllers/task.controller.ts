import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

// همه تسک های کاربر رو بگیر
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "خطای سرور" });
  }
};

// یه تسک خاص رو بگیر
export const getTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!task) {
      res.status(404).json({ message: "تسک یافت نشد" });
      return;
    }

    res.json({ task });
  } catch (error) {
    res.status(500).json({ message: "خطای سرور" });
  }
};

// تسک جدید بساز
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      res.status(400).json({ message: "عنوان تسک الزامی است" });
      return;
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: req.userId!,
      },
    });

    res.status(201).json({
      message: "تسک با موفقیت ساخته شد",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "خطای سرور" });
  }
};

// تسک رو آپدیت کن
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    // اول چک کن تسک وجود داره و مال این کاربره
    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existingTask) {
      res.status(404).json({ message: "تسک یافت نشد" });
      return;
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    res.json({
      message: "تسک با موفقیت آپدیت شد",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "خطای سرور" });
  }
};

// تسک رو حذف کن
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // اول چک کن تسک وجود داره و مال این کاربره
    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existingTask) {
      res.status(404).json({ message: "تسک یافت نشد" });
      return;
    }

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: "تسک با موفقیت حذف شد" });
  } catch (error) {
    res.status(500).json({ message: "خطای سرور" });
  }
};
