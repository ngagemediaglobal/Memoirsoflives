import { Router, type IRouter } from "express";
import healthRouter from "./health";
import memoirsRouter from "./memoirs";
import contributorsRouter from "./contributors";
import categoriesRouter from "./categories";
import newsletterRouter from "./newsletter";
import memoirRequestsRouter from "./memoir-requests";
import storeRouter from "./store";

const router: IRouter = Router();

router.use(healthRouter);
router.use(memoirsRouter);
router.use(contributorsRouter);
router.use(categoriesRouter);
router.use(newsletterRouter);
router.use(memoirRequestsRouter);
router.use(storeRouter);

export default router;
