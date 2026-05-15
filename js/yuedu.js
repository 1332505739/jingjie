/* ============================================
   静界 · 阅读室 — 经典数据
   佛 · 道 · 儒
   ============================================ */

const library = {

  buddhist: {
    name: '佛家',
    icon: '☸',
    texts: [
      {
        id: 'heart-sutra',
        title: '般若波罗蜜多心经',
        author: '唐 · 玄奘 译',
        desc: '大乘佛教最短的经典，260字道尽般若智慧。',
        chapters: [
          {
            title: '全文',
            content: `观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。

舍利子，色不异空，空不异色，色即是空，空即是色，受想行识，亦复如是。

舍利子，是诸法空相：不生不灭，不垢不净，不增不减。是故空中无色，无受想行识，无眼耳鼻舌身意，无色声香味触法，无眼界，乃至无意识界。无无明，亦无无明尽，乃至无老死，亦无老死尽。无苦集灭道，无智亦无得，以无所得故。

菩提萨埵，依般若波罗蜜多故，心无挂碍；无挂碍故，无有恐怖，远离颠倒梦想，究竟涅槃。

三世诸佛，依般若波罗蜜多故，得阿耨多罗三藐三菩提。故知般若波罗蜜多，是大神咒，是大明咒，是无上咒，是无等等咒，能除一切苦，真实不虚。

故说般若波罗蜜多咒，即说咒曰：
揭谛揭谛，波罗揭谛，波罗僧揭谛，菩提萨婆诃。`
          }
        ]
      },
      {
        id: 'diamond-sutra',
        title: '金刚般若波罗蜜经',
        author: '姚秦 · 鸠摩罗什 译',
        desc: '破一切相，应无所住而生其心。',
        chapters: [
          {
            title: '第一品 · 法会因由分',
            content: `如是我闻。一时，佛在舍卫国祇树给孤独园，与大比丘众千二百五十人俱。尔时，世尊食时，著衣持钵，入舍卫大城乞食。于其城中，次第乞已，还至本处。饭食讫，收衣钵，洗足已，敷座而坐。`
          },
          {
            title: '第二品 · 善现启请分',
            content: `时，长老须菩提在大众中，即从座起，偏袒右肩，右膝著地，合掌恭敬而白佛言："希有世尊！如来善护念诸菩萨，善付嘱诸菩萨。世尊！善男子善女人，发阿耨多罗三藐三菩提心，云何应住？云何降伏其心？"

佛言："善哉，善哉。须菩提！如汝所说，如来善护念诸菩萨，善付嘱诸菩萨。汝今谛听，当为汝说。善男子善女人，发阿耨多罗三藐三菩提心，应如是住，如是降伏其心。"

"唯然。世尊！愿乐欲闻。"`
          },
          {
            title: '第三品 · 大乘正宗分',
            content: `佛告须菩提："诸菩萨摩诃萨，应如是降伏其心：所有一切众生之类，若卵生，若胎生，若湿生，若化生；若有色，若无色；若有想，若无想，若非有想非无想，我皆令入无余涅槃而灭度之。如是灭度无量无数无边众生，实无众生得灭度者。何以故？须菩提！若菩萨有我相、人相、众生相、寿者相，即非菩萨。"`
          },
          {
            title: '第四品 · 妙行无住分',
            content: `"复次，须菩提！菩萨于法，应无所住行于布施，所谓不住色布施，不住声香味触法布施。须菩提！菩萨应如是布施，不住于相。何以故？若菩萨不住相布施，其福德不可思量。"

"须菩提！于意云何？东方虚空可思量不？"

"不也，世尊！"

"须菩提！南西北方、四维上下虚空，可思量不？"

"不也，世尊！"

"须菩提！菩萨无住相布施，福德亦复如是不可思量。须菩提！菩萨但应如所教住。"`
          },
          {
            title: '第五品 · 如理实见分',
            content: `"须菩提！于意云何？可以身相见如来不？"

"不也，世尊！不可以身相得见如来。何以故？如来所说身相，即非身相。"

佛告须菩提："凡所有相，皆是虚妄。若见诸相非相，即见如来。"`
          }
        ]
      },
      {
        id: 'platform-sutra',
        title: '六祖坛经 · 行由品',
        author: '唐 · 惠能',
        desc: '中国禅宗的基石。惠能大师自述得法因缘。',
        chapters: [
          {
            title: '菩提偈',
            content: `惠能大师告众曰：

"菩提本无树，明镜亦非台。
本来无一物，何处惹尘埃。"

此偈是对神秀大师"身是菩提树，心如明镜台。时时勤拂拭，勿使惹尘埃"的回应。神秀讲的是修行的过程——时时勤拂拭。惠能讲的是修行的本质——本来无一物。

两首偈子不是对错关系，而是深浅关系。一个讲方法，一个讲见地。修行人两个都需要。`
          },
          {
            title: '风动幡动',
            content: `惠能至广州法性寺。值印宗法师讲《涅槃经》。时有风吹幡动。一僧曰风动，一僧曰幡动，议论不已。惠能进曰："不是风动，不是幡动，仁者心动。"一众骇然。

这一句话，把禅宗的核心说尽了：外在的一切现象，最终都归结于心的活动。世界是怎样的，取决于你的心怎样看它。`
          }
        ]
      }
    ]
  },

  daoist: {
    name: '道家',
    icon: '☯',
    texts: [
      {
        id: 'daodejing',
        title: '道德经',
        author: '春秋 · 老子',
        desc: '五千言，道尽宇宙人生的根本智慧。',
        chapters: [
          {
            title: '第一章 · 道可道',
            content: `道可道，非常道；名可名，非常名。
无名，天地之始；有名，万物之母。
故常无欲，以观其妙；常有欲，以观其徼。
此两者，同出而异名，同谓之玄。
玄之又玄，众妙之门。`
          },
          {
            title: '第八章 · 上善若水',
            content: `上善若水。水善利万物而不争，处众人之所恶，故几于道。
居善地，心善渊，与善仁，言善信，政善治，事善能，动善时。
夫唯不争，故无尤。`
          },
          {
            title: '第十六章 · 致虚极',
            content: `致虚极，守静笃。万物并作，吾以观复。
夫物芸芸，各复归其根。归根曰静，静曰复命。复命曰常，知常曰明。
不知常，妄作凶。知常容，容乃公，公乃全，全乃天，天乃道，道乃久，没身不殆。`
          },
          {
            title: '第二十二章 · 曲则全',
            content: `曲则全，枉则直，洼则盈，敝则新，少则得，多则惑。
是以圣人抱一为天下式。
不自见，故明；不自是，故彰；不自伐，故有功；不自矜，故长。
夫唯不争，故天下莫能与之争。
古之所谓"曲则全"者，岂虚言哉？诚全而归之。`
          },
          {
            title: '第三十三章 · 自知者明',
            content: `知人者智，自知者明。
胜人者有力，自胜者强。
知足者富。
强行者有志。
不失其所者久。
死而不亡者寿。`
          }
        ]
      },
      {
        id: 'zhuangzi',
        title: '庄子 · 逍遥游',
        author: '战国 · 庄周',
        desc: '北冥有鱼，其名为鲲。鲲之大，不知其几千里也。',
        chapters: [
          {
            title: '逍遥游（节选）',
            content: `北冥有鱼，其名为鲲。鲲之大，不知其几千里也。化而为鸟，其名为鹏。鹏之背，不知其几千里也。怒而飞，其翼若垂天之云。是鸟也，海运则将徙于南冥。南冥者，天池也。

小知不及大知，小年不及大年。奚以知其然也？朝菌不知晦朔，蟪蛄不知春秋，此小年也。楚之南有冥灵者，以五百岁为春，五百岁为秋；上古有大椿者，以八千岁为春，八千岁为秋。而彭祖乃今以久特闻，众人匹之，不亦悲乎！

故夫知效一官，行比一乡，德合一君，而征一国者，其自视也亦若此矣。而宋荣子犹然笑之。且举世誉之而不加劝，举世非之而不加沮，定乎内外之分，辩乎荣辱之境，斯已矣。彼其于世，未数数然也。虽然，犹有未树也。

夫列子御风而行，泠然善也，旬有五日而后反。彼于致福者，未数数然也。此虽免乎行，犹有所待者也。若夫乘天地之正，而御六气之辩，以游无穷者，彼且恶乎待哉？故曰：至人无己，神人无功，圣人无名。`
          },
          {
            title: '庄周梦蝶',
            content: `昔者庄周梦为蝴蝶，栩栩然蝴蝶也，自喻适志与！不知周也。俄然觉，则蘧蘧然周也。不知周之梦为蝴蝶与，蝴蝶之梦为周与？周与蝴蝶，则必有分矣。此之谓物化。`
          }
        ]
      }
    ]
  },

  confucian: {
    name: '儒家',
    icon: '📜',
    texts: [
      {
        id: 'daxue',
        title: '大学',
        author: '春秋 · 曾子',
        desc: '三纲领八条目，儒家修身的总纲领。',
        chapters: [
          {
            title: '经一章',
            content: `大学之道，在明明德，在亲民，在止于至善。

知止而后有定，定而后能静，静而后能安，安而后能虑，虑而后能得。物有本末，事有终始，知所先后，则近道矣。

古之欲明明德于天下者，先治其国；欲治其国者，先齐其家；欲齐其家者，先修其身；欲修其身者，先正其心；欲正其心者，先诚其意；欲诚其意者，先致其知；致知在格物。

物格而后知至，知至而后意诚，意诚而后心正，心正而后身修，身修而后家齐，家齐而后国治，国治而后天下平。

自天子以至于庶人，壹是皆以修身为本。其本乱而末治者否矣。其所厚者薄，而其所薄者厚，未之有也。`
          }
        ]
      },
      {
        id: 'zhongyong',
        title: '中庸',
        author: '战国 · 子思',
        desc: '中不偏，庸不易。儒家心法的最高表达。',
        chapters: [
          {
            title: '第一章',
            content: `天命之谓性，率性之谓道，修道之谓教。

道也者，不可须臾离也，可离非道也。是故君子戒慎乎其所不睹，恐惧乎其所不闻。莫见乎隐，莫显乎微，故君子慎其独也。

喜怒哀乐之未发，谓之中；发而皆中节，谓之和。中也者，天下之大本也；和也者，天下之达道也。致中和，天地位焉，万物育焉。`
          }
        ]
      },
      {
        id: 'lunyu',
        title: '论语 · 学而篇',
        author: '春秋 · 孔子及其弟子',
        desc: '半部论语治天下。儒家思想的源头活水。',
        chapters: [
          {
            title: '学而第一（节选）',
            content: `子曰："学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？"

有子曰："其为人也孝弟，而好犯上者，鲜矣；不好犯上，而好作乱者，未之有也。君子务本，本立而道生。孝弟也者，其为仁之本与！"

子曰："巧言令色，鲜矣仁！"

曾子曰："吾日三省吾身：为人谋而不忠乎？与朋友交而不信乎？传不习乎？"

子曰："君子食无求饱，居无求安，敏于事而慎于言，就有道而正焉，可谓好学也已。"

子曰："不患人之不己知，患不知人也。"`
          }
        ]
      }
    ]
  }
};

// ==========================================
// 阅读器交互逻辑
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  let currentTradition = 'buddhist';
  let currentText = null;
  let currentChapter = 0;

  const libraryView = document.getElementById('libraryView');
  const readerView = document.getElementById('readerView');
  const textList = document.getElementById('textList');
  const readerContent = document.getElementById('readerContent');
  const chapterIndicator = document.getElementById('chapterIndicator');
  const readingProgress = document.getElementById('readingProgress');

  // ==========================================
  // Render text list for a tradition
  // ==========================================
  function renderTextList(tradition) {
    currentTradition = tradition;
    const data = library[tradition];
    if (!data || !textList) return;

    textList.innerHTML = data.texts.map((text, i) => `
      <div class="glass text-card fade-in visible" style="cursor:pointer; transition-delay:${i * 0.08}s;" data-text-id="${text.id}">
        <div class="text-card-header">
          <h3 class="text-card-title">${text.title}</h3>
          <span class="text-card-badge">${text.chapters.length} 章</span>
        </div>
        <p class="text-card-author">${text.author}</p>
        <p class="text-card-desc">${text.desc}</p>
      </div>
    `).join('');

    // Bind click events
    textList.querySelectorAll('.text-card').forEach(card => {
      card.addEventListener('click', () => {
        const textId = card.dataset.textId;
        const text = data.texts.find(t => t.id === textId);
        if (text) openReader(text);
      });
    });
  }

  // ==========================================
  // Open reader
  // ==========================================
  function openReader(text) {
    currentText = text;
    currentChapter = 0;
    libraryView.style.display = 'none';
    readerView.style.display = 'block';
    renderChapter();
    window.scrollTo(0, 0);
  }

  // ==========================================
  // Render current chapter
  // ==========================================
  function renderChapter() {
    if (!currentText) return;
    const ch = currentText.chapters[currentChapter];

    readerContent.innerHTML = `
      <div class="chapter-header">
        <div class="chapter-book-title">${currentText.title}</div>
        <div class="chapter-book-author">${currentText.author}</div>
        <div class="divider divider-center"></div>
      </div>
      <h2 class="chapter-title">${ch.title}</h2>
      <div class="chapter-body">${ch.content.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')}</div>
    `;

    // Update nav
    const total = currentText.chapters.length;
    chapterIndicator.textContent = `${currentChapter + 1} / ${total}`;
    document.getElementById('btnPrev').disabled = currentChapter === 0;
    document.getElementById('btnNext').disabled = currentChapter >= total - 1;

    // Reading progress
    if (readingProgress) {
      const pct = ((currentChapter + 1) / total) * 100;
      readingProgress.style.width = pct + '%';
    }

    // Scroll reveal
    setTimeout(() => {
      const els = readerContent.querySelectorAll('.chapter-header, .chapter-title, .chapter-body');
      els.forEach(el => el.classList.add('visible'));
    }, 100);
  }

  // ==========================================
  // Navigation
  // ==========================================
  function goPrev() {
    if (currentChapter > 0) {
      currentChapter--;
      renderChapter();
      window.scrollTo(0, 0);
    }
  }

  function goNext() {
    if (currentText && currentChapter < currentText.chapters.length - 1) {
      currentChapter++;
      renderChapter();
      window.scrollTo(0, 0);
    }
  }

  function backToLibrary() {
    readerView.style.display = 'none';
    libraryView.style.display = 'block';
    currentText = null;
    if (readingProgress) readingProgress.style.width = '0%';
    window.scrollTo(0, 0);
  }

  // ==========================================
  // Event listeners
  // ==========================================
  document.getElementById('btnBack').addEventListener('click', backToLibrary);
  document.getElementById('btnPrev').addEventListener('click', goPrev);
  document.getElementById('btnNext').addEventListener('click', goNext);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!currentText) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
    if (e.key === 'Escape') backToLibrary();
  });

  // Tradition tabs
  document.getElementById('traditionTabs').querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('traditionTabs').querySelectorAll('[data-tab]').forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-glass');
      });
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-glass');
      renderTextList(btn.dataset.tab);
    });
  });

  // Init
  renderTextList('buddhist');

});
