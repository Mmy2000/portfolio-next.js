import apiServiceCall from "@/services/service";

export async function fetchAboutMeData() {
  return await apiServiceCall({
    url: "/about/about_me/",
    method: "GET",
  });
}
