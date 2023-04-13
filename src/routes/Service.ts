import express from 'express';

import controller from '../controllers/Service';

const router = express.Router();

router.post('/', controller.create);
router.get('/:serviceId', controller.read);
router.get('/', controller.readAll);
router.patch('/:serviceId', controller.update);
router.delete('/:serviceId', controller.destroy);

export = router;
