import { User } from "./interfaces/IUserRepository";
import { PrismaClient, User as UserModel } from "@prisma/client";

export class UserRepository {
   private prisma: PrismaClient;

   constructor() {
      this.prisma = new PrismaClient();
   }

   async create(user: User, reff: string): Promise<UserModel | null> {
      try {
         const referred = await this.prisma.user.findFirst({
            where: {
               reffcode: reff,
            },
         });
         const result = await this.prisma.user.create({
            data: {
               name: user.name,
               telegramId: user.telegramId,
               username: user.username,
               isPremium: user.premium,
               reffcode: this.generateReffCode(10),
               referred: referred?.telegramId ?? "",
               photoUrl: user.photo_url ?? "",
            },
         });
         return result;
      } catch {
         return null;
      }
   }

   async findById(telegramId: string): Promise<UserModel | null> {
      const result = await this.prisma.user.findFirst({
         where: { telegramId },
      });
      return result;
   }

   async updateById(telegramId: string, data: any): Promise<UserModel | null> {
      const result = await this.prisma.user.update({
         where: { telegramId },
         data: {
            name: data.name,
            username: data.username,
         },
      });

      return result;
   }

   async findAll(): Promise<UserModel[] | null> {
      const results = await this.prisma.user.findMany();
      return results;
   }

   async findRefferalsById(telegramId: string): Promise<
      {
         name: string;
         isPremium: boolean;
      }[]
   > {
      const results = await this.prisma.user.findMany({
         where: {
            referred: telegramId,
         },
         select: {
            name: true,
            isPremium: true,
         },
         orderBy: {
            createdAt: "desc",
         },
      });

      return results;
   }

   // Hapus user berdasarkan ID
   async deleteById(id: number): Promise<boolean> {
      const result = await this.prisma.user.delete({ where: { id } });
      return result ? true : false;
   }

   generateReffCode(length = 8) {
      return Array.from({ length }, () =>
         Math.random().toString(36).charAt(2)
      ).join("");
   }
}
