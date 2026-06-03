import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import { getMemberBySlug, getMemberSlugs } from "@/lib/members";
import { getReviewsByPresenterSlug } from "@/lib/reviews";
import styles from "./member.module.css";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getMemberSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  try {
    const member = getMemberBySlug(slug);

    return {
      title: `${member.name} | 实验室成员`,
      description: member.description ?? "实验室成员主页。",
    };
  } catch {
    return {
      title: "成员未找到 | 实验室论文阅读档案",
    };
  }
}

export default async function MemberPage({ params }: PageProps) {
  const { slug } = await params;

  let member;

  try {
    member = getMemberBySlug(slug);
  } catch {
    notFound();
  }

  const reviews = getReviewsByPresenterSlug(member.slug);

  return (
    <main className={styles.page}>
      <div className={styles.backRow}>
        <Link href="/members" className={styles.backLink}>
          ← 返回成员列表
        </Link>
      </div>

      <section className={styles.profile}>
        <div className={styles.photoWrap}>
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              width={220}
              height={220}
              className={styles.photo}
              priority
            />
          ) : (
            <div className={styles.placeholder}>{member.name.slice(0, 1)}</div>
          )}
        </div>

        <div className={styles.profileText}>
          <p className={styles.eyebrow}>Lab Member</p>
          <h1 className={styles.name}>{member.name}</h1>

          {member.role && <p className={styles.role}>{member.role}</p>}

          {member.description && (
            <p className={styles.description}>{member.description}</p>
          )}

          {member.interests && member.interests.length > 0 && (
            <div className={styles.tags}>
              {member.interests.map((interest) => (
                <span key={interest} className={styles.tag}>
                  {interest}
                </span>
              ))}
            </div>
          )}

          {(member.email || member.website) && (
            <div className={styles.links}>
              {member.email && (
                <a href={`mailto:${member.email}`} className={styles.link}>
                  邮箱
                </a>
              )}

              {member.website && (
                <a
                  href={member.website}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  个人主页 ↗
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {member.content && (
        <section className={styles.bio}>
          <ReactMarkdown>{member.content}</ReactMarkdown>
        </section>
      )}

      <section className={styles.reviewsSection}>
        <h2 className={styles.sectionTitle}>提交过的论文评述</h2>

        {reviews.length === 0 ? (
          <p className={styles.empty}>暂无论文评述记录。</p>
        ) : (
          <div className={styles.reviewList}>
            {reviews.map((review) => (
              <article key={review.slug} className={styles.reviewCard}>
                <p className={styles.reviewMeta}>
                  {formatDate(review.date)}
                  {review.venue ? ` · ${review.venue}` : ""}
                  {review.year ? ` · ${review.year}` : ""}
                </p>

                <h3 className={styles.reviewTitle}>
                  <Link
                    href={`/archive/${review.slug}`}
                    className={styles.reviewLink}
                  >
                    {review.title}
                  </Link>
                </h3>

                {review.summary && (
                  <p className={styles.reviewSummary}>{review.summary}</p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
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