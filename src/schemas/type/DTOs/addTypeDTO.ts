import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AddTypeDTO{
    @Field()
    name: string;
    @Field()
    generation: string;
}