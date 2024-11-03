// routes/accounts.js

import { Router } from "express";
import { getStudents, createStudent } from "../controllers/accounts.js";

const router = Router();

router.get('/estudiantes', getStudents);

router.post('/estudiantes', createStudent);

export default router;