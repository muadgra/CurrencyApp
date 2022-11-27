import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';



export type PartDocument = Part & Document;


@Schema()
export class Part{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Part.name })
    code: string;

    @Prop()
    name: string;

    @Prop({ default: Date.now })
    dateOfProduction: Date;

    @Prop({ default: Date.now })
    dateOfUpdate: Date;

    @Prop()
    belongsTo: string;

    @Prop()
    location: string;

}

export const PartSchema = SchemaFactory.createForClass(Part);


