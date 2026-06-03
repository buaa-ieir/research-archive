import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import { getReviewBySlug, getReviewSlugs } from "@/lib/reviews";
import styles from "./review.module.css";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getReviewSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  try {
    const review = getReviewBySlug(slug);

    return {
      title: `${review.title} | 实验室论文阅读档案`,
      description:
        review.summary ??
        review.paper_title ??
        "实验室每周论文阅读评述。",
    };
  } catch {
    return {
      title: "评述未找到 | 实验室论文阅读档案",
    };
  }
}

export default async function ReviewPage({ params }: PageProps) {
  const { slug } = await params;

  let review;

  try {
    review = getReviewBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className={styles.backRow}>
        <Link href="/archive" className={styles.backLink}>
          ← 返回所有档案
        </Link>
      </div>

      <article>
        <header className={styles.header}>
          <p className={styles.eyebrow}>论文评述 // Paper Review</p>

          <h1 className={styles.title}>{review.title}</h1>

          {review.paper_title && (
            <p className={styles.paperTitle}>{review.paper_title}</p>
          )}

          <div className={styles.meta}>
            <span>{formatDate(review.date)}</span>
            <span> · </span>
            <span>{review.presenter}</span>

            {review.venue && (
              <>
                <span> · </span>
                <span>{review.venue}</span>
              </>
            )}

            {review.year && (
              <>
                <span> · </span>
                <span>{review.year}</span>
              </>
            )}
          </div>

          {review.authors && review.authors.length > 0 && (
            <p className={styles.authors}>
              <strong>作者 // Authors：</strong>
              {review.authors.join("，")}
            </p>
          )}

          {(review.paper_url || review.doi) && (
            <div className={styles.links}>
              {review.paper_url && (
                <a
                  href={review.paper_url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.externalLink}
                >
                  论文链接 // Link ↗
                </a>
              )}

              {review.doi && (
                <span className={styles.doi}>
                  DOI：<code>{review.doi}</code>
                </span>
              )}
            </div>
          )}

          {review.tags && review.tags.length > 0 && (
            <div className={styles.tags}>
              {review.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {review.summary && (
            <div className={styles.summaryBox}>
              <strong>摘要 // Abstract：</strong>
              {review.summary}
            </div>
          )}
        </header>

        <section className={styles.body}>
          <ReactMarkdown>{review.content}</ReactMarkdown>
        </section>
      </article>
    </main>
  );
}

function formatDate(date: string) {
  if (!date) return "日期未注明";

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}