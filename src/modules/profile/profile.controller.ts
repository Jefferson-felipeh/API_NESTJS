import { Body, Controller,Delete,Get, Param, Post, Put, Patch, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileTDO } from './dto/ProfileDTO';
import { Profile } from './entity/profile';
import { DeleteResult } from 'typeorm';

@Controller('profile')
export class ProfileController {
    constructor(private service:ProfileService){}

    //Rota de listagens de usuários_
    @Get('list')
    async getAll(){
        return await this.service.getAll();
    }

    //Rota responsável por criar um novo usuário_
    @Post('create')
    //Método que irá retorar uma promise do tipo Profile
    //A propriedade que captura os dados da requisição possue um tipo, e o método possue outro tipo;
    async create(@Body() bodyProfile:ProfileTDO):Promise<Profile>{
        //Propriedade que retorna um objeto que tem a tipagem/model do DTO ProfileDTO;
        //Essa propriedade será preenchida com os dados da requisição;
        return await this.service.create(bodyProfile);
    }

    @Delete('delete/:id')
    async remove(@Param('id') id:any):Promise<DeleteResult>{
        return await this.service.removeProfile(id);
    }

    @Put('update/:id')
    async updateProfile(@Param('id') idBody: number, @Body() dataBodyProfile:ProfileTDO):Promise<Profile>{
        return await this.service.updateProfile(idBody, dataBodyProfile);
    }

    // @Get('params')
    // async paramProfile(@Param() datasProfileParams: ProfileTDO){
    //     console.log(datasProfileParams);
    //     return await datasProfileParams;
    // }

    @Get('query')
    async getAlls(@Query() profilesQuery:ProfileTDO){
        console.log(profilesQuery)
        return await this.service.getAllProfiles(profilesQuery);
    }
}
