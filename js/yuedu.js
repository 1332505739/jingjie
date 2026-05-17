/* ============================================
   静界 · 阅读室 — 渲染器 + 注解交互
   ============================================ */

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

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

  // Create insight tooltip
  const insightTip = document.createElement('div');
  insightTip.className = 'insight-tooltip';
  insightTip.setAttribute('aria-hidden', 'true');
  document.body.appendChild(insightTip);
  let activePara = null;

  // ==========================================
  // Render text list for a tradition
  // ==========================================
  function renderTextList(tradition) {
    currentTradition = tradition;
    const data = library[tradition];
    if (!textList) return;

    // Empty state: no data for this tradition
    if (!data || !data.texts || data.texts.length === 0) {
      textList.innerHTML = `<div class="glass empty-state" style="padding:3rem var(--space-md);text-align:center;border-radius:var(--radius-lg);">
        <div class="empty-icon">📚</div>
        <h3>经典数据加载中…</h3>
        <p style="color:var(--text-secondary);margin-top:0.5rem;">该板块内容正在扩充中，请稍后刷新页面。</p>
      </div>`;
      return;
    }

    const totalChapters = data.texts.reduce((sum, t) => sum + (t.chapters ? t.chapters.length : 0), 0);

    // Empty state: no chapters at all
    if (totalChapters === 0) {
      textList.innerHTML = `<div class="glass empty-state" style="padding:3rem var(--space-md);text-align:center;border-radius:var(--radius-lg);">
        <div class="empty-icon">📖</div>
        <h3>暂无可读篇章</h3>
        <p style="color:var(--text-secondary);margin-top:0.5rem;">章节数据正在整理中，敬请期待。</p>
      </div>`;
      return;
    }

    textList.innerHTML = data.texts.map((text, i) => `
      <div class="glass text-card fade-in visible" style="cursor:pointer; transition-delay:${i * 0.08}s;" data-text-id="${text.id}">
        <div class="text-card-header">
          <h3 class="text-card-title">${text.title}</h3>
          <span class="text-card-badge">${text.chapters.length} 篇</span>
        </div>
        <p class="text-card-author">${text.author}</p>
        <p class="text-card-desc">${text.desc} · 共${text.chapters.length}篇</p>
      </div>
    `).join('');

    textList.querySelectorAll('.text-card').forEach(card => {
      card.addEventListener('click', () => {
        const textId = card.dataset.textId;
        const text = data.texts.find(t => t.id === textId);
        if (text) openReader(text);
      });
    });
  }

  // ==========================================
  // Render paragraphs with insight triggers
  // ==========================================
  function renderParagraphs(paragraphs) {
    if (!paragraphs || paragraphs.length === 0) return '';
    return paragraphs.map((p, i) => {
      const hasInsight = p.insight && p.insight.trim().length > 0;
      return `
        <div class="para-block fade-in visible${hasInsight ? ' has-insight' : ''}"
             style="transition-delay:${Math.min(i * 0.04, 0.6)}s;"
             data-insight="${hasInsight ? escapeHtml(p.insight) : ''}">
          <p>${p.text.replace(/\n/g, '<br>')}</p>
          ${hasInsight ? '<span class="para-dot" title="点击查看见解">✦</span>' : ''}
        </div>`;
    }).join('');
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
    const hasParagraphs = ch.paragraphs && ch.paragraphs.length > 0;
    const hasContent = ch.content && !hasParagraphs;

    readerContent.innerHTML = `
      <div class="chapter-header">
        <div class="chapter-book-title">${currentText.title}</div>
        <div class="chapter-book-author">${currentText.author}</div>
        <div class="divider divider-center"></div>
      </div>
      <h2 class="chapter-title">${ch.title}</h2>
      <div class="chapter-body">
        ${hasParagraphs ? renderParagraphs(ch.paragraphs) : ''}
        ${hasContent ? ch.content.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('') : ''}
      </div>
    `;

    // Update nav + reading time
    const total = currentText.chapters.length;
    const charCount = hasParagraphs
      ? ch.paragraphs.reduce((s, p) => s + p.text.length, 0)
      : (ch.content || '').length;
    const readMin = Math.max(1, Math.round(charCount / 400));
    chapterIndicator.textContent = `${currentChapter + 1} / ${total} · ${readMin}分钟`;
    document.getElementById('btnPrev').disabled = currentChapter === 0;
    document.getElementById('btnNext').disabled = currentChapter >= total - 1;

    // Reading progress
    if (readingProgress) {
      readingProgress.style.width = ((currentChapter + 1) / total * 100) + '%';
    }

    // Hide tooltip
    insightTip.classList.remove('visible');

    // Scroll reveal
    setTimeout(() => {
      readerContent.querySelectorAll('.chapter-header, .chapter-title, .chapter-body, .para-block').forEach(el => {
        el.classList.add('visible');
      });
      readerContent.style.opacity = '1';
      readerContent.style.transform = 'translateX(0)';
    }, 100);

    // Bind insight interactions
    bindInsightEvents();
  }

  // ==========================================
  // Insight tooltip events
  // ==========================================
  function bindInsightEvents() {
    const paras = readerContent.querySelectorAll('.para-block.has-insight');
    paras.forEach(para => {
      const insight = para.dataset.insight;
      if (!insight) return;

      // Mouse hover
      para.addEventListener('mouseenter', (e) => {
        activePara = para;
        showInsight(para, insight);
      });
      para.addEventListener('mouseleave', () => {
        activePara = null;
        insightTip.classList.remove('visible');
      });
      para.addEventListener('mousemove', (e) => {
        if (activePara === para) positionInsight(e);
      });

      // Touch tap
      para.addEventListener('click', (e) => {
        if (window.innerWidth > 768) return; // desktop uses hover
        e.stopPropagation();
        if (insightTip.classList.contains('visible') && activePara === para) {
          insightTip.classList.remove('visible');
          activePara = null;
        } else {
          activePara = para;
          insightTip.innerHTML = `<div class="insight-content">${insight}</div>`;
          insightTip.classList.add('visible');
          positionInsightTouch(para);
        }
      });

      // Tap the dot specifically
      const dot = para.querySelector('.para-dot');
      if (dot) {
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          if (insightTip.classList.contains('visible') && activePara === para) {
            insightTip.classList.remove('visible');
            activePara = null;
          } else {
            activePara = para;
            insightTip.innerHTML = `<div class="insight-content">${insight}</div>`;
            insightTip.classList.add('visible');
            positionInsightTouch(para);
          }
        });
      }
    });
  }

  function showInsight(para, insight) {
    insightTip.innerHTML = `<div class="insight-content">${insight}</div>`;
    insightTip.classList.add('visible');
  }

  function positionInsight(e) {
    const tipW = insightTip.offsetWidth || 320;
    const tipH = insightTip.offsetHeight || 80;
    let x = e.clientX + 16;
    let y = e.clientY - tipH - 12;

    if (x + tipW > window.innerWidth - 16) x = e.clientX - tipW - 16;
    if (y < 70) y = e.clientY + 20;
    if (x < 8) x = 8;

    insightTip.style.left = x + 'px';
    insightTip.style.top = y + 'px';
  }

  function positionInsightTouch(para) {
    const rect = para.getBoundingClientRect();
    insightTip.style.left = Math.max(8, rect.left) + 'px';
    insightTip.style.top = Math.min(rect.bottom + 8, window.innerHeight - 180) + 'px';
    insightTip.style.maxWidth = Math.min(440, window.innerWidth - 16) + 'px';
  }

  // Close tooltip on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.para-block') && !e.target.closest('.insight-tooltip')) {
      insightTip.classList.remove('visible');
      activePara = null;
    }
  });

  // ==========================================
  // Navigation
  // ==========================================
  function goPrev() {
    if (currentChapter > 0) {
      readerContent.style.opacity = '0';
      readerContent.style.transform = 'translateX(16px)';
      setTimeout(() => {
        currentChapter--;
        renderChapter();
      }, 200);
    }
  }

  function goNext() {
    if (currentText && currentChapter < currentText.chapters.length - 1) {
      readerContent.style.opacity = '0';
      readerContent.style.transform = 'translateX(-16px)';
      setTimeout(() => {
        currentChapter++;
        renderChapter();
      }, 200);
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

  document.addEventListener('keydown', (e) => {
    if (!currentText) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
    if (e.key === 'Escape') {
      if (insightTip.classList.contains('visible')) {
        insightTip.classList.remove('visible');
        activePara = null;
      } else {
        backToLibrary();
      }
    }
  });

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

  renderTextList('buddhist');
});
