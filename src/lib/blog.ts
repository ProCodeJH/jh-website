export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image?: string;
  content: string;
}

const posts: BlogPost[] = [
  {
    slug: "why-ux-matters-in-fintech",
    title: "Why UX Matters More Than Ever in Fintech",
    excerpt:
      "금융 서비스에서 사용자 경험이 비즈니스 성과에 미치는 실질적인 영향을 데이터로 분석합니다.",
    date: "2026-03-20",
    category: "Insight",
    readTime: "5 min",
    content: `
## 금융의 디지털 전환, 그 중심에 UX가 있다

핀테크 산업이 폭발적으로 성장하면서, 사용자 경험은 더 이상 '있으면 좋은 것'이 아닌 비즈니스의 핵심 경쟁력이 되었습니다.

### 데이터가 말하는 현실

- 모바일 뱅킹 앱의 **73%**가 첫 사용 3일 내 이탈
- UX 개선 후 전환율 **평균 200% 증가** (McKinsey, 2025)
- 금융 앱 사용자의 **88%**가 "복잡한 인터페이스" 때문에 경쟁사로 이동

### 우리의 접근

JH는 금융 도메인의 복잡성을 이해하면서도, 사용자가 직관적으로 이해할 수 있는 인터페이스를 설계합니다. 규제 준수와 사용성, 두 마리 토끼를 잡는 것이 우리의 전문입니다.
    `,
  },
  {
    slug: "design-system-roi",
    title: "디자인 시스템의 ROI: 숫자로 증명하다",
    excerpt:
      "디자인 시스템 도입 전후의 개발 속도, 일관성, 유지보수 비용 변화를 실제 프로젝트 데이터로 비교합니다.",
    date: "2026-03-15",
    category: "Column",
    readTime: "7 min",
    content: `
## 디자인 시스템은 투자다

"디자인 시스템을 왜 만들어야 하나요?"라는 질문에 대한 답은 단순합니다 — 돈을 절약하기 때문입니다.

### 도입 전 vs 후

| 지표 | 도입 전 | 도입 후 | 변화 |
|---|---|---|---|
| 컴포넌트 개발 시간 | 4시간 | 30분 | -87% |
| 디자인-개발 핸드오프 | 2일 | 4시간 | -75% |
| UI 버그 발생률 | 주 15건 | 주 2건 | -87% |
| 신규 페이지 제작 | 5일 | 1일 | -80% |

### 핵심 교훈

디자인 시스템은 초기 투자가 필요하지만, 프로젝트 3개째부터 ROI가 폭발합니다.
    `,
  },
  {
    slug: "behind-the-scenes-ecommerce",
    title: "프로젝트 비하인드: 이커머스 플랫폼 리디자인",
    excerpt:
      "6개월간의 이커머스 플랫폼 리디자인 프로젝트. 실패와 성공, 그리고 배운 것들.",
    date: "2026-03-10",
    category: "Behind",
    readTime: "10 min",
    content: `
## 시작은 단순했다

"쇼핑몰 리뉴얼 해주세요." 클라이언트의 첫 요청은 이렇게 단순했습니다. 하지만 실제 문제는 표면 아래에 있었습니다.

### 발견한 진짜 문제

1. **결제 퍼널 이탈률 78%** — UI가 아니라 결제 프로세스 자체가 문제
2. **모바일 전환율 데스크톱의 1/5** — 반응형이 아닌 모바일 퍼스트가 답
3. **검색 0건 비율 34%** — 검색 엔진 자체를 교체해야 했음

### 결과

6개월 후, 전환율 340% 증가. 매출 2.1배. 하지만 가장 큰 성과는 클라이언트가 "데이터를 보는 방법"을 배운 것입니다.
    `,
  },
  {
    slug: "our-philosophy",
    title: "JH의 운영 철학: 과정이 결과를 만든다",
    excerpt:
      "Lead process, prove results. 우리의 슬로건이 단순한 문구가 아닌 이유.",
    date: "2026-03-05",
    category: "Philosophy",
    readTime: "4 min",
    content: `
## 과정이 없는 결과는 우연이다

많은 에이전시가 "결과"를 약속합니다. 하지만 결과는 통제할 수 없습니다. 통제할 수 있는 것은 오직 과정뿐입니다.

### 우리의 원칙

1. **Spec-first** — 코드 한 줄 전에 기획이 완료되어야 한다
2. **Quality Gate** — 깨진 빌드는 출시하지 않는다
3. **PDCA** — Plan → Do → Check → Act, 매 스프린트마다
4. **Same mistake twice = incompetence** — 같은 실수는 두 번 하지 않는다

이 원칙들이 "Lead process, prove results"의 실체입니다.
    `,
  },
];

export function getBlogPosts(): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
