const data = [
  { player:"花绮妙", hits:[["火神R",9093677532],["铁匠",9563481571],["铁匠",9478513209]] },
  { player:"云小溪", hits:[["青瓜",5544549674],["重金属音乐",5793700105],["秘材H",10510510630]] },
  { player:"清蒸红烧LIYU", hits:[["秘材H",6969254440],["火神R",7290186157],["青瓜",5261158385]] },
  { player:"青柠", hits:[["秘材H",7413314892],["重金属音乐",4991063936],["青瓜",5925838400]] },
  { player:"千岛佳", hits:[["秘材H",6815863591],["铁匠",5506347714],["重金属音乐",5789533955]] },
  { player:"吃饱不想家", hits:[["重金属音乐",5512145665],["火神R",6922910966],["铁匠",4546303674]] },
  { player:"梦夜雨", hits:[["青瓜",5306392826],["重金属音乐",4864974831],["秘材H",6529781865]] },
  { player:"KKK影", hits:[["铁匠",3262850160],["铁匠",5342610995],["铁匠",7088648112]] },
  { player:"指挥官", hits:[["铁匠",3306846061],["秘材H",6494712536],["铁匠",4634889204]] },
  { player:"绯色", hits:[["铁匠",3256026272],["秘材H",6420781691],["铁匠",4733361469]] },
  { player:"TRIGGER", hits:[["秘材H",6030281002],["火神R",4583236314],["青瓜",3681193115]] },
  { player:"辞忧", hits:[["重金属音乐",3346289008],["火神R",4949344730],["青瓜",4892820165]] },
  { player:"如遇", hits:[["铁匠",2979366420],["铁匠",3087887251],["铁匠",6187524515]] },
  { player:"非洲小萌新", hits:[["铁匠",1812609012],["铁匠",4748800190],["铁匠",5546885245]] },
  { player:"北冥虎纹鲨鱼", hits:[["秘材H",5370523847],["青瓜",4598089286],["火神R",1450125613]] },
  { player:"枫葉繁花", hits:[["铁匠",2746142934],["铁匠",4527367127],["铁匠",3700220917]] },
  { player:"邃愿", hits:[["青瓜",1387658476],["火神R",4145853648],["重金属音乐",5084813560]] },
  { player:"奈乐", hits:[["铁匠",2556592121],["铁匠",3758657522],["重金属音乐",3941205744]] },
  { player:"德胜", hits:[["铁匠",3299964722],["铁匠",1717500195],["铁匠",4380215906]] },
  { player:"苏沐瞳", hits:[["秘材H",2864927879],["铁匠",2979537575],["重金属音乐",2596646990]] },
  { player:"夜夜", hits:[["青瓜",501473985],["秘材H",5909871227]] },
  { player:"5MMM", hits:[["铁匠",1113920379],["铁匠",1764648206],["铁匠",2910067719]] },
  { player:"厨厨厨", hits:[["铁匠",593084602],["铁匠",1391930643],["铁匠",3690169432]] },
  { player:"棱镜", hits:[["火神R",2107566102],["火神R",3448065705]] },
  { player:"希望", hits:[["铁匠",4794460466]] },
  { player:"教官", hits:[["铁匠",1123347844],["铁匠",889740169],["铁匠",2601933479]] },
  { player:"暗星", hits:[["铁匠",4308226694]] },
  { player:"君情其情", hits:[["秘材H",1303763959],["铁匠",1120451747],["铁匠",1866256956]] },
  { player:"行天游", hits:[["青瓜",1063845129],["火神R",1252805377],["重金属音乐",1248537239]] },
  { player:"WAYNE", hits:[["铁匠",2579237708],["铁匠",663233325],["铁匠",178853501]] },
  { player:"南山", hits:[["铁匠",151349459],["铁匠",863546644],["铁匠",1347633736]] },
  { player:"博哥儿", hits:[["铁匠",276935353],["铁匠",514930979],["铁匠",1348704466]] },
];

// 上一期排名（从截图提取）
const prevRank = {
  "花绮妙": 1,
  "云小溪": 2,
  "非洲小萌新": 3,
  "吃饱不想家": 4,
  "梦夜雨": 5,
  "伊羡": 6,
  "青柠": 7,
  "北冥虎纹鲨鱼": 8,
  "枫葉繁花": 9,
  "KKK影": 10,
  "绯色": 11,
  "TRIGGER": 12,
  "德胜": 13,
  "希望": 14,
  "奈乐": 15,
  "辞忧": 16,
  "暗星": 17,
  "邃愿": 18,
  "教官": 19,
  "指挥官": 20,
  "博哥儿": 21,
  "5MMM": 22,
  "君情其情": 23,
  "棱镜": 24,
  "行天游": 25,
  "WAYNE": 26,
  "千岛佳": 27,
  "夜夜": 28,
  "如遇": 29,
  "花园": 30,
  "厨厨厨": 31,
  "结灯": 32,
};

const toYi = n => Math.round(n / 1e8 * 10) / 10;

// 预处理
const rows = data.map(r => {
  const totalRaw = r.hits.reduce((s, h) => s + h[1], 0);
  const isWater = r.hits.length === 3 && r.hits.every(h => h[0] === "铁匠");
  const lastRank = prevRank[r.player];
  return {
    player: r.player,
    hits: r.hits,
    totalRaw,
    totalYi: toYi(totalRaw),
    hitYi: r.hits.map(h => toYi(h[1])),
    isWater,
    count: r.hits.length,
    lastRank,
    change: lastRank === undefined ? null : lastRank, // 用于排序：值越大代表上期排名越低
  };
});

// 统计
const players = rows.length;
const avgYi = toYi(rows.reduce((s, r) => s + r.totalRaw, 0) / players);
const maxYi = Math.max(...rows.map(r => r.totalYi));
const missCount = rows.filter(r => r.count < 3).length;
document.getElementById("stat-players").textContent = players + " 人";
document.getElementById("stat-avg").textContent = avgYi + " 亿";
document.getElementById("stat-max").textContent = maxYi + " 亿";
document.getElementById("stat-miss").textContent = missCount + " 人";

// 缺刀提示
const missRows = rows.filter(r => r.count < 3).sort((a, b) => a.count - b.count);
document.getElementById("warn-list").innerHTML =
  '<div class="warn-box">⚠️ 以下玩家刀数不足三刀，可补充缺失数据：<br>' +
  missRows.map(r => `&nbsp;&nbsp;• ${r.player}：当前 <b>${r.count}</b> 刀`).join("<br>") +
  "</div>";

// 排序状态
let sortKey = "total", sortAsc = false;
const tbody = document.getElementById("tbody");

function hitVal(r, idx) { return idx < r.hits.length ? r.hits[idx][1] : -1; }
function hitYiStr(r, idx) {
  if (idx >= r.hits.length) return '<span class="miss">— 缺</span>';
  const [boss, dmg] = r.hits[idx];
  const cls = "boss-" + boss.replace(/[^\u4e00-\u9fa5A-Za-z]/g, "");
  return `${toYi(dmg)}<span class="boss-tag ${cls}">${boss}</span>`;
}

function prevRankHtml(r) {
  if (r.lastRank === undefined) return '<span class="prev-new">✨ 新</span>';
  return `<span class="prev-rank">${r.lastRank}</span>`;
}

// ===== 自定义备注（可编辑，保存于 localStorage，对所有人开放）=====
const NOTE_KEY = "gvg_custom_notes_v1";
let customNotes = {};
try { customNotes = JSON.parse(localStorage.getItem(NOTE_KEY) || "{}") || {}; } catch (e) { customNotes = {}; }

function escAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function saveCustomNotes() {
  try { localStorage.setItem(NOTE_KEY, JSON.stringify(customNotes)); } catch (e) {}
}

function noteHtml(r, currentRank) {
  const parts = [];
  if (r.isWater) parts.push('<span class="water">💧 三刀水</span>');
  if (r.lastRank !== undefined) {
    const delta = r.lastRank - currentRank;
    if (delta > 0) parts.push(`<span class="note-change-up">▲ 提升${delta}</span>`);
    else if (delta < 0) parts.push(`<span class="note-change-down">▼ 下降${-delta}</span>`);
    // 排名持平：不显示，无 -0
  }
  if (r.count < 3) parts.push(`<span class="incomplete-note">🔴 缺 ${3 - r.count} 刀</span>`);
  parts.push(`<span class="custom-note" contenteditable="true" spellcheck="false" data-player="${escAttr(r.player)}">${escHtml(customNotes[r.player] || "")}</span>`);
  return `<span class="note-box">${parts.join("")}</span>`;
}

function render() {
  // 始终按总伤害排定名次徽章
  const byTotal = [...rows].sort((a, b) => b.totalRaw - a.totalRaw);
  const rankMap = new Map(byTotal.map((r, i) => [r.player, i + 1]));

  let sorted = [...rows];
  sorted.sort((a, b) => {
    let va, vb;
    switch (sortKey) {
      case "rank": case "total": va = a.totalRaw; vb = b.totalRaw; break;
      case "prev":
        // 上期排名值：未出现排在最后；值越大上期名次越低
        va = a.lastRank === undefined ? 999 : a.lastRank;
        vb = b.lastRank === undefined ? 999 : b.lastRank;
        break;
      case "player": va = a.player; vb = b.player; break;
      case "h1": va = hitVal(a,0); vb = hitVal(b,0); break;
      case "h2": va = hitVal(a,1); vb = hitVal(b,1); break;
      case "h3": va = hitVal(a,2); vb = hitVal(b,2); break;
      case "note": va = a.count; vb = b.count; break;
      default: va = a.totalRaw; vb = b.totalRaw;
    }
    let cmp;
    if (typeof va === "string") cmp = va.localeCompare(vb, "zh");
    else cmp = va - vb;
    return sortAsc ? cmp : -cmp;
  });

  tbody.innerHTML = sorted.map(r => {
    const rank = rankMap.get(r.player);
    const rankCls = rank === 1 ? "r1" : rank === 2 ? "r2" : rank === 3 ? "r3" : "";
    const incomplete = r.count < 3;
    return `<tr class="${incomplete ? "incomplete" : ""}">
      <td><span class="rank ${rankCls}">${rank}</span></td>
      <td>${prevRankHtml(r)}</td>
      <td class="player">${r.player}</td>
      <td class="total">${r.totalYi.toFixed(1)}</td>
      <td>${hitYiStr(r,0)}</td>
      <td>${hitYiStr(r,1)}</td>
      <td>${hitYiStr(r,2)}</td>
      <td>${noteHtml(r, rank)}</td>
    </tr>`;
  }).join("");

  // 更新表头箭头
  document.querySelectorAll("#tbl thead th").forEach(th => {
    const arrow = th.querySelector(".arrow");
    arrow.textContent = th.dataset.key === sortKey ? (sortAsc ? "▲" : "▼") : "";
  });
}

document.querySelectorAll("#tbl thead th").forEach(th => {
  th.addEventListener("click", () => {
    const key = th.dataset.key;
    if (sortKey === key) sortAsc = !sortAsc;
    else { sortKey = key; sortAsc = key === "player"; }
    render();
  });
});

// 备注编辑：输入即保存（事件委托，对所有人开放）
tbody.addEventListener("input", e => {
  const el = e.target.closest(".custom-note");
  if (!el) return;
  const player = el.dataset.player;
  const text = el.textContent.trim();
  if (text) customNotes[player] = el.textContent;
  else delete customNotes[player];
  saveCustomNotes();
});
// 回车不换行，直接结束编辑
tbody.addEventListener("keydown", e => {
  if (e.key === "Enter" && e.target.closest(".custom-note")) {
    e.preventDefault();
    e.target.blur();
  }
});

// 清空全部自定义备注
document.getElementById("clear-notes").addEventListener("click", () => {
  if (!confirm("确定要清空所有人的自定义备注吗？")) return;
  customNotes = {};
  saveCustomNotes();
  render();
});

render();
