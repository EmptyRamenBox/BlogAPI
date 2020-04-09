// index.js
//  ./src/routes/index.js
import { Router } from "express";

import root from "./root";

const router = Router();

router.use(root);

export default router;
