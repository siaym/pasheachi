import { redirect } from "next/navigation";

export default function SupportersRedirectPage() {
  redirect("/dashboard/donors");
}
