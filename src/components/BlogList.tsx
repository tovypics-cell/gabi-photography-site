"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PlaceholderImage from "@/components/PlaceholderImage";
import ScrollReveal from "@/components/ScrollReveal";
import { formatDate } from "@/lib/blog-data";
import type { BlogPost } from "@/lib/blog-data";

interface BlogListProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogList({ posts, categories }: BlogListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  return (
    <>
      {/* Category filter */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-sm font-medium uppercase tracking-wider pb-1 px-2 transition-colors ${
              activeCategory === null
                ? "text-charcoal border-b-2 border-sage"
                : "text-charcoal-light hover:text-charcoal"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-medium uppercase tracking-wider pb-1 px-2 transition-colors ${
                activeCategory === cat
                  ? "text-charcoal border-b-2 border-sage"
                  : "text-charcoal-light hover:text-charcoal"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Post grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, index) => {
          // The first row is on screen at load: no fade-in and no lazy loading, so the main
          // image shows right away (Lighthouse measured /blog's main image at 6.4 s on mobile before this).
          const aboveFold = index < 3;
          const card = (
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden mb-4">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.imageAlt ?? post.title}
                    fill
                    priority={aboveFold}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={80}
                  />
                ) : (
                  <PlaceholderImage
                    alt={post.title}
                    className="absolute inset-0 w-full h-full"
                    label="Blog"
                  />
                )}
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-sage mb-2">
                {post.category} · {formatDate(post.date)}
              </p>
              <h2 className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl text-charcoal mb-2 group-hover:text-sage-dark transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-charcoal-light leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          );
          return aboveFold ? (
            <div key={post.slug}>{card}</div>
          ) : (
            <ScrollReveal key={post.slug} animation="fade-up" delay={(index % 3) * 100}>
              {card}
            </ScrollReveal>
          );
        })}
      </div>
    </>
  );
}
