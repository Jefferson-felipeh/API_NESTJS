import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entity/profile';

@Injectable()
export class ProfileService {
    constructor(
        //Estou injetando a entidade desse módulo para ser utilizada como tipagem das propriedades e métodos;
        //Observe que com o typeorm, importei a classe Repository, e estou injetando na classe atraves do constructor;
        @InjectRepository(Profile)
        //Essa propriedade será usada para manipulação com o banco de dados_
        private readonly profileRepository:Repository<Profile>
    ){}

    //Cada método que for criado, irá receber uma promise que será do tipo profile, que é a entidade do módulo_
    getAll = async ()=> {
        return await this.profileRepository.find();
    }

    create = async (bodyProfile: Partial<Profile>):Promise<Profile> => {
        const data = await this.profileRepository.create(bodyProfile);//Criando o banco de dados através da entidade;
        return this.profileRepository.save(data);//salvando as informações no banco de dados;
    }
}
