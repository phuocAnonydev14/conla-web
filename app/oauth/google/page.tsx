"use client";

import { social } from "@/app/utils";
import { useEffect } from "react";
import { toast } from "sonner";

export default function GoogleOauthPage() {
  useEffect(() => {
    (async () => {
      try {
        await social.auth.loginGoogle();
        console.log("logic success");
      } catch (e: any) {
        console.log(e);
        toast(e?.message || "User is already signed in", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      }
    })();
  });

  return <div></div>;
}
