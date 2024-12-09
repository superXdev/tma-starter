import { UserRepository } from "../repositories/userRepository";
import { User as UserModel } from "@prisma/client";
import path from "path";
import https from "https";
import fs from "fs";
import { Telegraf } from "telegraf";

export class UserService {
   private userRepository: UserRepository;

   constructor(userRepository: UserRepository) {
      this.userRepository = userRepository;
   }

   async createUser(
      telegramId: string,
      name: string,
      username: string,
      isPremium: boolean,
      photoUrl: string,
      reff: string
   ): Promise<UserModel | any> {
      const exists = await this.userRepository.findById(telegramId);
      if (!exists) {
         const user = await this.userRepository.create(
            {
               telegramId,
               name,
               username,
               premium: isPremium,
               photo_url: photoUrl,
            },
            reff
         );

         if (user == null) {
            return { message: "Something went wrong" };
         }

         this.fetchAvatar(parseInt(telegramId));
      } else {
         await this.userRepository.updateById(telegramId, { name, username });
      }

      return { message: "OK" };
   }

   async getRefferals(telegramId: number) {
      const result = await this.userRepository.findById(telegramId.toString());
      const referrals = await this.userRepository.findRefferalsById(
         telegramId.toString()
      );
      const t_premium = referrals.filter((val) => val.isPremium).length;

      return {
         code: result?.reffcode,
         referrals: referrals.slice(0, 4),
         t_premium,
         t_npremium: referrals.length - t_premium,
      };
   }

   async fetchAvatar(telegramId: number): Promise<void> {
      try {
         if (!process.env.BOT_KEY) {
            throw Error("No bot token");
         }

         const bot = new Telegraf(process.env.BOT_KEY);

         const profilePhotos = await bot.telegram.getUserProfilePhotos(
            telegramId
         );

         if (!profilePhotos.total_count) {
            throw Error("No profile photos found.");
         }

         // Step 2: Get the file ID of the first profile photo
         const fileId = profilePhotos.photos[0][0].file_id; // First photo in the list

         // Step 3: Get the file URL
         const file = await bot.telegram.getFile(fileId);
         const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_KEY}/${file.file_path}`;

         this.downloadAvatar(fileUrl, telegramId);
      } catch (err: any) {
         console.log(err?.message);
      }
   }

   downloadAvatar(fileUrl: string, telegramId: number): void {
      const img = fs.createWriteStream(
         path.join(
            __dirname,
            "../../",
            "public",
            "avatars",
            `${telegramId}.jpg`
         )
      );
      https.get(fileUrl, function (response) {
         response.pipe(img);

         img.on("finish", () => {
            img.close();
         });
      });
   }
}
