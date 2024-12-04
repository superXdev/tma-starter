import { Button } from "../../components/ui/button";
import { useToast } from "../../hooks/use-toast";

function Share({ reff }: { reff: string | null | undefined }) {
   const { toast } = useToast();
   const url = import.meta.env.VITE_BOT_URL;
   const text = "Join to us!";

   function forwardMessage() {
      if (!reff) return;
      window.location.href = `https://telegram.me/share/url?url=${url}?startapp=${reff}&text=${encodeURI(
         text
      )}`;
   }

   function copyLink() {
      if (!reff) return;
      navigator.clipboard.writeText(`${url}?startapp=${reff}`);
      toast({ description: "Link copied" });
   }

   return (
      <div className="fixed pr-8 bottom-0 w-full mb-20">
         <Button
            className="w-full bg-gradient-to-b from-blue-600 to-blue-950 mb-2"
            onClick={forwardMessage}
         >
            Send
         </Button>
         <Button
            className="w-full bg-gradient-to-b from-blue-600 to-blue-950"
            onClick={copyLink}
         >
            Copy Link
         </Button>
      </div>
   );
}

export default Share;
