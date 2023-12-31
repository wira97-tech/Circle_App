import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Thread } from "./Thread";
import { Likes } from "./Likes";
import { Follows } from "./Follows";
import { Replies } from "./Replies";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profil_picture: string;

  @Column({ nullable: true })
  profil_description: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date;

  @OneToMany(() => Thread, (thread) => thread.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  threads: Thread[];

  @OneToMany(() => Likes, (likes) => likes.user)
  likes: Likes[];

  @OneToMany(() => Follows, (follows) => follows.followed)
  followers: Follows[];

  @OneToMany(() => Follows, (follows) => follows.follower)
  following: Follows[];

  @OneToMany(() => Replies, (replies) => replies.user)
  replies: Replies[];
}
