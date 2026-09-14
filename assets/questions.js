// === 数据定义 ===
const timelineStages = [
    { name: "普通人", range: [0, 5] },
    { name: "非凡者之路", range: [6, 10] },
    { name: "中序列强者", range: [11, 17] },
    { name: "高序列存在", range: [18, 19] }
];

const questionsData = [
    {
        time: "落地成盒", title: "落地成盒", label: "炮灰",
        desc: "你穿越到了诡秘之主的世界，睁开眼睛发现自己躺在廷根市的一条阴暗小巷里。口袋里只有5苏勒和一些零钱，空气中弥漫着煤烟和不安的气息。你的第一步是？",
        options: [
            { text: "立刻去找最近的警察报案，说自己失忆了", isCorrect: false, reason: "廷根警方早已被邪神信徒渗透，你直接被当成祭品。", achievement: { name: "最速传说", desc: "落地成盒速度极快，创造了新的死亡记录" } },
            { text: "找一家便宜的旅馆先住下，观察几天", isCorrect: true },
            { text: "大声呼救，希望有好心人帮助", isCorrect: false, reason: "引来了在暗处游荡的怪物，你成为了它的口粮。" },
            { text: "掏出手机想查看地图……等等，这是诡秘世界", isCorrect: false, reason: "你暴露了自己是'异界之人'，被密修会盯上。", achievement: { name: "逻辑鬼才", desc: "在诡秘世界掏出手机试图查地图，你是想用5G信号定位廷根市吗？" } }
        ]
    },
    {
        time: "1小时", title: "1小时", label: "短命鬼",
        desc: "你正在旅馆房间里整理思绪，突然收到一封没有署名的信，信中说知道你'不属于这个世界'，邀请你今晚去码头区的一个废弃仓库见面，声称可以帮你'回家'。你会？",
        options: [
            { text: "准时赴约，无论如何也要找到回家的方法", isCorrect: false, reason: "这是玫瑰学派的陷阱，你的灵魂被制成傀儡。" },
            { text: "提前去踩点，远远观察是谁在搞鬼", isCorrect: false, reason: "对方是高序列非凡者，你被发现后直接灭口。" },
            { text: "无视这封信，立刻收拾行李转移住处", isCorrect: true },
            { text: "在房间里等待，想看看对方会不会找上门", isCorrect: false, reason: "极光会信徒直接破门而入，你连逃跑的机会都没有。", achievement: { name: "等等党", desc: "在房间等极光会自己上门，嗯...至少你很有耐心" } }
        ]
    },
    {
        time: "1天", title: "1天", label: "存活一日",
        desc: "一个自称'老尼尔朋友'的人找到你，说看你骨骼惊奇，可以免费送你一份'观众'途径序列9的魔药，条件是你要帮他'监视'黑荆棘安保公司的动向。你会？",
        options: [
            { text: "拒绝并立刻前往黑荆棘安保公司报告", isCorrect: true },
            { text: "接受魔药，成为非凡者再说", isCorrect: false, reason: "魔药中被下了精神印记，你成为密修会的傀儡，最终精神崩溃而亡。" },
            { text: "假装答应，拿到魔药后立刻逃跑", isCorrect: false, reason: "对方在魔药中留下了追踪手段，你逃跑后被追上灭口。", achievement: { name: "最佳影帝", desc: "想骗密修会的魔药？人家可是专业的骗子组织" } },
            { text: "直接拒绝，但选择不举报，多一事不如少一事", isCorrect: false, reason: "这个密修会成员认为你知道太多，当晚就派人解决你。" }
        ]
    },
    {
        time: "3天", title: "3天", label: "存活三日",
        desc: "深夜，你偶然发现一个巷子里正在进行某种神秘仪式，几个黑袍人围着一个奇怪的符号念念有词。你认出那是'真实造物主'的信徒！你会？",
        options: [
            { text: "立刻大声呼救，希望引起注意", isCorrect: false, reason: "极光会会瞬间杀你灭口，你的尸体被献祭给邪神。" },
            { text: "蹲下来观察，想确认他们在干什么", isCorrect: false, reason: "被发现后，你被强行拖入仪式，成为祭品。", achievement: { name: "战地记者", desc: "看到邪神仪式不跑还蹲下来看，你是战地记者吗？" } },
            { text: "掏出身上所有的钱，试图贿赂他们", isCorrect: false, reason: "极光会对金钱不感兴趣，你白白送命。", achievement: { name: "经济学大师", desc: "试图用金钱贿赂极光会，他们只对灵魂感兴趣" } },
            { text: "悄悄后退，以最快速度去报告值夜者", isCorrect: true }
        ]
    },
    {
        time: "1周", title: "1周", label: "存活一周",
        desc: "一位优雅的女士询问你有没有见到她失踪的丈夫，你超强的灵性直觉让你看到了极为恐怖的画面——她丈夫已经变成怪物了！而且怪物正在接近你们！你会？",
        options: [
            { text: "如实告诉女士真相，让她一起逃跑", isCorrect: false, reason: "普通人听到真相会发疯，她尖叫引来了怪物，你们都死了。", achievement: { name: "猪队友", desc: "在诡秘世界，有时隐瞒比坦白更重要" } },
            { text: "尝试拿起小刀，用你微弱的非凡能力对抗怪物", isCorrect: false, reason: "序列9的你能做什么？怪物轻易撕碎了你。", achievement: { name: "物理驱魔", desc: "序列9就敢刚怪物，勇气可嘉" } },
            { text: "自己悄悄逃跑，不管其他人", isCorrect: false, reason: "怪物已经锁定了你，逃跑时被追上。" },
            { text: "撒谎说知道位置，拉着女士立刻离开并报告值夜者", isCorrect: true }
        ]
    },
    {
        time: "2周", title: "2周", label: "存活半月",
        desc: "你成功成为了一名'观众'，但消化魔药的速度很慢。这时一个神秘人告诉你，可以通过'扮演法'加速消化，但具体怎么扮演他不肯说。你会？",
        options: [
            { text: "去剧院应聘，在舞台上观察“观众们”是什么样的状态", isCorrect: false, reason: "理解错误，魔药失控，你在舞台上精神崩溃。", achievement: { name: "社死现场", desc: "反向扮演，克莱恩听了都无语" } },
            { text: "不吃不喝，整天盯着别人看", isCorrect: false, reason: "被当成变态抓起来，在监狱中魔药失控。", achievement: { name: "卷王之王", desc: "为了消化魔药连命都不要，卷到这种程度至于吗？" } },
            { text: "花钱购买扮演法的详细资料", isCorrect: false, reason: "买到错误信息，错误的扮演导致魔药反噬。", achievement: { name: "氪金玩家", desc: "在诡秘世界还想着氪金变强，可惜这里不卖648礼包" } },
            { text: "通过观察他人、分析心理来'扮演'观众", isCorrect: true }
        ]
    },
    {
        time: "1月", title: "1月", label: "存活一月",
        desc: "序列9的魔药即将消化完成，你需要序列8'读心者'的配方。有人告诉你，地下集市可以买到，但价格不菲。你会？",
        options: [
            { text: "直接去地下集市购买", isCorrect: false, reason: "被骗子盯上，买到假配方，晋升时魔药失控而死。" },
            { text: "寻找野生非凡者，想办法'借'他的配方", isCorrect: false, reason: "对方是序列7的强者，你反被制服后灭口。", achievement: { name: "零元购", desc: "试图抢劫非凡者，结果变成了被抢劫的对象" } },
            { text: "尝试自己研究配方", isCorrect: false, reason: "没有相关知识，实验失败导致爆炸身亡。" },
            { text: "慢慢积累功勋向值夜者申请", isCorrect: true }
        ]
    },
    {
        time: "2月", title: "2月", label: "存活两月",
        desc: "作为值夜者的一员，你第一次接触到封印物——一个会说话的镜子。它说可以满足你一个愿望，作为代价只是要你说出自己的一个秘密。你会？",
        options: [
            { text: "许一个普通的愿望，说一个无关紧要的秘密", isCorrect: false, reason: "封印物通过秘密锁定你的灵魂，你成为它的奴隶。", achievement: { name: "魔镜魔镜", desc: "不是所有会说话的镜子都很善良，你成了它的奴隶" } },
            { text: "试图套出这个封印物的来历和能力", isCorrect: false, reason: "被封印物反噬，精神污染导致疯狂。", achievement: { name: "封印物驯兽师", desc: "试图套路封印物，反被封印物套路" } },
            { text: "许愿获得更强的力量", isCorrect: false, reason: "贪婪的代价是被封印物完全控制，生不如死。" },
            { text: "严格遵守规定，不与封印物交流", isCorrect: true }
        ]
    },
    {
        time: "3月", title: "3月", label: "存活三月",
        desc: "在一次任务中，你意外听到了'真实造物主'的呓语，脑海中开始出现疯狂的呢喃。你会？",
        options: [
            { text: "凭借意志力硬扛过去", isCorrect: false, reason: "普通人的精神无法抵抗，你最终发疯自杀。", achievement: { name: "微笑面对危险", desc: "凭借意志力硬扛邪神呓语，你的精神很强大，就是肉体先撑不住了" } },
            { text: "去酒吧买醉，试图忘记", isCorrect: false, reason: "酒精无法对抗精神污染，疯狂加剧。", achievement: { name: "酒精杀毒", desc: "试图用酒精对抗邪神呓语，你的肝可能比你的意志更坚强" } },
            { text: "尝试用冥想来平复", isCorrect: false, reason: "有一定效果但不保险，最终仍被污染。" },
            { text: "立刻向队长报告，接受净化仪式", isCorrect: true }
        ]
    },
    {
        time: "4月", title: "4月", label: "存活四月",
        desc: "一位神秘人邀请你参加一个'非凡者互助聚会'，说可以交易情报和物资。你会？",
        options: [
            { text: "独自前往，隐藏身份参加", isCorrect: false, reason: "被发现是值夜者，被聚会中的邪教徒围杀。" },
            { text: "带一件强力封印物防身前往", isCorrect: false, reason: "封印物失控，你死于不明AOE。" },
            { text: "拒绝参加，太危险了", isCorrect: false, reason: "邀请者认为你软弱可欺，当晚就派人'处理'你。", achievement: { name: "极限拉扯", desc: "拒绝邀请后被灭口，证明了'不选也是一种选择'" } },
            { text: "先向上级汇报，在监视下参加", isCorrect: true }
        ]
    },
    {
        time: "6月", title: "6月", label: "半年浮沉",
        desc: "你正在贝克兰德，突然听说东区和码头区出现了奇怪的雾霾，很多人开始生病。你认出这是传说中的'大雾霾事件'！你会？",
        options: [
            { text: "立刻去东区救人，用你的能力帮助平民", isCorrect: false, reason: "吸入雾霾中的毒素，你倒在了救援途中。", achievement: { name: "英雄主义", desc: "好人不长命，在诡秘世界当英雄尤其短命" } },
            { text: "准备逃离贝克兰德，这里太危险了", isCorrect: false, reason: "逃跑时被极光会截杀，他们认为你知道太多。" },
            { text: "寻找污染源，尝试阻止这场灾难", isCorrect: false, reason: "太危险了，对手是邪神子嗣，你被瞬间秒杀。" },
            { text: "联系塔罗会或正神教会，寻求支援", isCorrect: true }
        ]
    },
    {
        time: "8月", title: "8月", label: "存活八月",
        desc: "你收到极光会A先生的'邀请'——要么加入极光会，要么死。你会？",
        options: [
            { text: "假意加入，伺机逃跑", isCorrect: false, reason: "A先生很难欺骗，你被识破后直接处决。" },
            { text: "坚决拒绝，宁死不屈", isCorrect: false, reason: "A先生成全了你的'愿望'。", achievement: { name: "正义的伙伴", desc: "宁死不屈确实很有骨气，就是结局确实死了" } },
            { text: "尝试与A先生谈判", isCorrect: false, reason: "极度危险，A先生没有耐心，直接杀了你。", achievement: { name: "硬核谈判", desc: "试图和极光会狂信徒讲道理，你的口才很好，就是命不好" } },
            { text: "寻求教会的庇护，同时转移家人", isCorrect: true }
        ]
    },
    {
        time: "10月", title: "10月", label: "存活十月",
        desc: "你在扮演'心理医生'消化魔药时，对一个无辜的人使用了'心理暗示'来满足自己的扮演欲。事后你感到魔药确实消化了一些。你会？",
        options: [
            { text: "继续这样做，效率很高", isCorrect: false, reason: "逐渐失控，最终精神崩溃变成怪物。" },
            { text: "不再对人使用，改对动物使用", isCorrect: false, reason: "仍然在钻空子，最终魔药反噬。", achievement: { name: "卡BUG大师", desc: "试图卡扮演法的BUG，结果被系统（魔药）封号" } },
            { text: "找心理医生治疗自己", isCorrect: false, reason: "没有非凡者心理医生，普通人帮不了你。" },
            { text: "意识到不对，停止这种行为并忏悔", isCorrect: true }
        ]
    },
    {
        time: "1年", title: "1年", label: "年度幸存",
        desc: "你终于集齐了序列7'催眠师'的材料，但在准备晋升时，你发现主材料可能被人动过手脚。你会？",
        options: [
            { text: "不管了，晋升要紧", isCorrect: false, reason: "材料被污染，晋升仪式中你变成了失控的怪物。" },
            { text: "减少材料用量，降低风险", isCorrect: false, reason: "配方不能随意更改，晋升失败身亡。", achievement: { name: "诺贝尔化学奖", desc: "擅自改动魔药配方，你比罗塞尔还大胆，死的也比他快" } },
            { text: "找人鉴定材料是否被污染", isCorrect: false, reason: "鉴定者被敌人收买，给了你错误信息。" },
            { text: "重新收集材料", isCorrect: true }
        ]
    },
    {
        time: "1.5年", title: "1.5年", label: "存活一年半",
        desc: "你偶然发现了某个天使家族的秘密，被他们的代理人找上门来。他们说给你两个选择：要么成为他们的傀儡，要么死。你会？",
        options: [
            { text: "成为傀儡，等待反击机会", isCorrect: false, reason: "很难摆脱控制，最终被榨干价值后丢弃。" },
            { text: "寻求其他势力的庇护", isCorrect: false, reason: "对方势力不想得罪天使家族，把你交了出来。" },
            { text: "公开这个秘密，鱼死网破", isCorrect: false, reason: "会死得很惨，连灵魂都被消灭。", achievement: { name: "极限一换一", desc: "想鱼死网破，结果鱼死了，网没破" } },
            { text: "假死脱身，隐姓埋名离开贝克兰德", isCorrect: true }
        ]
    },
    {
        time: "2年", title: "2年", label: "存活两年",
        desc: "你在一次冒险中发现了一张'亵渎之牌'——黑皇帝牌！持有者可以获得对应的序列途径知识。你会？",
        options: [
            { text: "立刻使用，获得知识", isCorrect: false, reason: "非凡特性聚合定律吸引来敌人，当晚被暗杀。" },
            { text: "公开展示，换取名声", isCorrect: false, reason: "引来无数贪婪的目光，死于多方争夺。" },
            { text: "卖给有需要的大势力", isCorrect: false, reason: "交易时被黑吃黑，财牌两空，命也丢了。", achievement: { name: "清仓甩卖", desc: "拿到亵渎之牌想变现，结果连命一起清算了" } },
            { text: "封印起来，等实力更强再研究", isCorrect: true }
        ]
    },
    {
        time: "3年", title: "3年", label: "存活三年",
        desc: "为了寻找晋升材料，你必须进入神弃之地。那里没有阳光，到处都是变异怪物和堕落者。你会？",
        options: [
            { text: "独自进入，相信自己的能力", isCorrect: false, reason: "死亡率极高，你成了怪物的食物。", achievement: { name: "单挑之王", desc: "单刷神弃之地，你以为你是阿蒙还是克莱恩？" } },
            { text: "贿赂极光会，让他们提供路线", isCorrect: false, reason: "与虎谋皮，他们把你当成探路的炮灰。" },
            { text: "组建一支强大的探险队", isCorrect: false, reason: "队伍中有内鬼，你被背叛后抛尸荒野。" },
            { text: "寻找熟悉神弃之地的向导", isCorrect: true }
        ]
    },
    {
        time: "5年", title: "5年", label: "存活五年",
        desc: "你意外发现了一份序列0'空想家'的唯一性线索！这意味着成神的机会，但也意味着你会成为众矢之的。你会？",
        options: [
            { text: "全力争取，这是成神的机会", isCorrect: false, reason: "太危险了，被亚当和其他天使群起而攻。" },
            { text: "公开情报，让各方势力混战", isCorrect: false, reason: "被战火波及，死于不明AOE。", achievement: { name: "信息战专家", desc: "把唯一性情报公开，你是想让全世界为你陪葬吗？" } },
            { text: "将情报卖给亚当或心理炼金会", isCorrect: false, reason: "他们知道你知道太多，事后灭口。" },
            { text: "保守秘密，等实力足够再行动", isCorrect: true }
        ]
    },
    {
        time: "半神", title: "半神", label: "神话生物",
        desc: "你即将晋升序列4，成为半神。但你需要建立足够的'锚'来稳定自己的人性。你会选择什么样的锚？",
        options: [
            { text: "金钱和权力，这是最直接的力量", isCorrect: false, reason: "过于世俗的锚不够稳固，晋升时人性崩溃。", achievement: { name: "锚定失败", desc: "用金钱当锚，恭喜你成为最庸俗的神，也是最短命的神" } },
            { text: "对某个理念或事业的极端追求", isCorrect: false, reason: "走极端导致疯狂，成为疯狂的邪神。" },
            { text: "家人和朋友的爱", isCorrect: false, reason: "温暖但风险在于他们的安全，敌人攻击你的锚，你随之陨落。" },
            { text: "对普通人的保护欲和责任感", isCorrect: true }
        ]
    },
    {
        time: "序列0", title: "序列0", label: "真神之路",
        desc: "你已经触及序列0，成为了这个世界上接近顶端的存在。末日将至，外神即将入侵。面对'最初造物主'苏醒的大势，你会？",
        options: [
            { text: "尝试唤醒最初造物主，让一切重启", isCorrect: false, reason: "等同于自杀，你被最初造物主吞噬。", achievement: { name: "最初的舔狗", desc: "试图唤醒最初造物主，结果被一口吞了，舔到最后一无所有" } },
            { text: "大战中序列0也没什么用，逃离地球", isCorrect: false, reason: "星空同样危险，外神在等着你。", achievement: { name: "星空移民", desc: "地球太危险，你以为星空就安全了？" } },
            { text: "投靠外神，换取生存机会", isCorrect: false, reason: "会成为邪神眷属，失去自我，生不如死。", achievement: { name: "邪神眷属", desc: "投降派没有好下场，你连当眷属都不配" } },
            { text: "与其他序列0合作，建立屏障抵抗外神", isCorrect: true, achievement: { name: "赞美愚者", desc: "你选择了克莱恩的道路，成为救世主之一" } }
        ]
    }
];
