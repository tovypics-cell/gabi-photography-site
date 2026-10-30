import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog-data";
import { getAllShoots } from "@/lib/gallery-data";
import { locationPages } from "@/lib/locations";
import { serviceSlugs } from "@/lib/services";
import { site } from "@/lib/site";

// lastmod is only set where a page carries a real "last changed" date (blog posts, town pages).
// Stamping every page with the build time on each deploy teaches Google to ignore lastmod.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url;
  const posts = getAllPosts();
  const shoots = getAllShoots();

  const core: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/sessions`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/gallery`, changeFrequency: "weekly", priority: 0.8 },
    ...["family", "newborn", "milestone", "event"].map((c) => ({
      url: `${baseUrl}/gallery/${c}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { url: `${baseUrl}/testimonials`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/sessions/${slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const locationEntries: MetadataRoute.Sitemap = Object.values(locationPages).map((page) => ({
    url: `${baseUrl}/locations/${page.slug}`,
    lastModified: new Date(page.updated),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  const shootEntries: MetadataRoute.Sitemap = shoots.map((shoot) => ({
    url: `${baseUrl}/gallery/${shoot.category.toLowerCase()}/${shoot.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...core, ...serviceEntries, ...locationEntries, ...blogEntries, ...shootEntries];
}
