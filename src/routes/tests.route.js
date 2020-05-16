const express = require('express');

const TestsService = require('../services/tests.services');

const router = express.Router();

const testsServices = new TestsService();

router.get('/', async (req, res) => {
  const tests = await testsServices.get();
  res.status(200).json({
    data: tests,
    message: 'Tests listed',
  });
});

router.post('/', async (req, res) => {
  const { body: tests } = req;
  try {
    const createTest = await testsServices.create(tests);
    res.status(201).json({
      data: createTest,
      message: 'Tests created',
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
  const test = await testsServices.get(id);
  res.status(200).json({
    data: test,
    message: `Test with id ${id}`,
  });
});

router.put('/:id', async (req, res) => {
  const {
    params: { id },
  } = req;
  const { body: test } = req;
  try {
    const updatedtest = await testsServices.update(id, test);
    res.status(200).json({
      data: updatedtest,
      message: 'Test it was edited',
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
    await testsServices.delete(id);
    res.status(200).json({
      message: `Test ${id} deleted`,
    });
  } catch (error) {
    res.status(500).json({
      error: error.errors ? error.errors[0].message : error.message,
    });
  }
});
module.exports = router;
