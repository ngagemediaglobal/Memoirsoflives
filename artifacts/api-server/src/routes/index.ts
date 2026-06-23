import { Router, type IRouter } from "express";
import healthRouter from "./health";
import memoirsRouter from "./memoirs";
import contributorsRouter from "./contributors";
import categoriesRouter from "./categories";

const router: IRouter = Router();

router.use(healthRouter);
router.use(memoirsRouter);
router.use(contributorsRouter);
router.use(categoriesRouter);

export default router;
