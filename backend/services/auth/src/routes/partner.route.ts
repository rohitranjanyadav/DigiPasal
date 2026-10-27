import express from "express";
import { getPartner } from "../controllers/partner.controller.js";

const partnerRouter = express.Router();

partnerRouter.get("/", getPartner);

export default partnerRouter;
