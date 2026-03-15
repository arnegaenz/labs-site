import type { Metadata } from "next";
import { MarketingSidebar } from "./MarketingSidebar";

export const metadata: Metadata = {
  title: "Marketing Engine — Skoobi Labs",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketingSidebar>{children}</MarketingSidebar>;
}
