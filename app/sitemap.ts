import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/ranking`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
    },
  ];
}
