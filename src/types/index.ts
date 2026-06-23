export interface Bilingual {
  zh: string;
  en: string;
}

export interface Scenario {
  id: string;
  name: Bilingual;
  icon: string;
  color: string;
  description: Bilingual;
}

export interface Phrase {
  id: string;
  scenarioId: string;
  content: Bilingual;
  context: Bilingual;
  analysis: Bilingual;
  variants: { zh: string[]; en: string[] };
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface PracticeQuestion {
  id: string;
  type: 'choice' | 'fill-blank';
  scenarioId: string;
  scenario: Bilingual;
  question: Bilingual;
  options?: Bilingual[];
  answer: number | string;
  explanation: Bilingual;
}

// 用户资料（对应 Supabase profiles 表）
export interface UserProfile {
  id: string;
  display_name: string;
  avatar: string | null;
  role: 'user' | 'admin';
  created_at: string;
}

// 社区分享（对应 Supabase community_shares 表）
export interface CommunityShare {
  id: string;
  user_id: string;
  author?: string;        // 来自 join profiles，用于显示
  avatar?: string | null; // 来自 join profiles
  scenario: Bilingual;
  phrase: Bilingual;
  insight: Bilingual;
  likes_count: number;
  is_liked?: boolean;     // 当前用户是否已赞
  created_at: string;
}

// 评论（对应 Supabase comments 表）
export interface Comment {
  id: string;
  user_id: string;
  share_id: string;
  author?: string;
  avatar?: string | null;
  content: string;
  created_at: string;
}

export type Language = 'zh' | 'en';

// 认证相关
export interface AuthUser {
  id: string;
  email: string;
}
