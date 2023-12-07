import cors from "cors";
import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import { Server } from "socket.io";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { connectDatabase } from "./api/configs/db.config.js";
import routes from "./api/routes/index.route.js";

const app = express();
const port = 3000;

const corsOptions = {
  origin: ["*"],
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use(express.static("public"));
app.use("/public/images", express.static("public/images"));

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Todo api swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
      {
        url: "http://206.189.150.98:3000/api/v1",
      },
    ],
  },
  apis: ["./api/routes/*.js"],
};

const swaggerCSS =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
const specs = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { customCssUrl: swaggerCSS, explorer: true })
);
app.use("/api/v1", routes);

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  // res.render("error");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  await connectDatabase();
  console.log(`Example app listening on port ${port}`);
});
