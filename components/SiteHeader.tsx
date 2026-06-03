"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./SiteHeader.module.css";
import { withBasePath } from "@/lib/paths";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 48);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <Image
            src={withBasePath("/bu-logo.svg")}
            alt="实验室标志"
            width={42}
            height={42}
            className={styles.logo}
            priority
          />

          <div className={styles.brandText}>
            <div className={styles.siteTitle}>北京航空航天大学具身智能研究院 论文阅读档案</div>
            <div className={styles.siteSubtitle}>Paper-Review Archive for BUAA Institute of Embodied Intelligent Robotics</div>
          </div>
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            首页
          </Link>
          <Link href="/archive" className={styles.navLink}>
            论文档案
          </Link>
          <Link href="/members" className={styles.navLink}>
            成员
          </Link>
        </nav>
      </div>
    </header>
  );
}
