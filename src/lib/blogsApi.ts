import apiServiceCall from "@/services/service";

export async function fetchBlogsData(params: any = {}) {
  return await apiServiceCall({
    url: `/blog/?${new URLSearchParams(params).toString()}`,
    method: "GET",
  });
}

export async function fetchBlogBySlug(slug: string) {
  return await apiServiceCall({
    url: `/blog/${slug}/`,
    method: "GET",
  });
}