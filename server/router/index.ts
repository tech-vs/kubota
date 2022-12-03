import { Request, Response, Router } from "express";
import * as authController from "../controller/auth.controller";
import * as healthController from "../controller/health.controller";
import * as mssqlController from "../controller/mssql.controller";
import * as packingController from "../controller/packing.controller";
import * as palletController from "../controller/pallet.controller";
import * as jwt from "../middleware/jwt";
/*+++++++++++++++++++++++++++++++++++++++++++++
 Routes
 ++++++++++++++++++++++++++++++++++++++++++++++*/
const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.json({ status: 200, message: "OK" });
});
router.get("/health", healthController.index);

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/profile", jwt.verify, authController.profile);
router.get("/user", authController.user);
router.delete("/user", authController.deleteUser);

router.get("/packing", packingController.packing);
router.get("/checksheet", palletController.checksheet);
router.post("/checksheet", palletController.editQuestion);

router.get("/mssql", mssqlController.mssqlMaster);
export default router;
