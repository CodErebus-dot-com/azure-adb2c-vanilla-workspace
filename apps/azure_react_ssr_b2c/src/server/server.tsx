import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import renderer from "./middlewares/renderer";
import path from 'path';
import chalk from 'chalk';

dotenv.config();

const app = express();
const { PORT = 3000 } = process.env;
const BUILD_DIR = path.resolve(__dirname);

app
  .use(express.urlencoded({extended: true}))
  .use(express.json())
  .use(compression())
  .use(helmet())
  .use(cors())
  .use(express.static(path.join(BUILD_DIR, "client")));

app.disable('x-powered-by');

app.get("*", (req, res) => {
  try {
    // hmr will be available in the next release
    // this if condition is a temporary fix and will be removed in the next release
    if (req.url === "/__webpack_hmr")
    return;
    res.send(renderer(req));
  } catch (err) {
    console.log("error in rendering server side:", err);
  }
});

app.listen(PORT, () => {
  console.log(chalk.blue(`[server] running at http://localhost:${PORT}/`));
});
