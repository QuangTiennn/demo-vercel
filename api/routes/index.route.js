import dotenv from "dotenv";
import express from "express";
import authRoute from "./auth.route.js";
import fileRoute from "./file.route.js";
import taskRoute from "./task.route.js";
import userRoute from "./user.route.js";
dotenv.config();
const routes = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/task",
    route: taskRoute,
  },
  {
    path: "/file",
    route: fileRoute,
  },
];

// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: "/docs",
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
  routes.use(route.path, route.route);
});

// /* istanbul ignore next */
// if (config.env === "development") {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

export default routes;
