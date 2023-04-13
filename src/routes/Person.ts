import express from 'express';

import controller from '../controllers/Person';

const router = express.Router();

router.post('/', controller.create);
router.get('/:personId', controller.read);
router.get('/', controller.readAll);
router.patch('/:personId', controller.update);
router.delete('/:personId', controller.destroy);

export = router;
