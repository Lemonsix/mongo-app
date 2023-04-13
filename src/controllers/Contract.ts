import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Contract from '../models/Contract';

const create = (req: Request, res: Response, next: NextFunction) => {
    const { person, service, adress } = req.body;
    const contract = new Contract({
        _id: new mongoose.Types.ObjectId(),
        person: person._id,
        service: service._id,
        address: adress
    });
    return contract
        .save()
        .then((contract) => res.status(201).json({ contract }))
        .catch((error) => res.status(500).json({ error }));
};
const read = (req: Request, res: Response, next: NextFunction) => {
    const contractId = req.params.contractId;
    return Contract.findById(contractId)
        .then((contract) => (contract ? res.status(200).json({ contract }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Contract.find()
        .then((contract) => res.status(200).json({ contract }))
        .catch((error) => res.status(500).json({ error }));
};
const update = (req: Request, res: Response, next: NextFunction) => {
    const contractId = req.params.contractId;
    return Contract.findById(contractId)
        .then((contract) => {
            if (contract) {
                contract.set(req.body);
                return contract
                    .save()
                    .then((contract) => res.status(201).json({ contract }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const destroy = (req: Request, res: Response, next: NextFunction) => {
    const contractId = req.params.contractId;
    return Contract.findByIdAndDelete(contractId)
        .then((contract) => (contract ? res.status(200).json({ message: 'deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { create, update, destroy, readAll, read };
