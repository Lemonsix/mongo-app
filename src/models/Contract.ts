import mongoose, { Document, Schema } from 'mongoose';
export interface IContract {
    name: string;
}

export interface IContractModel extends IContract, Document {}

const ContractSchema: Schema = new Schema(
    {
        person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
        service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
        address: { type: String }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IContractModel>('contracts', ContractSchema);
