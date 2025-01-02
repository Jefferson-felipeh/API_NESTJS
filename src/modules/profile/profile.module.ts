import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entity/profile';

@Module({
  imports: [
    //Eu preciso informar a entidade como uma feature no seu modulo, para que ela esteja disponível em todo o modulo profile_
    TypeOrmModule.forFeature([Profile])
  ],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
