import fs from "fs";
import path from "path";
import matter from "gray-matter";

const REVIEWS_DIR = path.join(process.cwd(), "content", "reviews");

function normalizeLanguage(value: unknown, slug: string): "zh" | "en" {
  if (value === "zh" || value === "en") {
    return value;
  }

  // Fallback for older files before language was added.
  if (slug.toLowerCase().endsWith("-en")) {
    return "en";
  }

  return "zh";
}

export type ReviewMeta = {
  slug: string;
  title: string;
  date: string;
  presenter: string;
  paper_title?: string;
  authors?: string[];
  venue?: string;
  year?: number;
  paper_url?: string;
  doi?: string;
  tags?: string[];
  summary?: string;
  presenter_slug: string;
  cover_image?: string;
  language: "zh" | "en";
};

export type Review = ReviewMeta & {
  content: string;
};

function getReviewFileNames(): string[] {
  if (!fs.existsSync(REVIEWS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(REVIEWS_DIR)
    .filter((file) => file.endsWith(".md"));
}

function fileNameToSlug(fileName: string): string {
  return fileName.replace(/\.md$/, "");
}

export function getReviewSlugs(): string[] {
  return getReviewFileNames().map(fileNameToSlug);
}

export function getReviewBySlug(slug: string): Review {
  const filePath = path.join(REVIEWS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Review not found: ${slug}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? "Untitled Review",
    date: data.date ?? "",
    presenter: data.presenter ?? "Unknown Presenter",
    paper_title: data.paper_title,
    authors: data.authors ?? [],
    venue: data.venue,
    year: data.year,
    paper_url: data.paper_url,
    doi: data.doi,
    tags: data.tags ?? [],
    summary: data.summary,
    content,
    presenter_slug: data.presenter_slug ?? "",
    cover_image: data.cover_image,
    language: normalizeLanguage(data.language, slug),
  };
}

export function getAllReviews(): ReviewMeta[] {
  return getReviewSlugs()
    .map((slug) => {
      const { content, ...meta } = getReviewBySlug(slug);
      return meta;
    })
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getReviewsByPresenterSlug(presenterSlug: string): ReviewMeta[] {
  return getAllReviews().filter(
    (review) => review.presenter_slug === presenterSlug
  );
}

export function getReviewsByLanguage(language: "zh" | "en"): ReviewMeta[] {
  return getAllReviews().filter((review) => review.language === language);
}