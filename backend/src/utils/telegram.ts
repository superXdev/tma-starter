import crypto from "node:crypto";
import moment from "moment-timezone";

export const verifyTelegramWebAppData = (telegramInitData: string): boolean => {
   const TELEGRAM_BOT_TOKEN: string | undefined = process.env.BOT_KEY;
   const MAX_SIGNATURE_TIME: string | undefined =
      process.env.MAX_SIGNATURE_TIME;
   if (!TELEGRAM_BOT_TOKEN || !MAX_SIGNATURE_TIME) return false;

   const initData = new URLSearchParams(telegramInitData);
   const hash = initData.get("hash");
   const authDate: string | null = initData.get("auth_date");
   const dataToCheck: string[] = [];

   if (!authDate) return false;

   initData.sort();
   initData.forEach(
      (val, key) => key !== "hash" && dataToCheck.push(`${key}=${val}`)
   );

   const secret = crypto
      .createHmac("sha256", "WebAppData")
      .update(TELEGRAM_BOT_TOKEN)
      .digest();

   const _hash = crypto
      .createHmac("sha256", secret)
      .update(dataToCheck.join("\n"))
      .digest("hex");

   const timeDiff = moment
      .tz("Asia/Jakarta")
      .diff(
         moment.unix(parseInt(authDate) * 1000).tz("Asia/Jakarta"),
         "seconds"
      );

   return hash === _hash && timeDiff < parseInt(MAX_SIGNATURE_TIME);
};

export const extractUserData = (initData: string) => {
   const split = new URLSearchParams(initData);
   if (!split.get("user")) return;
   const user = JSON.parse(split.get("user") as string);
   return user;
};
