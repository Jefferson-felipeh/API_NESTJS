import { Injectable, NotFoundException } from '@nestjs/common';
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

    updateProfile = async (id: number, dataUpdateProfile:ProfileTDO):Promise<any> => {
        try{
            if(!id){
                throw new NotFoundException(`dados com o id ${id} não encontrado!`);
            }

            return await this.profileRepository.update(id, dataUpdateProfile);
            
        }catch(error){
            console.log(error)
        }
    }
}

/*
.A propriedade save() do typeorm é frequentemente utilizada para inserir um novo registro no banco de dados;
.Porém ele também pode atualizar registros existentes, mas apenas se o objeto já tiver um identificador único, 
como um id, que corresponda a um resgistro existente no banco de dados;
.Por exemplo, eu posso usar a propriedade findOne() para buscar um registro especifico do banco de dados especificando um identificador único,
caso encontre, irei mesclar esse registro com o novo registro que desejo atualizar, e a propriedade save() irá atualizar o registro,
pois o objeto resultante possue o identificador, irá fazer uma troca do objeto antigo pelo objeto novo, isso significa que a propriedade save 
esta tendo a funcionalidade de atualizar registro, pois o registro esta no banco e possue um identificador único;
.Porém não é recomendável usar o save() para atualizar registros no banco de dados, pois se o objeto não contiver o identificador, 
o save() do typeorm pode interpreta-lo como um novo registro e tentar cria-lo;
.Mas a melhor opção é utilizar o update para atualização do registro com base em um identificador único, evitando usar o save que pode duplicar registros.
EX: 
  updateProfile = async (id: number, dataUpdateProfile:ProfileTDO):Promise<any> => {
        try{
            const dataProfile = await this.profileRepository.findOne({where: {id}});

            if(!id){
                throw new NotFoundException(`dados com o id ${id} não encontrado!`);
            }

            return await this.profileRepository.update(id, dataUpdateProfile);
            
        }catch(error){
            console.log(error)
        }
    }
*/
