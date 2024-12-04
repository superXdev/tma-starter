import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "@services/userService";
import { extractUserData, verifyTelegramWebAppData } from "@utils/telegram";
import { UserData } from "src/repositories/IUserRepository";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const createUser = async (
   req: Request,
   res: Response
): Promise<void> => {
   const { data, reff } = req.body;
   const isValid = verifyTelegramWebAppData(data);

   if (!isValid) {
      res.status(403).json({ message: "Forbidden action" });
      return;
   }

   const userData: UserData = extractUserData(data);
   const user = await userService.createUser(
      userData.id.toString(),
      userData.first_name,
      userData.username,
      userData.is_premium ?? false,
      reff
   );

   res.status(200).json(user);
};

export const getRefferals = async (
   req: Request,
   res: Response
): Promise<void> => {
   const { telegramId } = req.body;
   console.log(telegramId);

   if (!telegramId) {
      res.status(404).json({ message: "User not valid" });
      return;
   }

   const result = await userService.getRefferals(telegramId);
   res.json({
      message: "OK",
      result,
   });
};
