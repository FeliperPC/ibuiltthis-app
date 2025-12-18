"use client"

import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { BuildingIcon } from "lucide-react";

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
    </UserButton>
  );
}
