import { Schema, model, models, Document } from "mongoose";
import { IPoll } from "./poll.model";

export interface IReport extends Document {
    _id: string
    nofReports: number,
    poll: IPoll
}

const ReportSchema = new Schema({
    nofReports: { type: Number },
    poll: { type: Schema.Types.ObjectId, ref: 'Poll' }
})

const Report = models.Report || model('Report', ReportSchema);

export default Report;