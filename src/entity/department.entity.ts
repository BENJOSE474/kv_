import { Column,Entity,OneToMany } from "typeorm";
import AbstractEntity from "./abstarct_entity";
import EmployeeDepartment from "./employeeDepartment.entity";

@Entity()

    class Department extends AbstractEntity{
        @Column()
        "name":string;


        @OneToMany(()=>EmployeeDepartment,(employeeDepartment)=>employeeDepartment.department)
        employeeDepartments:EmployeeDepartment[]
    }
    export  default Department
