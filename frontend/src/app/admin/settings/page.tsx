"use client";

import SettingsView from "@/components/admin/SettingsView";

export default function SettingsPage() {
  return (
    <>
      <div className="relative z-10">
        <SettingsView teams={[]} logs={[]} />
      </div>
    </>
  );
}
