import { Body, Controller,Get, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './entity/profile';

@Controller('profile')
export class ProfileController {
    constructor(private service:ProfileService){}

    @Get()
    async getAll(){
        return await this.service.getAll();
    }

    @Post('create')
    async create(@Body() bodyProfile:Profile):Promise<Profile>{
        return await this.service.create(bodyProfile);
    }
}
