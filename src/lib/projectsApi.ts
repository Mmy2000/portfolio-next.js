import apiServiceCall from "@/services/service";

export async function fetchProjectsData(params: any = {}) {
  return await apiServiceCall({
    url: `/projects/?${new URLSearchParams(params).toString()}`,
    method: "GET",
  });
}


export async function fetchProjectBySlug(slug: string) {
  return await apiServiceCall({
    url: `/projects/${slug}/`,
    method: "GET",
  });
}