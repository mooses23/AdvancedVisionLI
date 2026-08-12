import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import visionTherapyRouter from "./visionTherapy";
import lowVisionCareRouter from "./lowVisionCare";
import contactPageRouter from "./contactPage";
import faqPageRouter from "./faqPage";
import checklistPageRouter from "./checklistPage";
import conditionPagesRouter from "./conditionPages";
import doctorPagesRouter from "./doctorPages";
import sitemapRouter from "./sitemapRoute";
import visionTherapySpecialistRouter from "./visionTherapySpecialist";
import lowVisionSpecialistRouter from "./lowVisionSpecialist";
import insurancePageRouter from "./insurancePage";
import serviceAreaPagesRouter from "./serviceAreaPages";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);

export default router;

// SSR public HTML pages — registered directly on app, not under /api
export { visionTherapyRouter, lowVisionCareRouter, contactPageRouter, faqPageRouter, checklistPageRouter, conditionPagesRouter, doctorPagesRouter, sitemapRouter, visionTherapySpecialistRouter, lowVisionSpecialistRouter, insurancePageRouter, serviceAreaPagesRouter };
