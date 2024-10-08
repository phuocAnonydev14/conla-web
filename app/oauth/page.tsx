"use client";
import { ReloadIcon } from "@radix-ui/react-icons";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { social } from "../utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { extId } from "@/lib/config";
import { UserSocialType } from "aa-conla-social-sdk/dist/src/types/social.type";

interface DataSendExt {
  idToken: string;
  accessToken: string;
  user?: UserSocialType;
}

export default function OauthPage() {
  const searchParams = useSearchParams();
  const codeParams = searchParams.get("code");
  const [user, setUser] = useState<any>();
  const [isShowModal, setIsShowModal] = useState(false);
  const [generating, setGenerating] = useState(false);
  let isRequested = 0;

  const handleSendToExt = async (params: DataSendExt) => {
    try {
      console.log("start cakking");
      chrome.runtime.sendMessage(extId, params, (response) => {
        console.log(response);
      });
      console.log("call ext success")
    } catch (e) {
      console.log(e);
    }
  };

  const handleGeneratePrivateKey = async () => {
    try {
      const privateKey = await social.user?.generatePrivateKey();
      setIsShowModal(false);
      setGenerating(true);
      await handleSendToExt({
        ...user,
        privateKey,
      } as DataSendExt);
    } catch (e: any) {
      console.log(e);
      toast(e?.message || "Server error", {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleFetchUser = async (codeParams: string) => {
    try {
      const userRes = await social.user?.getInformation(codeParams);
      setUser(userRes);

      await handleSendToExt({
        ...userRes,
      } as DataSendExt);

      // handle close when done
      await social.auth.logout();
      window.opener = null;
      window.open("", "_self");
      window.close();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (codeParams) {
      isRequested++;
    }
  }, [codeParams]);

  useEffect(() => {
    if (isRequested === 1) {
      handleFetchUser(codeParams || "");
    }
  }, [isRequested]);

  console.log(user);

  return (
    <div>
    </div>
  );
}
