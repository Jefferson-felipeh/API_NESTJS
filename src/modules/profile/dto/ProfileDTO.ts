import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'

export class ProfileTDO{
    @IsString({message: 'Campo name é necessário!'})
    @IsNotEmpty({message: 'Campor name obrigatório!'})
    @Length(5,50)
    name: string

    @IsEmail()
    @IsNotEmpty({message: 'Campo email óbrigatório!'})
    email:string
};