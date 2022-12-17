import { Router, Request, Response } from "express";
import { itemModel as db } from "../../models/item.model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const items = await db.getItems();
  res.send(items);
});

router.get("/:id", async (req: Request, res: Response) => {
  const item = await db.getItem(req.params.id);
  res.send(item);
});

router.post("/", async (req: Request, res: Response) => {
  const { name, completed } = req.body;
  const item = await db.storeItem({ name, completed });
  res.send(item);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { name, completed } = req.body;
  const item = await db.updateItem(req.params.id, { name, completed });
  res.send(item);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const item = await db.removeItem(req.params.id);
  res.send(item);
});

export default router;
