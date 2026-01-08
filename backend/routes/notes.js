import express from 'express';
import auth from '../middleware/auth.js';
import notesController from '../controllers/notesController.js';

const router = express.Router();

router.use(auth);

router.get('/', notesController.getNotes);
router.post('/', notesController.createNote);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

export default router;
