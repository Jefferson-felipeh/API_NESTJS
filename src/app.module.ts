import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileModule } from './modules/profile/profile.module';
import { Profile } from './modules/profile/entity/profile';

@Module({
  imports: [
    ProfileModule,//Importabdo o módulo do profile;
    
    ConfigModule.forRoot(), // Carrega variáveis do arquivo .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<'sqlite'>('DATABASE_TYPE'),//Determina o tipo de banco de dados a ser utilizado;
        database: 'database.sqlite',//Arquivo do banco de dados;
        entities: [Profile],//Definindo as entidades dos modulos, além de definir nos módulos específicos, tenho que informa-los aqui;
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
