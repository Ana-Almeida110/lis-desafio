import { 
    Entity, PrimaryGeneratedColumn, Column, OneToMany
} from "typeorm";
import { User } from "./User";

@Entity("user_profile")
export class UserProfile {
    
    @PrimaryGeneratedColumn()
    id_userprofile!: number;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "boolean", default: true })
    active!: boolean;

    @OneToMany(() => User, user => user.userProfile)
    users!: User[];

}