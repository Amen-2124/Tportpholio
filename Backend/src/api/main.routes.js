import express from 'express';
import { sendMessage, addProjects, getProjects } from './contact.controller.js';

const router = express.Router();

router.post('/contact', sendMessage);
router.get('/add-projects', addProjects); 
router.get('/projects', getProjects);     

export default router;