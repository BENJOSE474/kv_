import {
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import AbstractEntity from "./abstarct_entity";
import Employee from "./employee.entity";
import { Role } from "../utils/role.enum";
@Entity()
class Address extends AbstractEntity {
  @Column()
  line1: string;

  @Column()
  pincode: string;
  @OneToOne(() => Employee, (employee) => employee.address)
  @JoinColumn()
  employee: Employee;
  
  
}
export default Address;
