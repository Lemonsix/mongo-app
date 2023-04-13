import express from 'express';

import controller from '../controllers/Contract';

const router = express.Router();

router.post('/', controller.create);
router.get('/:contractId', controller.read);
router.get('/', controller.readAll);
router.patch('/:contractId', controller.update);
router.delete('/:contractId', controller.destroy);

export = router;
