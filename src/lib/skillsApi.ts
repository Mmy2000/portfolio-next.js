import apiServiceCall from "@/services/service";

export async function fetchSkillsData() {
  return await apiServiceCall({
    url: "/about/my_skills/",
    method: "GET",
  });
}