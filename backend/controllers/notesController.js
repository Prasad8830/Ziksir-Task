import Note from '../models/Note.js';

export const createNote = async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ msg: 'Title is required' });
  try {
    const note = new Note({ title, description, user: req.userId });
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const updateNote = async (req, res) => {
  const { title, description } = req.body;
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.user.toString() !== req.userId) return res.status(401).json({ msg: 'Not authorized' });

    // Preserve the original createdAt timestamp
    const originalCreatedAt = note.createdAt;
    if (title !== undefined) note.title = title;
    if (description !== undefined) note.description = description;
    await note.save();
    // Ensure createdAt is never modified during update
    note.createdAt = originalCreatedAt;
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.user.toString() !== req.userId) return res.status(401).json({ msg: 'Not authorized' });
    await note.remove();
    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
export default { createNote, getNotes, deleteNote, updateNote };
