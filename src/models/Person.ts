import mongoose, { Document, Schema } from 'mongoose';
export interface IPerson {
    name: string;
}

export interface IPersonModel extends IPerson, Document {}
const PersonSchema: Schema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IPersonModel>('persons', PersonSchema);
