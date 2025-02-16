import express, { Application } from "express";
import cors from "cors";
import router from "./app/router/router";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
const app: Application = express();

// cors origin is set to the frontend url
app.use(cors({ origin: [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://task-manager-app-navy-zeta.vercel.app"	
],
credentials: true }));
app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API");
});

app.use(globalErrorHandler);

//not found api
app.use(notFound);

export default app;
