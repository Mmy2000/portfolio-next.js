import apiServiceCall from "@/services/service";

export async function fetchSiteInfoData() {
  return await apiServiceCall({
    url: "/setting/info/",
    method: "GET",
  });
}