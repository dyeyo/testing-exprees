const express = require('express');

const ModulesService = require('../services/modules.services');

const router = express.Router();

const modulesService = new ModulesService();

router.get('/', async (req, res) => {
  const modules = await modulesService.get();
  res.status(200).json({
    data: modules,
    message: 'Modules listed',
  });
});

router.post('/', async (req, res) => {
  const { body: modules } = req;
  try {
    const createdModule = await modulesService.create(modules);
    res.status(201).json({
      data: createdModule,
      message: 'Module created',
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
  const module = await modulesService.get(id);
  res.status(200).json({
    data: module,
    message: `Module with id ${id}`,
  });
});

router.put('/:id', async (req, res) => {
  const {
    params: { id },
  } = req;
  const { body: module } = req;
  try {
    const updatedModule = await modulesService.update(id, module);
    res.status(200).json({
      data: updatedModule,
      message: 'Module it was edited',
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
    await modulesService.delete(id);
    res.status(200).json({
      message: `Module ${id} deleted`,
    });
  } catch (error) {
    res.status(500).json({
      error: error.errors ? error.errors[0].message : error.message,
    });
  }
});

module.exports = router;
