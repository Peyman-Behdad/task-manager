import express from "express";
import cors from "cors";
import authRoutes from './routes/auth.routes'

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes)

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "server is running!",
  });
});

export default app;
