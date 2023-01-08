import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@ObjectType()
export class TypeModel{

    @Field()
    code: number;
    
    @Field()
    name: string;

    @Field()
    generation: string;
}