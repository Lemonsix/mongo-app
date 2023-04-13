import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Service from '../models/Service';

const create = (req: Request, res: Response, next: NextFunction) => {
    const { download, upload, type, price, currency } = req.body;
    const service = new Service({
        _id: new mongoose.Types.ObjectId(),
        download: download,
        upload: upload,
        type: type,
        price: price,
        currency: currency
    });
    return service
        .save()
        .then((service) => res.status(201).json({ service }))
        .catch((error) => res.status(500).json({ error }));
};
const read = (req: Request, res: Response, next: NextFunction) => {
    const serviceId = req.params.serviceId;
    return Service.findById(serviceId)
        .then((service) => (service ? res.status(200).json({ service }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Service.find()
        .then((service) => res.status(200).json({ service }))
        .catch((error) => res.status(500).json({ error }));
};
const update = (req: Request, res: Response, next: NextFunction) => {
    const serviceId = req.params.serviceId;
    return Service.findById(serviceId)
        .then((service) => {
            if (service) {
                service.set(req.body);
                return service
                    .save()
                    .then((service) => res.status(201).json({ service }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const destroy = (req: Request, res: Response, next: NextFunction) => {
    const serviceId = req.params.serviceId;
    return Service.findByIdAndDelete(serviceId)
        .then((service) => (service ? res.status(200).json({ message: 'deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { create, update, destroy, readAll, read };
