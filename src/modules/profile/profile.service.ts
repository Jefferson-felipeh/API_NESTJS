import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Profile } from './entity/profile';
import { ProfileModels } from 'src/models/profileModel';
import { IdProfileTDO } from './dto/IdProfileTDO';
import { ProfileTDO } from './dto/ProfileDTO';

@Injectable()
export class ProfileService implements ProfileModels<any>{
    constructor(
        //Estou injetando a entidade desse módulo para ser utilizada como tipagem das propriedades e métodos;
        //Observe que com o typeorm, importei a classe Repository, e estou injetando na classe atraves do constructor;
        @InjectRepository(Profile)
        //Essa propriedade será usada para manipulação com o banco de dados_
        private readonly profileRepository:Repository<Profile>
    ){}

    //Cada método que for criado, irá receber uma promise que será do tipo profile, que é a entidade do módulo_
    getAll = async ():Promise<Profile[]> => await this.profileRepository.find();

    getOne = async (id:any) => await this.profileRepository.findOne(id);

    create = async (bodyProfile: Partial<Profile>):Promise<Profile> => {
        const data = await this.profileRepository.create(bodyProfile);//Criando o banco de dados através da entidade;
        return this.profileRepository.save(data);//salvando as informações no banco de dados;
    }

    removeProfile = async (id: IdProfileTDO):Promise<DeleteResult> => await this.profileRepository.delete(id);

    updateProfile = async (id: IdProfileTDO, dataUpdateProfile:ProfileTDO):Promise<any> => await this.profileRepository.update(id , dataUpdateProfile);
}
