import Image from "next/image";
import Link from "next/link";
import { getAllMembers } from "@/lib/members";
import styles from "./members.module.css";

export const metadata = {
  title: "成员 | 实验室论文阅读档案",
  description: "实验室成员介绍与论文评述集合。",
};

export default function MembersPage() {
  const members = getAllMembers();

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <p className={styles.eyebrow}>BUAA-IEIR Lab Members</p>
        <h1 className={styles.title}>北航具身智能研究院成员</h1>
        <p className={styles.subtitle}>
          浏览研究院成员简介，以及每位成员提交过的论文评述。
        </p>
      </section>

      <section className={styles.grid}>
        {members.map((member) => (
          <Link
            key={member.slug}
            href={`/members/${member.slug}`}
            className={styles.card}
          >
            <div className={styles.photoWrap}>
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={120}
                  height={120}
                  className={styles.photo}
                />
              ) : (
                <div className={styles.placeholder}>
                  {member.name.slice(0, 1)}
                </div>
              )}
            </div>

            <div>
              <h2 className={styles.name}>{member.name}</h2>
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
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}