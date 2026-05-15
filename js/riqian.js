/* ============================================
   静界 · 日签数据
   ============================================ */

const riqianData = [
  { quote: '一切都会过去。', author: '民间谚语', note: '好的坏的，都是暂时的。别太当真。' },
  { quote: '行到水穷处，坐看云起时。', author: '王维', note: '走到无路可走时，不妨坐下来，看看云。' },
  { quote: '春有百花秋有月，夏有凉风冬有雪。', author: '无门慧开', note: '若无闲事挂心头，便是人间好时节。' },
  { quote: '你看见的你不是你，别人看见的你也不是你，你看见的别人才是你。', author: '禅语', note: '世界是你的镜子。' },
  { quote: '应无所住而生其心。', author: '《金刚经》', note: '不执着地活着，心才真正自由。' },
  { quote: '菩提本无树，明镜亦非台。', author: '惠能', note: '本来无一物，何处惹尘埃。' },
  { quote: '放下，不是放弃。', author: '禅语', note: '放下的是执着，不是生活本身。' },
  { quote: '日日是好日。', author: '云门文偃', note: '不是日子变好了，是你开始好好过日子了。' },
  { quote: '上善若水，水善利万物而不争。', author: '老子', note: '最高的善，像水一样柔软而有力。' },
  { quote: '静坐常思己过，闲谈莫论人非。', author: '古训', note: '把关注别人的精力，收回来看看自己。' },
  { quote: '花未全开月未圆。', author: '曾国藩', note: '最好的人生状态，是有所期待。' },
  { quote: '心安即是归处。', author: '白居易', note: '不需要去任何地方，此刻就可以是家。' },
  { quote: '万物皆有裂痕，那是光照进来的地方。', author: '莱昂纳德·科恩', note: '不完美本身就是一种完整。' },
  { quote: '色即是空，空即是色。', author: '《心经》', note: '物质世界的本质是流动的能量。' },
  { quote: '一花一世界，一叶一菩提。', author: '《华严经》', note: '每一个微小的存在都包含着整个宇宙。' },
  { quote: '致虚极，守静笃。', author: '老子', note: '回到最虚空、最安静的状态——那是力量的源头。' },
  { quote: '不是风动，不是幡动，仁者心动。', author: '惠能', note: '外境不变，变的是你的心在怎么解读。' },
  { quote: '知足常乐。', author: '老子', note: '快乐不是因为拥有得多，而是因为计较得少。' },
  { quote: '最好的修行，是好好吃饭，好好睡觉。', author: '禅语', note: '日常就是道场。' },
  { quote: '大音希声，大象无形。', author: '老子', note: '真正重要的东西，往往看不见。' },
  { quote: '烦恼即菩提。', author: '《六祖坛经》', note: '烦恼不是敌人，是觉知的入口。' },
  { quote: '过去心不可得，现在心不可得，未来心不可得。', author: '《金刚经》', note: '三心不可得，那就活在当下吧。' },
  { quote: '不以物喜，不以己悲。', author: '范仲淹', note: '不被外界牵着走，心就有了定力。' },
  { quote: '山不转路转，路不转人转，人不转心转。', author: '禅语', note: '改变能改变的，接受不能改变的。' },
  { quote: '众生皆苦。', author: '佛陀', note: '承认苦的存在，反而是解脱的开始。' },
  { quote: '看山是山，看水是水。', author: '青原惟信', note: '修行三境界——终归还是回到最简单的地方。' },
  { quote: '活着本身，就是一份礼物。', author: '一行禅师', note: '此刻你还能呼吸，这就是奇迹。' },
  { quote: '不以善小而不为，不以恶小而为之。', author: '刘备', note: '大事从小处开始。' },
  { quote: '随缘不变，不变随缘。', author: '禅语', note: '心不变，随外界流转。不执着，也不逃避。' },
  { quote: '此心安处是吾乡。', author: '苏轼', note: '无论身在何处，内心的平安才是真正的家。' }
];

// ==========================================
// Render today's quote
// ==========================================
(function renderToday() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const index = (dayOfYear - 1) % riqianData.length;
  const item = riqianData[index];

  const card = document.getElementById('riqianCard');
  if (card) {
    card.innerHTML = `
      <div class="glass riqian-today">
        <div class="riqian-day">#${index + 1} / 30</div>
        <blockquote class="riqian-quote">${item.quote}</blockquote>
        <div class="riqian-author">— ${item.author}</div>
        <div class="riqian-divider"></div>
        <p class="riqian-note">${item.note}</p>
      </div>`;
  }

  // Update date display
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  const dateEl = document.getElementById('todayDate');
  if (dateEl) dateEl.textContent = dateStr;
})();

// ==========================================
// Render all quotes grid
// ==========================================
(function renderAll() {
  const grid = document.getElementById('riqianGrid');
  if (!grid) return;

  grid.innerHTML = riqianData.map((item, i) => `
    <div class="glass riqian-grid-item fade-in${i < 6 ? ' visible' : ''}" style="transition-delay:${Math.min(i * 0.03, 0.5)}s">
      <div class="riqian-grid-day">${i + 1}</div>
      <blockquote>${item.quote}</blockquote>
      <div class="riqian-grid-author">— ${item.author}</div>
    </div>
  `).join('');
})();
