import { Router } from "express";
import {
  fetchAllRules,
  fetchRuleById,
  postRule,
  updateRuleById,
  deleteRuleById,
} from "../controller/rule.controller";


const router = Router({ mergeParams: true });


router.get("/", fetchAllRules);


router.post("/", postRule);


router.get("/:ruleId", fetchRuleById);


router.patch("/:ruleId", updateRuleById);


router.delete("/:ruleId", deleteRuleById);

export default router;
