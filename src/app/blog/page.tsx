import { BlogList } from "@/components/blog/blog-list";

export const metadata = {
  title: "Blog | JH",
  description: "인사이트, 칼럼, 프로젝트 비하인드, 운영 철학",
};

export default function BlogPage() {
  return <BlogList />;
}
