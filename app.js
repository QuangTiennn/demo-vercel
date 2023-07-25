import cors from "cors";
import express from "express";
import morgan from "morgan";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { connectDatabase } from "./api/configs/db.config.js";
import routes from "./api/routes/index.route.js";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  res.send("user!");
});

const corsOptions = {
  origin: ["*"],
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
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

app.listen(port, async () => {
  await connectDatabase();
  console.log(`Example app listening on port ${port}`);
});
