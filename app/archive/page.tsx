import Link from "next/link";
import { getReviewsByLanguage, type ReviewMeta } from "@/lib/reviews";
import styles from "./archive.module.css";

export const metadata = {
  title: "论文档案 | 实验室论文阅读档案",
  description: "实验室每周论文阅读与评述记录。",
};

export default function ArchivePage() {
  const zhReviews = getReviewsByLanguage("zh");
  const enReviews = getReviewsByLanguage("en");

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <p className={styles.eyebrow}>BUAA-IEIR Paper Review Archive</p>
        <h1 className={styles.title}>论文评述周报</h1>
        <p className={styles.subtitle}>
          按语言整理的论文阅读记录。每篇评述包含论文摘要、方法概述、优缺点与讨论问题。
        </p>
      </section>

      <section className={styles.archiveGrid}>
        <LanguageColumn
          title="中文评述"
          subtitle="Chinese reviews"
          language="zh"
          reviews={zhReviews}
        />

        <LanguageColumn
          title="English Reviews"
          subtitle="英文评述"
          language="en"
          reviews={enReviews}
        />
      </section>
    </main>
  );
}

function LanguageColumn({
  title,
  subtitle,
  language,
  reviews,
}: {
  title: string;
  subtitle: string;
  language: "zh" | "en";
  reviews: ReviewMeta[];
}) {
  return (
    <section className={styles.column}>
      <div className={styles.columnHeader}>
        <div>
          <p className={styles.columnEyebrow}>{subtitle}</p>
          <h2 className={styles.columnTitle}>{title}</h2>
        </div>

        <span className={styles.count}>{reviews.length}</span>
      </div>

      {reviews.length === 0 ? (
        <p className={styles.empty}>
          {language === "zh" ? "暂无中文评述。" : "No English reviews yet."}
        </p>
      ) : (
        <div className={styles.reviewList}>
          {reviews.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}

function ReviewCard({ review }: { review: ReviewMeta }) {
  return (
    <article className={styles.card}>
      {review.cover_image ? (
        <Link href={`/archive/${review.slug}`} className={styles.thumbLink}>
          <img
            src={review.cover_image}
            alt={review.title}
            className={styles.thumbnail}
          />
        </Link>
      ) : (
        <Link href={`/archive/${review.slug}`} className={styles.placeholderThumb}>
          {review.language === "zh" ? "中" : "EN"}
        </Link>
      )}

      <div className={styles.cardBody}>
        <div className={styles.metaRow}>
          <span>{formatDate(review.date, review.language)}</span>
          <span className={styles.dot}>·</span>
          {review.presenter_slug ? (
            <Link
              href={`/members/${review.presenter_slug}`}
              className={styles.presenterLink}
            >
              {review.presenter}
            </Link>
          ) : (
            <span>{review.presenter}</span>
          )}
        </div>

        <h3 className={styles.cardTitle}>
          <Link href={`/archive/${review.slug}`} className={styles.cardLink}>
            {review.title}
          </Link>
        </h3>

        {review.paper_title && (
          <p className={styles.paperTitle}>{review.paper_title}</p>
        )}

        {review.summary && <p className={styles.summary}>{review.summary}</p>}

        {review.tags && review.tags.length > 0 && (
          <div className={styles.tags}>
            {review.tags.slice(0, 4).map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}

            {review.tags.length > 4 && (
              <span className={styles.moreTag}>+{review.tags.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function formatDate(date: string, language: "zh" | "en") {
  if (!date) return language === "zh" ? "日期未注明" : "Undated";

  return new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}