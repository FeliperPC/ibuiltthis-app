"use client";

import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { ArrowRightIcon, Building2Icon, BuildingIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function CustomUserButton() {
  return (
    <UserButton>
      <UserButton.UserProfilePage
        label="Organizations"
        labelIcon={<BuildingIcon className="size-4" />}
        url="/organizations"
      >
        <div className="p-4">
          <h2>Manage Organization</h2>
          <OrganizationSwitcher
            hidePersonal={true}
            afterCreateOrganizationUrl={"/submit"}
            appearance={{ elements: { rootBox: "w-full" } }}
          />
        </div>
      </UserButton.UserProfilePage>
      <UserButton.UserProfilePage
        label="Admin"
        labelIcon={<Building2Icon className="size-4" />}
        url="/admin"
      >
        <div className="p-4 flex gap-4 flex-col">
          <h2>Admin Panel</h2>
          <Link href="/admin" className="w-full justify-start">
            <Button className="w-full justify-start">Go to Admin Panel <ArrowRightIcon className="size-4"/></Button>
          </Link>
        </div>
      </UserButton.UserProfilePage>
    </UserButton>
  );
}
