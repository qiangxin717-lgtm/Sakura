import type { PracticeQuestion } from '@/types';

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 'pq-01',
    type: 'choice',
    scenarioId: 'workplace',
    scenario: {
      zh: '领导在会议上质疑你的方案，认为成本太高',
      en: 'Your boss questions your proposal in a meeting, saying the cost is too high',
    },
    question: { zh: '你应该如何回应？', en: 'How should you respond?' },
    options: [
      {
        zh: '这个成本已经很低了，市场上没有更便宜的方案了',
        en: 'This cost is already very low, there is no cheaper option on the market',
      },
      {
        zh: '我理解您的顾虑，这个方案确实还有优化空间。我建议先试运行两周，根据数据再调整',
        en: 'I understand your concerns, this proposal has room for optimization. I suggest a two-week trial, then adjust based on data',
      },
      {
        zh: '那您觉得多少预算合适？我按您的预算重新做',
        en: 'What budget do you think is appropriate? I will redo it according to your budget',
      },
      {
        zh: '好吧，那我回去再想想',
        en: 'Okay, I will go back and think about it again',
      },
    ],
    answer: 1,
    explanation: {
      zh: '先认可对方观点再提出折中方案是最佳做法。选项A是辩解，C把决策完全推给领导，D过于消极',
      en: 'Acknowledging their view then offering a compromise is best. Option A is defensive, C pushes the decision entirely to the boss, D is too passive',
    },
  },
  {
    id: 'pq-02',
    type: 'choice',
    scenarioId: 'family',
    scenario: {
      zh: '妈妈又打电话来催你吃饭穿衣，你觉得有点烦',
      en: 'Mom calls again to remind you to eat and dress warmly, you feel a bit annoyed',
    },
    question: { zh: '怎样回应最高情商？', en: 'What is the highest EQ response?' },
    options: [
      {
        zh: '妈你别总操心我了，你好烦啊',
        en: 'Mom stop worrying about me, you are so annoying',
      },
      {
        zh: '知道了知道了，我忙着呢，挂了',
        en: 'I know I know, I am busy, hanging up',
      },
      {
        zh: '妈，我知道你担心我。我吃饭睡觉都正常的，你放心。你也别太累着自己',
        en: 'Mom, I know you worry about me. I am eating and sleeping normally, do not worry. Also do not tire yourself out',
      },
      {
        zh: '嗯嗯好的，行',
        en: 'Yeah okay, fine',
      },
    ],
    answer: 2,
    explanation: {
      zh: '先接住父母的情绪（知道你担心），给出具体安心信息（吃饭睡觉正常），再反向关心（别太累）形成情感闭环',
      en: 'Receive their emotions first (know you worry), give concrete reassurance (eating and sleeping normally), then return the care (do not tire out) to complete the emotional loop',
    },
  },
  {
    id: 'pq-03',
    type: 'choice',
    scenarioId: 'conflict',
    scenario: {
      zh: '同事请你帮忙做个PPT，但你手上也有急活',
      en: 'A colleague asks you to help with a PPT, but you also have urgent work',
    },
    question: { zh: '怎样拒绝最不伤关系？', en: 'How to refuse without damaging the relationship?' },
    options: [
      {
        zh: '我没空，你找别人吧',
        en: 'I do not have time, find someone else',
      },
      {
        zh: '我手头正在赶A项目的deadline，大概周四能空出来。如果你比较急，我可以先花半天理个框架，你看怎么安排优先级更好？',
        en: 'I am working on the Project A deadline, should free up by Thursday. If urgent, I can spend half a day sketching a framework first. How would you prioritize?',
      },
      {
        zh: '行吧，那我晚上加班帮你做',
        en: 'Fine, I will work overtime to help you tonight',
      },
      {
        zh: '做PPT很简单啊，你自己做不就行了',
        en: 'Making a PPT is easy, just do it yourself',
      },
    ],
    answer: 1,
    explanation: {
      zh: '不说"没空"而是说在做什么，给替代方案让对方选择，把决策权交给对方。A太生硬，C委屈自己，D贬低对方',
      en: 'Instead of saying "no time", explain what you are doing, offer alternatives, and let them decide. A is too blunt, C sacrifices yourself, D belittles them',
    },
  },
  {
    id: 'pq-04',
    type: 'choice',
    scenarioId: 'romance',
    scenario: {
      zh: '伴侣问你"怎么了"，你确实有点不开心',
      en: 'Your partner asks "what is wrong", and you are indeed a bit unhappy',
    },
    question: { zh: '怎样回应最好？', en: 'What is the best response?' },
    options: [
      { zh: '没事', en: 'Nothing' },
      {
        zh: '我不是在生气，是有点失落。因为这件事我期待了很久，结果没按预期发展。不是你的问题',
        en: 'I am not angry, just a bit disappointed. I had been looking forward to this for a long time, and it did not go as expected. It is not your fault',
      },
      {
        zh: '你自己想',
        en: 'Figure it out yourself',
      },
      {
        zh: '你居然不知道我怎么了？你根本不在乎我',
        en: 'You actually do not know what is wrong? You do not care about me at all',
      },
    ],
    answer: 1,
    explanation: {
      zh: '精确区分情绪（生气vs失落），说明原因（期待很久），避免对方自责（不是你的问题）。A是冷暴力，C是赌气，D是攻击',
      en: 'Precisely distinguish emotions (angry vs disappointed), explain why (looked forward to it), prevent self-blame (not your fault). A is cold violence, C is sulking, D is attacking',
    },
  },
  {
    id: 'pq-05',
    type: 'fill-blank',
    scenarioId: 'daily',
    scenario: {
      zh: '朋友帮了你一个大忙，你想表达感谢',
      en: 'A friend did you a big favor, you want to express gratitude',
    },
    question: {
      zh: '补全这句话：真的太感谢了！如果不是你帮忙，我估计要____。下次请你吃饭，一定要赏脸啊！',
      en: 'Complete this sentence: Thank you so much! If you had not helped, I would have ____ for ages. Let me treat you to a meal next time!',
    },
    answer: '折腾好久',
    explanation: {
      zh: '量化对方帮助的意义（折腾好久），让感谢更具体更有分量。模糊的感谢如"帮了大忙"不如具体描述后果来得真诚',
      en: 'Quantifying the meaning of their help (struggled for ages) makes gratitude more specific and weighty. Vague thanks like "big help" is less genuine than describing the concrete consequence',
    },
  },
  {
    id: 'pq-06',
    type: 'fill-blank',
    scenarioId: 'workplace',
    scenario: {
      zh: '接到不熟悉的新任务，需要向领导表态',
      en: 'Assigned an unfamiliar task, need to respond to your boss',
    },
    question: {
      zh: '补全这句话：这个任务我之前没接触过，可能需要一点时间上手。我预计周三前能完成初稿，____。',
      en: 'Complete: I have not done this type of task before, so I may need a little time. I expect to finish the draft by Wednesday, and ____.',
    },
    answer: '中间有问题及时跟您同步',
    explanation: {
      zh: '"及时同步"让领导有安全感和掌控感。接到新任务时，坦诚说明情况+给出明确时间节点+承诺过程同步，是向上管理的三要素',
      en: '"Keep you updated" gives the boss a sense of security and control. When taking on a new task: honesty about the situation + clear timeline + process updates = three keys to managing up',
    },
  },
  {
    id: 'pq-07',
    type: 'choice',
    scenarioId: 'campus',
    scenario: {
      zh: '社团活动刚结束，你想感谢大家的付出',
      en: 'A club activity just ended, you want to thank everyone for their effort',
    },
    question: { zh: '怎样感谢最有感染力？', en: 'How to express gratitude most effectively?' },
    options: [
      { zh: '大家辛苦了！', en: 'Everyone worked hard!' },
      {
        zh: '辛苦了！特别感谢小张负责场地跑前跑后，小李的宣传海报超出了预期效果。下次再一起合作！',
        en: 'Great work! Special thanks to Xiao Zhang for the venue, Xiao Li\'s posters exceeded expectations. Let\'s collaborate again!',
      },
      {
        zh: '这次活动一般般，下次大家再努力',
        en: 'This event was so-so, everyone try harder next time',
      },
      { zh: '感谢各位的参与', en: 'Thank you all for participating' },
    ],
    answer: 1,
    explanation: {
      zh: '点名+具体事让感谢不空洞。被感谢的人有成就感，没被点名的人也知道下次怎么做会被看到。A和D太泛泛，C是批评',
      en: 'Naming people and specific tasks makes gratitude genuine. Those thanked feel valued, others learn what gets recognized. A and D are too vague, C is criticism',
    },
  },
  {
    id: 'pq-08',
    type: 'choice',
    scenarioId: 'conflict',
    scenario: {
      zh: '朋友转发了一条不实信息到群里',
      en: 'A friend shared misinformation in the group chat',
    },
    question: { zh: '怎样提醒最不伤面子？', en: 'How to point it out without hurting their pride?' },
    options: [
      { zh: '这是假的，你别信', en: 'This is fake, do not believe it' },
      {
        zh: '这个消息我之前也看到过，后来查了一下好像不太准确。我发你一个靠谱的来源，你看看？',
        en: 'I saw this before too, but after checking it seems inaccurate. Let me send you a reliable source, want to take a look?',
      },
      {
        zh: '你怎么连这个都信？',
        en: 'How can you believe this?',
      },
      { zh: '（什么都不说）', en: '(Say nothing)' },
    ],
    answer: 1,
    explanation: {
      zh: '"我也看到过"表示理解而非嘲笑，"查了一下"展示依据，"你看看"是建议而非纠正。A直接否定，C是嘲讽，D是逃避',
      en: '"I saw it too" shows understanding not mockery, "checked" shows evidence, "want to look" is a suggestion not correction. A is direct denial, C is mockery, D is avoidance',
    },
  },
];
