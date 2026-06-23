import type { Scenario } from '@/types';

export const scenarios: Scenario[] = [
  {
    id: 'workplace',
    name: { zh: '职场沟通', en: 'Workplace' },
    icon: 'Briefcase',
    color: 'hsl(var(--scenario-workplace))',
    description: { zh: '上下级沟通、同事协作、邮件话术', en: 'Boss, colleagues, email communication' },
  },
  {
    id: 'campus',
    name: { zh: '校园社交', en: 'Campus' },
    icon: 'GraduationCap',
    color: 'hsl(var(--scenario-campus))',
    description: { zh: '同学相处、社团活动、师生交流', en: 'Classmates, clubs, teacher interactions' },
  },
  {
    id: 'family',
    name: { zh: '家庭关系', en: 'Family' },
    icon: 'Home',
    color: 'hsl(var(--scenario-family))',
    description: { zh: '亲子沟通、长辈相处、家庭矛盾', en: 'Parents, elders, family conflicts' },
  },
  {
    id: 'romance',
    name: { zh: '情感恋爱', en: 'Romance' },
    icon: 'Heart',
    color: 'hsl(var(--scenario-romance))',
    description: { zh: '表白、吵架和好、日常甜蜜', en: 'Confess, reconcile, sweet moments' },
  },
  {
    id: 'daily',
    name: { zh: '日常社交', en: 'Daily Life' },
    icon: 'Coffee',
    color: 'hsl(var(--scenario-daily))',
    description: { zh: '朋友聚会、陌生人破冰、请人帮忙', en: 'Friends, strangers, asking favors' },
  },
  {
    id: 'conflict',
    name: { zh: '冲突化解', en: 'Conflict' },
    icon: 'Shield',
    color: 'hsl(var(--scenario-conflict))',
    description: { zh: '拒绝、批评、道歉、化解尴尬', en: 'Refuse, criticize, apologize, defuse' },
  },
];

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}
