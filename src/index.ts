import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (_: Request, res: Response) => {
  res.render("pages/index");
});

app.get("/about", (_: Request, res: Response) => {
  res.render("pages/about");
});

app.post("/users/new", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  // TODO: EXAMPLE: This is purely an example query, demonstrating a Prisma DB connection.
  // For the purposes of the example, this endpoint isn't hooked up to the front end
  // That would use very similar forms to what you might see in my other personal projects
  // or as already exists in the app
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  return res.json({ id: user.id, name: user.name, email: user.email });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
