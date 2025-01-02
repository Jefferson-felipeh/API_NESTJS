import { Body, Controller,Delete,Get, Param, Post, Put, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileTDO } from './dto/ProfileDTO';
import { Profile } from './entity/profile';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IdProfileTDO } from './dto/IdProfileTDO';

@Controller('profile')
export class ProfileController {
    constructor(private service:ProfileService){}

    @Get('list')
    async getAll(){
        return await this.service.getAll();
    }

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
    async updateProfile(@Param('id') idBody: IdProfileTDO, @Body() dataBodyProfile:ProfileTDO):Promise<Profile>{
        return await this.service.updateProfile(idBody, dataBodyProfile);
    }
}
