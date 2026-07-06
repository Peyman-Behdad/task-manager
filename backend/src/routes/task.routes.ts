import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";

const router = Router();

// همه route ها نیاز به لاگین دارن
router.use(authMiddleware);

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
