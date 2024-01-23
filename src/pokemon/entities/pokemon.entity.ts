import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {
    // id: string; //dada por mongo
    @Prop({
        unique:true,
        index:true
    })
    name: string;

    @Prop({
        unique:true,
        index:true
    })
    nr: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
