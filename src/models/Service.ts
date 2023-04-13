import mongoose, { Document, Schema } from 'mongoose';
export interface IService {
    name: string;
}

export interface IServiceModel extends IService, Document {}

const ServiceSchema: Schema = new Schema(
    {
        download: { type: Number },
        upload: { type: Number },
        type: { type: String, enum: ['FTTH', 'WIFI'] },
        price: { type: Number },
        currency: { type: String, enum: ['ARS', 'USD'] }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IServiceModel>('services', ServiceSchema);
