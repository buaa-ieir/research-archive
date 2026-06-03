import Link from "next/link";
import { getReviewsByLanguage, type ReviewMeta } from "@/lib/reviews";
import styles from "./page.module.css";

export default function HomePage() {
  const zhReviews = getReviewsByLanguage("zh").slice(0, 3);
  const enReviews = getReviewsByLanguage("en").slice(0, 3);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Paper-Review Archive for BUAA Institute of Embodied Intelligent Robotics</p>
        <h1 className={styles.title}>北航具身智能研究院 论文阅读档案</h1>
        <p className={styles.subtitle}>
          本站用于整理研究院成员发布的论文评述，便于后续检索、回顾和延伸研究。
        </p>

        <Link href="/archive" className={styles.primaryLink}>
          浏览全部论文评述 →
        </Link>
      </section>

      <ReviewSection
        title="最近中文评述"
        archiveLabel="查看中文档案"
        reviews={zhReviews}
      />

      <ReviewSection
        title="Recent English Reviews"
        archiveLabel="View English archive"
        reviews={enReviews}
      />
    </main>
  );
}

function ReviewSection({
  title,
  archiveLabel,
  reviews,
}: {
  title: string;
  archiveLabel: string;
  reviews: ReviewMeta[];
}) {
  return (
    <section className={styles.reviewSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <Link href="/archive" className={styles.secondaryLink}>
          {archiveLabel}
        </Link>
      </div>

      {reviews.length === 0 ? (
        <p className={styles.empty}>暂无评述。</p>
      ) : (
        <div className={styles.grid}>
          {reviews.map((review) => (
            <article key={review.slug} className={styles.card}>
              {review.cover_image && (
                <img
                  src={review.cover_image}
                  alt={review.title}
                  className={styles.coverImage}
                />
              )}

              <p className={styles.meta}>
                {formatDate(review.date, review.language)} ·{" "}
                {review.presenter_slug ? (
                  <Link
                    href={`/members/${review.presenter_slug}`}
                    className={styles.presenterLink}
                  >
                    {review.presenter}
                  </Link>
                ) : (
                  review.presenter
                )}
              </p>

              <h3 className={styles.cardTitle}>
                <Link href={`/archive/${review.slug}`} className={styles.cardLink}>
                  {review.title}
                </Link>
              </h3>

              {review.summary && (
                <p className={styles.summary}>{review.summary}</p>
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
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function formatDate(date: string, language: "zh" | "en") {
  if (!date) return language === "zh" ? "日期未注明" : "Undated";

  return new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}