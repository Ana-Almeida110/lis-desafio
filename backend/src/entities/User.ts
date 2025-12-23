import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserProfile } from "./UserProfile";

export enum UserRole {
  ADMIN = "ADMIN",
  COLABORADOR = "COLABORADOR",
  APROVADOR = "APROVADOR"
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true})
  email!: string;

  @Column()
  pass!: string;

  @Column()
  id_userprofile!: number;

  @ManyToOne(() => UserProfile, profile => profile.users)
  @JoinColumn({ name: "id_userprofile" })
  userProfile!: UserProfile;

  @Column({ 
    type: "text", 
    default: UserRole.COLABORADOR 
  })
  role!: UserRole;
}