import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Person from '../models/Person';

const create = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    console.log(name);
    const person = new Person({
        _id: new mongoose.Types.ObjectId(),
        name
    });
    return person
        .save()
        .then((person) => res.status(201).json({ person }))
        .catch((error) => res.status(500).json({ error }));
};
const read = (req: Request, res: Response, next: NextFunction) => {
    const personId = req.params.personId;
    return Person.findById(personId)
        .then((person) => (person ? res.status(200).json({ person }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Person.find()
        .then((person) => res.status(200).json({ person }))
        .catch((error) => res.status(500).json({ error }));
};
const update = (req: Request, res: Response, next: NextFunction) => {
    const personId = req.params.personId;
    return Person.findById(personId)
        .then((person) => {
            if (person) {
                person.set(req.body);
                return person
                    .save()
                    .then((person) => res.status(201).json({ person }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const destroy = (req: Request, res: Response, next: NextFunction) => {
    const personId = req.params.personId;
    return Person.findByIdAndDelete(personId)
        .then((person) => (person ? res.status(200).json({ message: 'deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { create, update, destroy, readAll, read };
