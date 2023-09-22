import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {

  return res.send("Hello world!");
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
