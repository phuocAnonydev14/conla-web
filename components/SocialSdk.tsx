"use client";

import { social } from "@/app/utils";
import { toast } from "sonner";

export const SocialSdk = () => {
  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <button
        onClick={async () => {
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
        }}
      >
        Login sdk
      </button>

      <button
        onClick={() => {
          social.auth.logout();
        }}
      >
        sign out
      </button>
    </div>
  );
};
