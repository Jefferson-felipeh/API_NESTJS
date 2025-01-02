import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100})
    name?: string

    @Column()
    email?: string

    @CreateDateColumn()
    createdOn?: Date

    @UpdateDateColumn()
    updatedOn?: Date
}

/*
-> A entidade no typeorm funciona como um modelo usada para mapear e manipular dados no banco de dados.
Ela define como os dados são mapeados e manipulados, e pode ser usada para gerar a estrutura do banco de dados, ou usada para interagir com eles.

-> Uma entidade no typeorm é uma classe que representa uma tabela do banco de dados, 
e cada propriedade da classe representa um campo ou uma coluna do banco de dados.

-> As anotações da classe, como @Entity(), @Column(), e etc, são usadas para definir como o typeorm deve mapear essa classe e criar uma tabela no banco de dados.
*/