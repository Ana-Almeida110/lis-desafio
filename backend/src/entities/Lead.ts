import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("lead")
export class Lead {
    
  @PrimaryGeneratedColumn()
  id_lead!: number;

  @CreateDateColumn()
  created_at!: Date;

  @Column()
  name_lead!: string;

  @Column()
  registration_number!: string;

  @Column("decimal")
  earnings!: number;

  @Column("decimal")
  loan_value!: number;

  @Column({default: false})
  loan_approved!: boolean;

  @Column({default: false})
  deleted!: boolean; 

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: "id_user_approve" })
  userApprove?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "id_user_register" })
  userRegister?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "id_user_delete" })
  userDelete?: User;
}