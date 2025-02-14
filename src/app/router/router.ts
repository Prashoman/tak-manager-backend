import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { TaskRoute } from "../modules/task/task.route";


const router = Router();
const moduleRoute = [
  {
    path:"/auth",
    route: UserRoute
  },
  {
    path:"",
    route: TaskRoute
  }
];

moduleRoute.forEach((root) => {
  router.use(root.path, root.route);
});

export default router;

