/* ============================================
   静界 · 日签数据
   佛10 / 道10 / 儒10 — 三家并行
   ============================================ */

const riqianData = [
  // ☸ 佛家 (1-10)
  { quote: '应无所住而生其心。', author: '《金刚经》', tradition: '佛', note: '不住在任何地方，心反而是最自由的。' },
  { quote: '菩提本无树，明镜亦非台。', author: '惠能', tradition: '佛', note: '本来无一物，何处惹尘埃。' },
  { quote: '色即是空，空即是色。', author: '《心经》', tradition: '佛', note: '物质世界的本质是流动的能量。' },
  { quote: '一花一世界，一叶一菩提。', author: '《华严经》', tradition: '佛', note: '每一个微小的存在都包含着整个宇宙。' },
  { quote: '不是风动，不是幡动，仁者心动。', author: '惠能', tradition: '佛', note: '外境不变，变的是你的心在怎么解读。' },
  { quote: '烦恼即菩提。', author: '《坛经》', tradition: '佛', note: '烦恼不是敌人，是觉知的入口。' },
  { quote: '过去心不可得，现在心不可得，未来心不可得。', author: '《金刚经》', tradition: '佛', note: '三心不可得——那就安住当下。' },
  { quote: '日日是好日。', author: '云门文偃', tradition: '佛', note: '不是日子变好了，是你开始好好过日子了。' },
  { quote: '放下，不是放弃。', author: '禅语', tradition: '佛', note: '放下的是执着，不是生活本身。' },
  { quote: '看山是山，看水是水。', author: '青原惟信', tradition: '佛', note: '修行三境界——最终回到最简单的地方。' },

  // ☯ 道家 (11-20)
  { quote: '上善若水。水善利万物而不争。', author: '老子', tradition: '道', note: '最高的善像水——柔软而有力，流向最低处。' },
  { quote: '致虚极，守静笃。', author: '老子', tradition: '道', note: '回到最虚空、最安静的状态——那是力量的源头。' },
  { quote: '大音希声，大象无形。', author: '老子', tradition: '道', note: '真正重要的东西，往往看不见。' },
  { quote: '道法自然。', author: '老子', tradition: '道', note: '道向谁学？只向自己学。你最终要学的，也是回到自己的本性。' },
  { quote: '为学日益，为道日损。', author: '老子', tradition: '道', note: '学习是每天增加，修道是每天减少。' },
  { quote: '柔弱胜刚强。', author: '老子', tradition: '道', note: '水最软，但能穿石。真正的力量不张扬。' },
  { quote: '清静为天下正。', author: '老子', tradition: '道', note: '清静——你的心不乱，世界就不乱。' },
  { quote: '知足者富。', author: '老子', tradition: '道', note: '知足就是富有。不因为拥有得多，因为计较得少。' },
  { quote: '千里之行，始于足下。', author: '老子', tradition: '道', note: '再远的路，从脚下这一步开始。修行也是。' },
  { quote: '相濡以沫，不如相忘于江湖。', author: '庄子', tradition: '道', note: '最好的关系不是你依靠我我依靠你，是各自在自己的江湖里自由自在。' },

  // 📜 儒家 (21-30)
  { quote: '吾日三省吾身。', author: '曾子', tradition: '儒', note: '每天三次自我反省——替人谋事尽心了吗？与友交往诚信了吗？学会的实践了吗？' },
  { quote: '己所不欲，勿施于人。', author: '孔子', tradition: '儒', note: '你自己不想要的，不要加给别人。一句话说尽了世间伦理。' },
  { quote: '君子求诸己，小人求诸人。', author: '孔子', tradition: '儒', note: '出问题先看自己哪里没做好——不是自我攻击，是自我负责。' },
  { quote: '克己复礼为仁。', author: '孔子', tradition: '儒', note: '克服自私的本能，回归对他人的尊重。「为仁由己」——这件事全在你。' },
  { quote: '三人行，必有我师焉。', author: '孔子', tradition: '儒', note: '好的是你的榜样，不好的也是你的镜子。' },
  { quote: '学而时习之，不亦说乎。', author: '孔子', tradition: '儒', note: '学做人的道理并不断实践——这才是真正的快乐。' },
  { quote: '君子慎其独也。', author: '《大学》', tradition: '儒', note: '没人在场的时候更要小心。不是做给谁看，是对自己诚实。' },
  { quote: '不怨天，不尤人。', author: '孔子', tradition: '儒', note: '不怨老天，不怪别人。从最日常的东西学起，慢慢通达。' },
  { quote: '温故而知新，可以为师矣。', author: '孔子', tradition: '儒', note: '带着新眼光回顾旧知——每一次重读，都是第一次。' },
  { quote: '君子和而不同。', author: '孔子', tradition: '儒', note: '我可以不认同你，但我尊重你。和谐 ≠ 一致。' }
];

// ==========================================
// Render today's quote (with loading → empty → error protection)
// ==========================================
(function renderToday() {
  const card = document.getElementById('riqianCard');
  if (!card) return;

  // Error state: data corrupted or missing
  if (!Array.isArray(riqianData) || riqianData.length === 0) {
    card.innerHTML = `<div class="glass empty-state" style="padding:3rem;text-align:center;border-radius:var(--radius-lg);">
      <div class="empty-icon">🌙</div>
      <h3>日签数据加载失败</h3>
      <p style="color:var(--text-secondary);margin-top:0.5rem;">请刷新页面重试，或联系站长。</p>
    </div>`;
    return;
  }

  try {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const index = ((dayOfYear - 1) % riqianData.length + riqianData.length) % riqianData.length;
    const item = riqianData[index];

    if (!item || !item.quote) {
      card.innerHTML = `<div class="glass empty-state" style="padding:3rem;text-align:center;border-radius:var(--radius-lg);">
        <div class="empty-icon">📅</div>
        <h3>今日日签暂不可用</h3>
        <p style="color:var(--text-secondary);margin-top:0.5rem;">日签数据读取异常，请稍后刷新。</p>
      </div>`;
      return;
    }

    const badgeMap = { '佛': '☸ 佛家', '道': '☯ 道家', '儒': '📜 儒家' };
    card.innerHTML = `<div class="glass riqian-today">
      <div class="riqian-day">#${index + 1} / ${riqianData.length} · ${badgeMap[item.tradition] || '修心'}</div>
      <blockquote class="riqian-quote">${item.quote}</blockquote>
      <div class="riqian-author">— ${item.author}</div>
      <div class="riqian-divider"></div>
      <p class="riqian-note">${item.note || ''}</p>
    </div>`;
  } catch (e) {
    console.error('日签渲染失败:', e);
    card.innerHTML = `<div class="glass empty-state" style="padding:3rem;text-align:center;border-radius:var(--radius-lg);">
      <div class="empty-icon">⚠️</div>
      <h3>日签加载出错</h3>
      <p style="color:var(--text-secondary);margin-top:0.5rem;">请尝试刷新页面。如果问题持续，请联系站长。</p>
    </div>`;
  }

  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  const dateEl = document.getElementById('todayDate');
  if (dateEl) dateEl.textContent = dateStr;
})();

// ==========================================
// Render all quotes grid (with empty protection)
// ==========================================
(function renderAll() {
  const grid = document.getElementById('riqianGrid');
  if (!grid) return;

  if (!Array.isArray(riqianData) || riqianData.length === 0) {
    grid.innerHTML = `<div class="glass empty-state" style="padding:2rem;text-align:center;border-radius:var(--radius-lg);grid-column:1/-1;">
      <div class="empty-icon">📋</div>
      <p style="color:var(--text-secondary);">日签库暂时为空，数据整理中...</p>
    </div>`;
    return;
  }

  try {
    const iconMap = { '佛': '☸', '道': '☯', '儒': '📜' };
    grid.innerHTML = riqianData.map((item, i) => `
      <div class="glass riqian-grid-item fade-in${i < 6 ? ' visible' : ''}" style="transition-delay:${Math.min(i * 0.03, 0.5)}s">
        <div class="riqian-grid-day">${iconMap[item.tradition] || '✦'} ${i + 1}</div>
        <blockquote>${item.quote}</blockquote>
        <div class="riqian-grid-author">— ${item.author}</div>
      </div>
    `).join('');
  } catch (e) {
    console.error('日签网格渲染失败:', e);
    grid.innerHTML = `<div class="glass empty-state" style="padding:2rem;text-align:center;border-radius:var(--radius-lg);grid-column:1/-1;">
      <div class="empty-icon">⚠️</div>
      <p style="color:var(--text-secondary);">日签列表加载出错，请刷新页面重试。</p>
    </div>`;
  }
})();
