export interface User {
   id?: number;
   name: string;
   telegramId: string;
   username: string;
   premium: boolean;
}

// From telegram data
export interface UserData {
   id: number;
   first_name: string;
   last_name: string;
   username: string;
   language_code: string;
   is_premium?: boolean;
}
