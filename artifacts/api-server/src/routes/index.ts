import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import visionTherapyRouter from "./visionTherapy";
import lowVisionCareRouter from "./lowVisionCare";
import contactPageRouter from "./contactPage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);

export default router;

// SSR public HTML pages — registered directly on app, not under /api
export { visionTherapyRouter, lowVisionCareRouter, contactPageRouter };
