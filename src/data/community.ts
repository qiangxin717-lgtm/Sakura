import type { CommunityShare } from '@/types';

export const initialCommunityShares: CommunityShare[] = [
  {
    id: 'cs-01',
    user_id: 'seed-01',
    author: '温暖的小狮子',
    avatar: 'L',
    scenario: { zh: '职场沟通', en: 'Workplace' },
    phrase: {
      zh: '我理解您的顾虑，这个方案确实还有优化空间。我建议我们可以先试运行两周，根据数据再调整。',
      en: 'I understand your concerns, this proposal has room for optimization. I suggest a two-week trial, then adjust based on data.',
    },
    insight: {
      zh: '上周用这个话术应对领导的质疑，效果出奇的好！领导不但没否决方案，反而觉得我考虑周全。关键在于先认可对方，再给出折中方案。',
      en: 'I used this phrase to handle my boss\'s questioning last week, and it worked surprisingly well! Instead of rejecting the proposal, my boss thought I was thorough. The key is to acknowledge them first, then offer a compromise.',
    },
    likes_count: 42,
    created_at: '2026-06-20T10:30:00Z',
  },
  {
    id: 'cs-02',
    user_id: 'seed-02',
    author: '慢热的向日葵',
    avatar: 'S',
    scenario: { zh: '家庭关系', en: 'Family' },
    phrase: {
      zh: '妈，我知道你是担心我。我吃饭睡觉都正常的，你放心。有什么事我会跟你说，你也别太累着自己。',
      en: 'Mom, I know you worry about me. I am eating and sleeping normally, do not worry. I will tell you if anything comes up. Also, do not tire yourself out.',
    },
    insight: {
      zh: '以前妈妈打电话来我总是敷衍，后来学会了"先接情绪再给信息"。现在妈妈明显放心多了，打电话的频率也从一天三次变成两天一次了。',
      en: 'I used to brush off my mom\'s calls, but I learned to "receive emotions first, then give information." Now she is clearly more reassured, and her call frequency dropped from three times a day to once every two days.',
    },
    likes_count: 67,
    created_at: '2026-06-19T15:00:00Z',
  },
  {
    id: 'cs-03',
    user_id: 'seed-03',
    author: '深夜的猫头鹰',
    avatar: 'O',
    scenario: { zh: '冲突化解', en: 'Conflict' },
    phrase: {
      zh: '我手头正在赶A项目的deadline，大概周四能空出来。如果你比较急，我可以先花半天理个框架，你看怎么安排优先级更好？',
      en: 'I am working on the Project A deadline, should free up by Thursday. If urgent, I can spend half a day on a framework first. How would you prioritize?',
    },
    insight: {
      zh: '同事临时找我帮忙，以前我只会说"没空"或者勉强答应。这次试着用了这个话术，同事不但没生气，还主动说"那你先忙你的"。',
      en: 'A colleague asked for help unexpectedly. I used to just say "no time" or reluctantly agree. This time I tried this phrase, and they not only didn\'t get upset but proactively said "then you focus on your work first."',
    },
    likes_count: 35,
    created_at: '2026-06-18T09:15:00Z',
  },
  {
    id: 'cs-04',
    user_id: 'seed-04',
    author: '勇敢的小石头',
    avatar: 'R',
    scenario: { zh: '情感恋爱', en: 'Romance' },
    phrase: {
      zh: '我不是在生气，我是有点失落。因为这件事我其实期待了很久，结果没按预期发展。我需要一点时间消化，不是你的问题。',
      en: 'I am not angry, I am a bit disappointed. I had been looking forward to this for a long time, and it did not go as expected. I need some time to process, it is not your fault.',
    },
    insight: {
      zh: '以前不开心就说"没事"，结果对方越问越急，最后变成吵架。学会区分"生气"和"失落"后，对象说终于知道怎么安慰我了。',
      en: 'I used to say "nothing" when unhappy, which made my partner more anxious and eventually led to fights. After learning to distinguish "angry" from "disappointed," my partner said they finally know how to comfort me.',
    },
    likes_count: 58,
    created_at: '2026-06-17T20:30:00Z',
  },
  {
    id: 'cs-05',
    user_id: 'seed-05',
    author: '安静的观察者',
    avatar: 'A',
    scenario: { zh: '校园社交', en: 'Campus' },
    phrase: {
      zh: '我也觉得这门课挺难的！你有没有发现第三章那个公式特别绕？要不咱们一起对对笔记？',
      en: 'I also think this course is hard! Did you notice the chapter three formula is tricky? Want to compare notes?',
    },
    insight: {
      zh: '用这个方法成功和坐在旁边的同学搭上了话，现在已经变成固定学习搭子了。关键是"也觉得"三个字——找到共同痛点比任何寒暄都有效。',
      en: 'I used this method to start a conversation with the classmate sitting next to me, and now we are regular study buddies. The key is the words "also think" — finding a shared pain point is more effective than any small talk.',
    },
    likes_count: 29,
    created_at: '2026-06-16T14:00:00Z',
  },
];
