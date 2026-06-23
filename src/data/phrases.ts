import type { Phrase } from '@/types';

export const phrases: Phrase[] = [
  // ===== 职场沟通 (5条) =====
  {
    id: 'wp-01',
    scenarioId: 'workplace',
    content: {
      zh: '我理解您的顾虑，这个方案确实还有优化空间。我建议我们可以先试运行两周，根据数据再调整，您看这样是否更稳妥？',
      en: 'I understand your concerns, this proposal does have room for optimization. I suggest we trial-run for two weeks and adjust based on data. Would that be more prudent?',
    },
    context: {
      zh: '领导质疑你的方案时，不要急于辩解，先认可对方观点再提出折中方案',
      en: 'When your boss questions your proposal, acknowledge their view first, then offer a compromise',
    },
    analysis: {
      zh: '先说"理解顾虑"表示你在倾听，"优化空间"展现谦虚，"试运行"降低决策风险，最后用疑问句把决定权交回对方',
      en: '"Understand concerns" shows listening, "room for optimization" shows humility, "trial-run" reduces risk, ending with a question returns the decision to them',
    },
    variants: {
      zh: [
        '您说得有道理，我也在考虑这个问题。不如我们分阶段推进？',
        '感谢您的反馈，我重新优化一下方案，周五给您一个改进版本。',
      ],
      en: [
        'You make a good point, I have been considering this too. How about we phase it in?',
        'Thanks for the feedback, I will refine the proposal and send an improved version by Friday.',
      ],
    },
    tags: ['向上沟通', '方案汇报', '折中'],
    difficulty: 'intermediate',
  },
  {
    id: 'wp-02',
    scenarioId: 'workplace',
    content: {
      zh: '这个任务我之前没接触过，可能需要一点时间上手。我预计周三前能完成初稿，中间有问题及时跟您同步。',
      en: 'I have not done this type of task before, so I may need a little time to get up to speed. I expect to finish the draft by Wednesday and will keep you updated on progress.',
    },
    context: {
      zh: '接到不熟悉的新任务时，坦诚说明情况并给出明确时间节点',
      en: 'When assigned an unfamiliar task, be honest and set a clear timeline',
    },
    analysis: {
      zh: '"没接触过"是坦诚而非无能，"周三前初稿"给对方预期，"及时同步"让领导有安全感',
      en: '"Haven\'t done before" is honesty not incompetence, "draft by Wednesday" sets expectations, "keep updated" gives reassurance',
    },
    variants: {
      zh: [
        '感谢信任！这个领域我需要学习一下，预计周五交付，可以吗？',
        '我研究一下需求，今天下班前给您一个执行计划。',
      ],
      en: [
        'Thanks for trusting me! I need to study this area, expect delivery by Friday, is that okay?',
        'Let me review the requirements and send you an execution plan by end of day.',
      ],
    },
    tags: ['任务接收', '预期管理'],
    difficulty: 'beginner',
  },
  {
    id: 'wp-03',
    scenarioId: 'workplace',
    content: {
      zh: '我手头正在赶A项目的deadline，大概周四能空出来。如果您这边比较急，我可以先花半天理个框架，您看怎么安排优先级更好？',
      en: 'I am currently working on the Project A deadline, which should free up by Thursday. If this is urgent, I can spend half a day sketching a framework first. How would you like to prioritize?',
    },
    context: {
      zh: '同事临时找你帮忙，但你自己也很忙时',
      en: 'When a colleague asks for help but you are also busy',
    },
    analysis: {
      zh: '不说"没空"而是说在做什么，给替代方案让对方选择，"优先级"把决策权交给对方',
      en: 'Instead of "no time", explain what you are doing, offer alternatives, and let them decide priority',
    },
    variants: {
      zh: [
        '我很想帮忙，不过这周确实排满了。下周可以吗？',
        '这个我暂时腾不出手，不过我可以介绍小王给你，他这方面很熟。',
      ],
      en: [
        'I would love to help, but this week is fully booked. Would next week work?',
        'I cannot free up time right now, but I can introduce Xiao Wang, he is experienced in this.',
      ],
    },
    tags: ['拒绝', '同事协作', '优先级'],
    difficulty: 'intermediate',
  },
  {
    id: 'wp-04',
    scenarioId: 'workplace',
    content: {
      zh: '辛苦了！这个方案整体思路很清晰。我补充一个小建议：第三部分的数据如果加上同比对比，说服力会更强。',
      en: 'Great work! The overall logic of this proposal is very clear. One small suggestion: if you add year-over-year comparison to section three, it would be even more convincing.',
    },
    context: {
      zh: '给同事的方案提反馈时，先肯定再建议',
      en: 'When giving feedback on a colleague\'s work, affirm first then suggest',
    },
    analysis: {
      zh: '"辛苦了"先认可付出，"整体清晰"肯定核心价值，"小建议"降低批评感，具体到第几部分更专业',
      en: '"Great work" acknowledges effort, "logic clear" validates core value, "small suggestion" softens criticism, being specific shows professionalism',
    },
    variants: {
      zh: [
        '做得很棒！细节上有一处可以优化，我标出来了你看看。',
        '整体不错！如果时间允许，数据部分可以再丰富一下。',
      ],
      en: [
        'Excellent! One detail can be optimized, I have marked it for you.',
        'Overall great! If time permits, the data section could be richer.',
      ],
    },
    tags: ['反馈', '同事协作', '肯定'],
    difficulty: 'beginner',
  },
  {
    id: 'wp-05',
    scenarioId: 'workplace',
    content: {
      zh: '关于这件事，我想说明一下背景：当时的情况是……我的考虑是……如果这个处理方式有不当之处，我愿意承担责任并改进。',
      en: 'Regarding this matter, I would like to provide some context: the situation at the time was... my consideration was... if my handling was inappropriate, I am willing to take responsibility and improve.',
    },
    context: {
      zh: '工作出现失误被追责时，说明背景而非找借口',
      en: 'When held accountable for a work mistake, explain context without making excuses',
    },
    analysis: {
      zh: '先说"背景"让对方了解全貌，再说"我的考虑"展现思考过程，"承担责任"体现担当',
      en: 'Explain "context" to show the full picture, "my consideration" shows thought process, "take responsibility" shows accountability',
    },
    variants: {
      zh: [
        '这件事我有疏忽，已经总结了教训，后续会增加一个复核环节。',
        '感谢指出，我复盘了一下，主要原因是这样，我已经在调整了。',
      ],
      en: [
        'I was negligent here, I have learned from it and will add a review step going forward.',
        'Thanks for pointing this out, I reviewed it, the main cause was... and I am already adjusting.',
      ],
    },
    tags: ['失误处理', '担责', '复盘'],
    difficulty: 'advanced',
  },

  // ===== 校园社交 (5条) =====
  {
    id: 'cp-01',
    scenarioId: 'campus',
    content: {
      zh: '我也觉得这门课挺难的！你有没有发现第三章那个公式特别绕？我昨天琢磨了好久才搞明白，要不咱们一起对对笔记？',
      en: 'I also think this course is pretty hard! Did you notice that formula in chapter three is especially tricky? I spent a long time figuring it out yesterday. Want to compare notes?',
    },
    context: {
      zh: '想和同学拉近关系时，找到共同痛点发起话题',
      en: 'When wanting to get closer to a classmate, find a shared pain point to start a conversation',
    },
    analysis: {
      zh: '"也觉得"建立共鸣，具体到第三章公式显得真实，"一起对笔记"发出自然邀约',
      en: '"Also think" builds resonance, mentioning a specific chapter feels authentic, "compare notes" is a natural invitation',
    },
    variants: {
      zh: [
        '你作业写到哪了？我卡在第五题了，求救！',
        '听说你笔记记得特别好，能不能借我参考一下？',
      ],
      en: [
        'How far are you on the homework? I am stuck on question five, help!',
        'I heard your notes are really good, could I borrow them for reference?',
      ],
    },
    tags: ['同学社交', '破冰', '共同话题'],
    difficulty: 'beginner',
  },
  {
    id: 'cp-02',
    scenarioId: 'campus',
    content: {
      zh: '老师，关于上次课讲的那个案例，我课后想了一下有个疑问。您说的A方案的优势我理解，但在XX条件下是不是B方案更合适？想听听您的看法。',
      en: 'Professor, regarding the case from last class, I thought about it and have a question. I understand the advantages of Plan A you mentioned, but under XX conditions, wouldn\'t Plan B be more suitable? I would love to hear your thoughts.',
    },
    context: {
      zh: '向老师提问时，先表示思考过再提出疑问',
      en: 'When asking a professor a question, show you have thought about it first',
    },
    analysis: {
      zh: '"课后想了"展现学习态度，"A方案优势我理解"表示在认真听讲，疑问具体到条件而非泛泛而问',
      en: '"Thought about it" shows diligence, "understand Plan A" shows you were listening, making the question specific shows depth',
    },
    variants: {
      zh: [
        '老师，您上次讲的内容我有个地方没太懂，能再讲讲吗？',
        '老师，我查了一些资料，对这个问题有不同的看法，可以讨论一下吗？',
      ],
      en: [
        'Professor, I did not fully understand something from last class, could you explain it again?',
        'Professor, I looked up some materials and have a different perspective, could we discuss it?',
      ],
    },
    tags: ['师生交流', '提问技巧'],
    difficulty: 'intermediate',
  },
  {
    id: 'cp-03',
    scenarioId: 'campus',
    content: {
      zh: '这次活动大家都辛苦了！我特别想感谢几位：小张负责场地跑前跑后，小李的宣传海报超出了预期效果。下次有机会再一起合作！',
      en: 'Everyone worked hard on this event! I especially want to thank a few people: Xiao Zhang ran around for the venue, Xiao Li\'s promotional posters exceeded expectations. Let\'s collaborate again next time!',
    },
    context: {
      zh: '社团活动结束后，公开感谢具体的人做具体的事',
      en: 'After a club activity, publicly thank specific people for specific things',
    },
    analysis: {
      zh: '点名+具体事让感谢不空洞，被感谢的人有成就感，没被点名的人也知道下次怎么做会被看到',
      en: 'Naming people and specific tasks makes gratitude genuine, those thanked feel valued, others learn what gets recognized',
    },
    variants: {
      zh: [
        '活动很成功！特别感谢几位核心成员的付出，大家辛苦了！',
        '这次多亏了大家的配合，尤其是XX和YY，关键时刻顶上了。',
      ],
      en: [
        'The event was a success! Special thanks to the core members, everyone worked hard!',
        'This would not have happened without everyone\'s cooperation, especially XX and YY who stepped up at crucial moments.',
      ],
    },
    tags: ['社团活动', '感谢', '团队'],
    difficulty: 'beginner',
  },
  {
    id: 'cp-04',
    scenarioId: 'campus',
    content: {
      zh: '我理解你现在压力很大。要不这样，你先安心复习，小组展示的部分我先帮你顶上，等你考完我们再对一下内容。',
      en: 'I understand you are under a lot of pressure right now. How about this: you focus on your exam prep, and I will cover your part of the group presentation for now. We can sync up after your exams.',
    },
    context: {
      zh: '队友期末压力大到影响小组任务时，主动分担而非抱怨',
      en: 'When a teammate is overwhelmed by exams and it affects group work, offer help instead of complaining',
    },
    analysis: {
      zh: '"理解压力"是共情，"先帮你顶上"是行动，"考完再对"给出后续安排，不是无限代劳',
      en: '"Understand pressure" is empathy, "I will cover" is action, "sync after exams" sets boundaries, not unlimited help',
    },
    variants: {
      zh: [
        '别担心，你先忙考试，这块我来想办法。',
        '看你最近太累了，展示的事我先推进，你有空了随时加入。',
      ],
      en: [
        'Don\'t worry, focus on your exams, I will figure out this part.',
        'You seem exhausted lately, I will push the presentation forward, join in whenever you are free.',
      ],
    },
    tags: ['团队协作', '共情', '互助'],
    difficulty: 'intermediate',
  },
  {
    id: 'cp-05',
    scenarioId: 'campus',
    content: {
      zh: '其实我也是大一刚来的时候特别不适应，后来发现主动参加一两个社团就好多了。你对什么方向感兴趣？我可以推荐几个氛围不错的。',
      en: 'Actually, I also felt really unadapted when I first arrived as a freshman. Later I found that joining one or two clubs helped a lot. What direction are you interested in? I can recommend a few with good vibes.',
    },
    context: {
      zh: '学弟学妹说感到孤独不适应时，用自身经历建立共鸣再给建议',
      en: 'When a junior says they feel lonely and unadapted, share your own experience to build resonance then give advice',
    },
    analysis: {
      zh: '"我也曾经这样"消除孤独感，"一两个"是具体可执行的建议而非泛泛而谈，"我推荐"主动提供帮助',
      en: '"I felt the same" reduces loneliness, "one or two" is actionable advice, "I can recommend" proactively offers help',
    },
    variants: {
      zh: [
        '我刚来也这样，多参加活动就好了，要不要一起去看看社团招新？',
        '适应需要时间，慢慢来。有什么困惑随时找我聊。',
      ],
      en: [
        'I was the same, joining activities helps. Want to check out club recruitment together?',
        'Adapting takes time, take it slow. Feel free to chat with me anytime.',
      ],
    },
    tags: ['学长学姐', '共情', '建议'],
    difficulty: 'beginner',
  },

  // ===== 家庭关系 (5条) =====
  {
    id: 'fm-01',
    scenarioId: 'family',
    content: {
      zh: '妈，我知道你是担心我。我最近确实有点忙，但吃饭睡觉都正常的。你放心，有什么事我会跟你说，你也别太累着自己。',
      en: 'Mom, I know you are worried about me. I have been a bit busy lately, but I am eating and sleeping normally. Don\'t worry, I will tell you if anything comes up. Also, don\'t tire yourself out.',
    },
    context: {
      zh: '父母频繁关心让你有压力时，先认可对方的爱再说明现状',
      en: 'When parents\' frequent concern feels overwhelming, acknowledge their love first then reassure',
    },
    analysis: {
      zh: '"知道你担心"接住了父母的情绪，"吃饭睡觉正常"给出具体安心信息，"别太累"反向关心形成闭环',
      en: '"Know you worry" validates their feelings, "eating and sleeping normally" gives concrete reassurance, "don\'t tire out" returns the care',
    },
    variants: {
      zh: [
        '放心吧妈，我挺好的，你照顾好自己就行。',
        '妈你别总操心我了，你自己身体最重要，定期体检别忘了。',
      ],
      en: [
        'Don\'t worry Mom, I am doing fine, just take care of yourself.',
        'Mom, stop worrying about me so much, your health is most important, don\'t forget your checkups.',
      ],
    },
    tags: ['亲子沟通', '回应关心'],
    difficulty: 'beginner',
  },
  {
    id: 'fm-02',
    scenarioId: 'family',
    content: {
      zh: '爸，其实这件事我已经想清楚了，我的考虑是……我知道你和妈是为我好，但我也想试试自己的判断。如果走不通，我承担后果。',
      en: 'Dad, I have actually thought this through, my reasoning is... I know you and Mom want the best for me, but I also want to try my own judgment. If it doesn\'t work out, I will take the consequences.',
    },
    context: {
      zh: '和父母在人生选择上有分歧时，表达自己的想法而非赌气',
      en: 'When disagreeing with parents on life choices, express your thoughts calmly instead of sulking',
    },
    analysis: {
      zh: '"想清楚了"展现成熟，"知道你们为我好"认可父母出发点，"承担后果"给父母安全感',
      en: '"Thought it through" shows maturity, "know you want the best" validates their intention, "take consequences" gives them reassurance',
    },
    variants: {
      zh: [
        '爸妈，我知道你们担心，但这个决定我想自己做一次，行吗？',
        '我理解你们的想法，但我也有我的考虑，能不能给我半年时间试试？',
      ],
      en: [
        'Mom and Dad, I know you worry, but I want to make this decision myself, okay?',
        'I understand your perspective, but I have my own reasoning. Can you give me six months to try?',
      ],
    },
    tags: ['人生选择', '分歧', '成熟'],
    difficulty: 'advanced',
  },
  {
    id: 'fm-03',
    scenarioId: 'family',
    content: {
      zh: '奶奶，你上次说的那个事我后来问了问，确实像你说的那样。还是你有经验，以后这种事我多向你请教。',
      en: 'Grandma, I asked about what you mentioned last time, and it was indeed as you said. You really have experience. I will consult you more about these things in the future.',
    },
    context: {
      zh: '长辈给建议时，事后反馈证明对方说得对',
      en: 'When elders give advice, follow up later to prove they were right',
    },
    analysis: {
      zh: '长辈最在意被重视和被需要，具体到"上次说的那个事"说明你认真听了，"向你请教"给长辈价值感',
      en: 'Elders want to feel valued and needed, mentioning the specific thing shows you listened, "consult you" gives them a sense of value',
    },
    variants: {
      zh: [
        '爷爷，你上次提醒我的那个事真管用，谢谢你！',
        '妈，你教我的那个方法我试了，特别好使！',
      ],
      en: [
        'Grandpa, that thing you reminded me about last time really worked, thank you!',
        'Mom, I tried the method you taught me, it works great!',
      ],
    },
    tags: ['长辈沟通', '被需要', '认可'],
    difficulty: 'beginner',
  },
  {
    id: 'fm-04',
    scenarioId: 'family',
    content: {
      zh: '我知道你最近也不容易，这件事咱们都先冷静一下。等心情好了再聊，不管怎样咱们是一家人，没有什么过不去的。',
      en: 'I know things have not been easy for you lately either. Let\'s both calm down first. We can talk when we feel better. No matter what, we are family, and nothing is insurmountable.',
    },
    context: {
      zh: '家庭矛盾激烈时，主动降温而非火上浇油',
      en: 'When family conflict escalates, actively cool things down instead of adding fuel',
    },
    analysis: {
      zh: '"你也不容易"是双向理解，"先冷静"按下暂停键，"一家人"唤起情感联结',
      en: '"Not easy for you either" is mutual understanding, "calm down" hits pause, "we are family" reconnects emotionally',
    },
    variants: {
      zh: [
        '咱们别吵了，都消消气，有事好好说。',
        '我知道你也是好心，我们换个时间再聊这个事好吗？',
      ],
      en: [
        'Let\'s stop arguing, let\'s both cool down, we can talk things through.',
        'I know you mean well too, can we talk about this another time?',
      ],
    },
    tags: ['家庭矛盾', '降温', '共情'],
    difficulty: 'intermediate',
  },
  {
    id: 'fm-05',
    scenarioId: 'family',
    content: {
      zh: '妈，今年过年我不一定能回来，公司临时有事。不过我已经给你和爸订了体检套餐，你们去查查身体，别心疼钱。等我忙完这阵子回去看你们。',
      en: 'Mom, I might not be able to come back for New Year this time, something came up at work. But I have booked a health checkup package for you and Dad. Go get checked, don\'t be frugal about it. I will visit you after this busy period.',
    },
    context: {
      zh: '不能回家过年时，用行动弥补缺席',
      en: 'When you cannot go home for New Year, make up for it with actions',
    },
    analysis: {
      zh: '先直接说明情况，体检套餐是实质关心而非空话，"忙完回去"给出后续承诺',
      en: 'State the situation directly first, a health checkup is tangible care not empty words, "visit after busy period" is a future commitment',
    },
    variants: {
      zh: [
        '今年回不去了，我给你们转了点钱，想买什么就买。视频跨年好不好？',
        '抱歉今年缺席了，等我忙完补一个年，到时候好好陪你们。',
      ],
      en: [
        'I can\'t make it back this year, I transferred some money, buy what you want. Let\'s video call for New Year\'s?',
        'Sorry I can\'t be there this year, I will make it up after things calm down, I will spend quality time with you then.',
      ],
    },
    tags: ['缺席补偿', '实际行动', '父母关心'],
    difficulty: 'intermediate',
  },

  // ===== 情感恋爱 (5条) =====
  {
    id: 'rm-01',
    scenarioId: 'romance',
    content: {
      zh: '我不是在生气，我是有点失落。因为这件事我其实期待了很久，结果没按预期发展。我需要一点时间消化，不是你的问题。',
      en: 'I am not angry, I am a bit disappointed. Because I had been looking forward to this for a long time, and it did not go as expected. I need some time to process, it is not your fault.',
    },
    context: {
      zh: '伴侣问你怎么了时，精确表达情绪而非说"没事"',
      en: 'When your partner asks what is wrong, express your emotion precisely instead of saying "nothing"',
    },
    analysis: {
      zh: '区分"生气"和"失落"让对方理解你，"期待很久"说明原因，"不是你的问题"避免对方自责',
      en: 'Distinguishing "angry" from "disappointed" helps them understand, "looked forward to" explains why, "not your fault" prevents self-blame',
    },
    variants: {
      zh: [
        '我有点不开心，但跟你说说就好了。其实是……',
        '我不是不想说话，是在想事情。给我五分钟，然后我们聊。',
      ],
      en: [
        'I am a bit upset, but talking to you helps. Actually...',
        'It\'s not that I don\'t want to talk, I am just thinking. Give me five minutes, then let\'s chat.',
      ],
    },
    tags: ['情绪表达', '沟通', '精确'],
    difficulty: 'intermediate',
  },
  {
    id: 'rm-02',
    scenarioId: 'romance',
    content: {
      zh: '刚才那个事是我态度不好，对不起。我其实是着急了，不是冲你发火。你的想法我听到了，我们重新聊一次好吗？',
      en: 'I was wrong about my attitude earlier, I am sorry. I was actually just anxious, not directing it at you. I heard your thoughts, can we start over?',
    },
    context: {
      zh: '吵架后主动道歉时，区分态度和原因',
      en: 'When apologizing after a fight, separate your attitude from the cause',
    },
    analysis: {
      zh: '"态度不好"承认具体错误而非泛泛道歉，"着急了"解释原因，"你的想法我听到了"认可对方，"重新聊"给出修复方案',
      en: '"Bad attitude" owns the specific mistake, "anxious" explains why, "heard your thoughts" validates them, "start over" offers a fix',
    },
    variants: {
      zh: [
        '对不起，刚才是我说话太冲了。你别往心里去，好不好？',
        '刚吵完我也想了想，确实有我的问题。我们和好吧。',
      ],
      en: [
        'Sorry, I was too harsh earlier. Don\'t take it to heart, okay?',
        'I thought about it after our fight, I was partly at fault. Let\'s make up.',
      ],
    },
    tags: ['道歉', '吵架和好', '态度'],
    difficulty: 'intermediate',
  },
  {
    id: 'rm-03',
    scenarioId: 'romance',
    content: {
      zh: '其实从第一次见面起我就注意到了你。这段时间相处下来，我越来越确定自己的感觉。我喜欢你，想正式和你在一起，你愿意吗？',
      en: 'Actually, I noticed you from the very first time we met. After spending time together recently, I am more and more certain about my feelings. I like you and want to be with you properly. Will you be my partner?',
    },
    context: {
      zh: '表白时真诚直接，不绕弯子',
      en: 'When confessing feelings, be sincere and direct without beating around the bush',
    },
    analysis: {
      zh: '"第一次见面"让表白有故事感，"越来越确定"说明不是冲动，"你愿意吗"把选择权交给对方',
      en: '"First meeting" gives the confession a story, "more certain" shows it is not impulsive, "will you" gives them the choice',
    },
    variants: {
      zh: [
        '我想了很久，还是想告诉你：我喜欢你。希望能有机会好好照顾你。',
        '和你在一起的时候特别开心，想做你男朋友/女朋友，行吗？',
      ],
      en: [
        'I have thought a lot, and I want to tell you: I like you. I hope to have the chance to take care of you.',
        'I am always happy when I am with you, I want to be your boyfriend/girlfriend, is that okay?',
      ],
    },
    tags: ['表白', '真诚', '直接'],
    difficulty: 'advanced',
  },
  {
    id: 'rm-04',
    scenarioId: 'romance',
    content: {
      zh: '你今天看起来有点累，是不是工作不顺心？不用急着说，我先给你倒杯水，你想说的时候我都在。',
      en: 'You look a bit tired today, is work not going well? No rush to talk, let me get you some water first. I am here whenever you want to share.',
    },
    context: {
      zh: '察觉伴侣情绪低落时，给空间而非追问',
      en: 'When you sense your partner is down, give space instead of pressing',
    },
    analysis: {
      zh: '"看起来有点累"是温和的观察而非质问，"不用急"给对方选择权，"倒杯水"是行动关心，"我都在"是情感托底',
      en: '"Look tired" is a gentle observation not an interrogation, "no rush" gives them choice, "get water" is caring action, "I am here" is emotional support',
    },
    variants: {
      zh: [
        '感觉你今天不太开心，要不要抱一下？',
        '看你心情不太好，我先不烦你，有需要随时叫我。',
      ],
      en: [
        'You seem down today, want a hug?',
        'You don\'t seem in a good mood, I won\'t bother you for now, call me anytime you need.',
      ],
    },
    tags: ['察觉情绪', '给空间', '陪伴'],
    difficulty: 'intermediate',
  },
  {
    id: 'rm-05',
    scenarioId: 'romance',
    content: {
      zh: '谢谢你今天陪我做了这么无聊的事，还一直夸我。虽然嘴上说不好意思，其实心里特别开心。有你在真好。',
      en: 'Thank you for doing something so boring with me today, and for keep complimenting me. Even though I act shy, I am actually really happy inside. It is so nice to have you.',
    },
    context: {
      zh: '日常向伴侣表达感激和爱意时，具体到行为',
      en: 'When expressing daily gratitude and love to your partner, be specific about their actions',
    },
    analysis: {
      zh: '具体到"陪我做了无聊的事"让对方知道你看到了付出，"嘴上说不好意思心里开心"是真诚的自我暴露，"有你在真好"直接表达爱意',
      en: 'Mentioning "boring thing" shows you noticed their effort, "act shy but happy" is genuine vulnerability, "nice to have you" directly expresses love',
    },
    variants: {
      zh: [
        '今天虽然只是随便逛逛，但因为和你在一起所以很开心。',
        '谢谢你总是记得我喜欢什么，被你在意的感觉特别好。',
      ],
      en: [
        'Even though we just wandered around today, I was happy because I was with you.',
        'Thank you for always remembering what I like, being cared about by you feels wonderful.',
      ],
    },
    tags: ['日常甜蜜', '感激', '具体'],
    difficulty: 'beginner',
  },

  // ===== 日常社交 (5条) =====
  {
    id: 'dl-01',
    scenarioId: 'daily',
    content: {
      zh: '其实我一直想问你，你这个包包好好看，在哪买的？我最近正好想换一个，求推荐！',
      en: 'I have been wanting to ask you, your bag looks great, where did you get it? I am looking to switch to a new one, please recommend!',
    },
    context: {
      zh: '想和不熟的人破冰时，用真诚的赞美+提问打开话题',
      en: 'When breaking the ice with someone you don\'t know well, use genuine praise plus a question',
    },
    analysis: {
      zh: '"一直想问"说明关注已久不是随口夸，"在哪买"是自然延展话题，"求推荐"放低姿态让对方有分享欲',
      en: '"Been wanting to ask" shows it is not casual, "where did you get it" extends naturally, "please recommend" lowers your position and invites sharing',
    },
    variants: {
      zh: [
        '你这个发型好适合你！是哪个理发店做的？',
        '你刚才说的那个观点挺有意思的，能展开说说吗？',
      ],
      en: [
        'That hairstyle suits you so well! Which salon did you go to?',
        'The point you just made is interesting, could you elaborate?',
      ],
    },
    tags: ['破冰', '赞美', '陌生人'],
    difficulty: 'beginner',
  },
  {
    id: 'dl-02',
    scenarioId: 'daily',
    content: {
      zh: '真的太感谢了！如果不是你帮忙，我估计要折腾好久。下次请你吃饭，一定要赏脸啊！',
      en: 'Thank you so much! If you had not helped, I would have struggled for ages. Let me treat you to a meal next time, you must come!',
    },
    context: {
      zh: '别人帮了忙后，具体表达感谢+发出邀约',
      en: 'After someone helps you, express specific gratitude and extend an invitation',
    },
    analysis: {
      zh: '"如果不是你"突出对方价值，"折腾好久"量化了帮助的意义，"请吃饭"将感谢转化为行动',
      en: '"If not for you" highlights their value, "struggled for ages" quantifies the help, "treat to a meal" turns gratitude into action',
    },
    variants: {
      zh: [
        '太谢谢了！帮了大忙了，改天请你喝奶茶！',
        '多亏你了！以后你有需要也随时找我。',
      ],
      en: [
        'Thanks so much! You were a huge help, let me buy you boba next time!',
        'Thanks to you! If you ever need anything, just ask.',
      ],
    },
    tags: ['感谢', '请客', '社交'],
    difficulty: 'beginner',
  },
  {
    id: 'dl-03',
    scenarioId: 'daily',
    content: {
      zh: '我下周二晚上有点空，你看你那边方便吗？如果时间不合适也行，我们再约。',
      en: 'I have some free time next Tuesday evening, does that work for you? If the time doesn\'t suit, that is fine too, we can reschedule.',
    },
    context: {
      zh: '约朋友出来时，给出具体时间而非模糊的"有空聚聚"',
      en: 'When asking a friend out, give a specific time instead of a vague "let\'s hang out sometime"',
    },
    analysis: {
      zh: '"下周二晚上"是具体可执行的提议，"你方便吗"尊重对方，"不合适也行"不给压力',
      en: '"Next Tuesday evening" is a concrete proposal, "does that work" respects them, "that is fine too" removes pressure',
    },
    variants: {
      zh: [
        '这周末有空吗？想去试试新开的那家店。',
        '下个月我比较忙，要不要趁这周先聚一下？',
      ],
      en: [
        'Are you free this weekend? I want to try that new place.',
        'I will be busy next month, want to meet up this week while we can?',
      ],
    },
    tags: ['约朋友', '具体时间', '不催促'],
    difficulty: 'beginner',
  },
  {
    id: 'dl-04',
    scenarioId: 'daily',
    content: {
      zh: '能不能麻烦你帮我带杯咖啡？美式不加糖，大杯的。太感谢了！回来我转账给你，或者下次帮你带。',
      en: 'Could I trouble you to grab me a coffee? Americano, no sugar, large. Thank you so much! I will transfer you the money when you are back, or bring you something next time.',
    },
    context: {
      zh: '请人帮忙时，需求具体+主动提回报',
      en: 'When asking for a favor, be specific about what you need and proactively offer to return it',
    },
    analysis: {
      zh: '"美式不加糖大杯"具体到不需要追问，"转账或下次帮你带"让对方不觉得吃亏，降低帮忙的心理成本',
      en: '"Americano no sugar large" is so specific no follow-up is needed, "transfer money or return favor" ensures they don\'t feel taken advantage of',
    },
    variants: {
      zh: [
        '帮我顺路拿个快递呗？回来给你带零食！',
        '能帮我占个座吗？我十分钟后到，谢谢你！',
      ],
      en: [
        'Can you grab my package on the way? I will bring you snacks!',
        'Can you save me a seat? I will be there in ten minutes, thanks!',
      ],
    },
    tags: ['请人帮忙', '具体需求', '回报'],
    difficulty: 'beginner',
  },
  {
    id: 'dl-05',
    scenarioId: 'daily',
    content: {
      zh: '你这个消息我之前也看到过，后来查了一下好像不太准确。我发你一个靠谱的来源，你看看？',
      en: 'I saw this news before too, but after checking it seems inaccurate. Let me send you a reliable source, want to take a look?',
    },
    context: {
      zh: '朋友转发了不实信息时，不直接说"这是假的"而是提供替代方案',
      en: 'When a friend shares misinformation, don\'t say "this is fake" directly, instead offer an alternative',
    },
    analysis: {
      zh: '"我也看到过"表示理解而非嘲笑，"查了一下"展示你的依据，"你看看"是建议而非纠正',
      en: '"I saw it too" shows understanding not mockery, "checked" shows your basis, "want to look" is a suggestion not a correction',
    },
    variants: {
      zh: [
        '这个好像有争议，我之前看到另一个说法，分享给你参考。',
        '我不太确定这个准不准，要不要一起查查看？',
      ],
      en: [
        'This seems controversial, I saw another view, sharing for your reference.',
        'I am not sure if this is accurate, want to check together?',
      ],
    },
    tags: ['纠正', '不伤面子', '提供依据'],
    difficulty: 'intermediate',
  },

  // ===== 冲突化解 (5条) =====
  {
    id: 'cf-01',
    scenarioId: 'conflict',
    content: {
      zh: '这件事我可能没法帮上忙，因为我这边也有不少事要处理。不过我可以帮你问问其他人，或者你试试XX途径？',
      en: 'I might not be able to help with this, as I have quite a few things to handle on my end. But I can ask around for you, or you could try the XX channel?',
    },
    context: {
      zh: '拒绝别人请求时，说清原因+提供替代方案',
      en: 'When refusing a request, explain why and offer an alternative',
    },
    analysis: {
      zh: '"没法帮"明确拒绝不含糊，"因为我也有事"是正当理由，"帮你问问"和"试试XX"提供替代，不让对方无助',
      en: '"Can\'t help" is a clear refusal, "I have things too" is a valid reason, "ask around" and "try XX" offer alternatives so they are not helpless',
    },
    variants: {
      zh: [
        '这个我确实不太方便，不好意思啊。要不你找找XX？',
        '我帮不了这个忙，但祝你顺利解决！',
      ],
      en: [
        'I really can\'t do this, sorry. Maybe try asking XX?',
        'I can\'t help with this, but I hope it works out for you!',
      ],
    },
    tags: ['拒绝', '替代方案', '不伤关系'],
    difficulty: 'intermediate',
  },
  {
    id: 'cf-02',
    scenarioId: 'conflict',
    content: {
      zh: '我刚才那句话说得不太合适，可能让你误会了。我的本意是说XX，不是针对你。如果让你不舒服了，我道歉。',
      en: 'What I said just now was not well put, it may have given you the wrong impression. I meant XX, not directed at you. If it made you uncomfortable, I apologize.',
    },
    context: {
      zh: '说错话引起误会时，及时澄清+道歉',
      en: 'When you say something that causes a misunderstanding, clarify promptly and apologize',
    },
    analysis: {
      zh: '"说得不太合适"承认问题，"本意是XX"澄清真实意思，"不是针对你"消除恶意揣测，"道歉"收尾',
      en: '"Not well put" acknowledges the issue, "meant XX" clarifies intent, "not directed at you" removes malice, "apologize" closes it',
    },
    variants: {
      zh: [
        '抱歉刚才说话没过脑子，我不是那个意思，别往心里去。',
        '我刚才表达有问题，重新说一下：我的意思是……',
      ],
      en: [
        'Sorry, I spoke without thinking, I didn\'t mean it that way, don\'t take it to heart.',
        'I expressed myself poorly just now, let me rephrase: what I meant was...',
      ],
    },
    tags: ['说错话', '澄清', '道歉'],
    difficulty: 'intermediate',
  },
  {
    id: 'cf-03',
    scenarioId: 'conflict',
    content: {
      zh: '我知道你也是好意，不过这个方式我可能不太能接受。我们能不能换个方式？比如XX这样，你觉得呢？',
      en: 'I know you mean well, but I am not quite comfortable with this approach. Could we try a different way? Like XX, what do you think?',
    },
    context: {
      zh: '别人好心但方式让你不舒服时，先认可善意再提出调整',
      en: 'When someone means well but their approach bothers you, acknowledge their intent then suggest an adjustment',
    },
    analysis: {
      zh: '"也是好意"先接住对方的善意，"不太能接受"温和但明确，"比如XX"给出具体替代，"你觉得呢"是协商而非命令',
      en: '"Mean well" receives their kindness first, "not comfortable" is gentle but clear, "like XX" gives a specific alternative, "what do you think" is negotiation not command',
    },
    variants: {
      zh: [
        '谢谢你想着我，不过这种方式我有点为难，能换一种吗？',
        '我知道你是为我好，但我更希望你能先问问我。',
      ],
      en: [
        'Thanks for thinking of me, but this approach is a bit difficult for me, can we try another?',
        'I know you mean well for me, but I would prefer you ask me first.',
      ],
    },
    tags: ['好意拒绝', '调整方式', '协商'],
    difficulty: 'advanced',
  },
  {
    id: 'cf-04',
    scenarioId: 'conflict',
    content: {
      zh: '这件事我确实做得不对，没有考虑到你的感受。我现在明白了，以后类似的情况我会先和你沟通。这次的事希望你能给我个机会弥补。',
      en: 'I was indeed in the wrong about this, I did not consider your feelings. I understand now, and in similar situations I will communicate with you first. I hope you can give me a chance to make up for this.',
    },
    context: {
      zh: '确实犯了错需要正式道歉时，承认+反思+承诺+请求',
      en: 'When you genuinely made a mistake and need to formally apologize: admit + reflect + commit + request',
    },
    analysis: {
      zh: '"确实不对"不找借口，"没考虑你的感受"精准说出错误，"以后先沟通"是具体承诺，"给个机会弥补"是行动请求',
      en: '"Indeed wrong" makes no excuses, "did not consider your feelings" precisely identifies the error, "communicate first" is a specific commitment, "chance to make up" is an action request',
    },
    variants: {
      zh: [
        '是我考虑不周，给你造成了困扰，真的很抱歉。以后我一定注意。',
        '这件事怪我，我应该提前和你说清楚的。对不起。',
      ],
      en: [
        'I was thoughtless and caused you trouble, I am truly sorry. I will definitely pay attention going forward.',
        'This is on me, I should have told you in advance. I am sorry.',
      ],
    },
    tags: ['正式道歉', '反思', '承诺'],
    difficulty: 'advanced',
  },
  {
    id: 'cf-05',
    scenarioId: 'conflict',
    content: {
      zh: '我理解你为什么会这么想。不过从另一个角度看，这件事还有XX种可能。我们不用急着下结论，先看看情况再说？',
      en: 'I understand why you would think that. But from another angle, there is also the possibility of XX. We don\'t need to rush to a conclusion, let\'s see how things develop first?',
    },
    context: {
      zh: '对方急于下负面结论时，先共情再提供新视角',
      en: 'When someone rushes to a negative conclusion, empathize first then offer a new perspective',
    },
    analysis: {
      zh: '"理解你为什么这么想"是共情而非否定，"另一个角度"不直接反驳而是扩展，"不急着下结论"建议暂停判断',
      en: '"Understand why" is empathy not denial, "another angle" expands rather than refutes, "no rush to conclude" suggests pausing judgment',
    },
    variants: {
      zh: [
        '我也觉得这事有点奇怪，不过也许有其他原因。要不要再等等看？',
        '你说的有道理，但我觉得可能不全是这个原因。我们再观察一下？',
      ],
      en: [
        'I also think this is a bit strange, but maybe there are other reasons. Want to wait and see?',
        'You make a fair point, but I think it might not be entirely for that reason. Shall we observe a bit more?',
      ],
    },
    tags: ['化解误解', '共情', '新视角'],
    difficulty: 'advanced',
  },
];

export function getPhrasesByScenario(scenarioId: string): Phrase[] {
  return phrases.filter((p) => p.scenarioId === scenarioId);
}

export function getPhraseById(id: string): Phrase | undefined {
  return phrases.find((p) => p.id === id);
}

export function getDailyPhrase(): Phrase {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return phrases[dayOfYear % phrases.length];
}
