import { IsNotEmpty, IsNumber } from "class-validator";

export class IdProfileTDO{
    @IsNumber()
    @IsNotEmpty({message: 'Campo Id obrigatório!'})
    id: number
}