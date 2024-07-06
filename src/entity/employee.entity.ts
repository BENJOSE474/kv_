import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import AbstractEntity from "./abstarct_entity";
import Address from "./address.entity";
import { Role } from "../utils/role.enum";
@Entity()
class Employee extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  age: number;
  @Column({nullable:true})
  password:string;
  @Column({nullable:true})
  role:Role;

  @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
    onDelete: "CASCADE",
  })
  address: Address;
}
export default Employee;
