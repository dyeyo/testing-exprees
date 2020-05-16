const express = require('express');

const ClassroomService = require('../services/classrooms.services');

const router = express.Router();

const classroomsService = new ClassroomService();
router.get('/', async (req, res) => {
  const classrooms = await classroomsService.get();
  res.status(200).json({
    data: classrooms,
    message: 'Classrooms listed',
  });
});

router.post('/', async (req, res) => {
  const { body: classrooms } = req;
  try {
    const createClassroom = await classroomsService.create(classrooms);
    res.status(201).json({
      data: createClassroom,
      message: 'Classroom created',
    });
  } catch (error) {
    res.status(500).json({
      error: error.errors ? error.errors[0].message : error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  const {
    params: { id },
  } = req;
  const classroom = await classroomsService.get(id);
  res.status(200).json({
    data: classroom,
    message: `Classroom with id ${id}`,
  });
});

router.put('/:id', async (req, res) => {
  const {
    params: { id },
  } = req;
  const { body: classroom } = req;
  try {
    const updatedClassroom = await classroomsService.update(id, classroom);
    res.status(200).json({
      data: updatedClassroom,
      message: 'Classroom it was edited',
    });
  } catch (error) {
    res.status(500).json({
      error: error.errors ? error.errors[0].message : error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await classroomsService.delete(id);
    res.status(200).json({
      message: `Classroom ${id} deleted`,
    });
  } catch (error) {
    res.status(500).json({
      error: error.errors ? error.errors[0].message : error.message,
    });
  }
});

module.exports = router;
