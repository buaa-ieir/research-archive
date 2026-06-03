import fs from "fs";
import path from "path";
import matter from "gray-matter";

const MEMBERS_DIR = path.join(process.cwd(), "content", "members");

export type MemberMeta = {
  slug: string;
  name: string;
  role?: string;
  photo?: string;
  description?: string;
  email?: string;
  website?: string;
  interests?: string[];
};

export type Member = MemberMeta & {
  content: string;
};

function getMemberFileNames(): string[] {
  if (!fs.existsSync(MEMBERS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(MEMBERS_DIR)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

function fileNameToSlug(fileName: string): string {
  return fileName.replace(/\.mdx?$/, "");
}

function getMemberFilePath(slug: string): string | null {
  const mdPath = path.join(MEMBERS_DIR, `${slug}.md`);
  const mdxPath = path.join(MEMBERS_DIR, `${slug}.mdx`);

  if (fs.existsSync(mdPath)) return mdPath;
  if (fs.existsSync(mdxPath)) return mdxPath;

  return null;
}

export function getMemberSlugs(): string[] {
  return getMemberFileNames().map(fileNameToSlug);
}

export function getMemberBySlug(slug: string): Member {
  const filePath = getMemberFilePath(slug);

  if (!filePath) {
    throw new Error(`Member not found: ${slug}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    name: data.name ?? "未命名成员",
    role: data.role,
    photo: data.photo,
    description: data.description,
    email: data.email,
    website: data.website,
    interests: data.interests ?? [],
    content,
  };
}

export function getAllMembers(): MemberMeta[] {
  return getMemberSlugs()
    .map((slug) => {
      const { content, ...meta } = getMemberBySlug(slug);
      return meta;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}