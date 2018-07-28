import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 'firstName'})
    firstName: string;

    @Column({default: 'lastName'})
    lastName: string;

    @Column({default: 20})
    age: number;

    @Column({type: "varchar", length: 200, unique: true})
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async resetPassword() {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt, null);
        this.password = hash;
    }

    public async comparePassword(candidatePassword) {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
}
