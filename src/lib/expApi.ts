import apiServiceCall from "@/services/service";

export async function fetchExpData() {
  return await apiServiceCall({
    url: "/about/professional_experience/",
    method: "GET",
  });
}
