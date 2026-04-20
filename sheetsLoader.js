// sheetsLoader.js
export async function fetchSheetRows({ sheetId, apiKey, range, fields }) {
  const cacheKey = `sheets_${sheetId}_${range}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) return JSON.parse(cached);

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}` +
    `?includeGridData=true&ranges=${encodeURIComponent(range)}` +
    `&fields=${encodeURIComponent(fields)}&key=${apiKey}`;

  const res = await fetch(url);
  const json = await res.json();
  const rows = json.sheets[0].data[0].rowData ?? [];
  sessionStorage.setItem(cacheKey, JSON.stringify(rows));
  return rows;
}

export async function loadSheetsData({ sheetId, apiKey, range, fields }) {
  const rows = await fetchSheetRows({ sheetId, apiKey, range, fields });
  return renderTable(rows);
}

function toCssColor(colorStyle) {
  const c = colorStyle?.rgbColor;
  if (!c) return null;
  const r = Math.round((c.red ?? 0) * 255);
  const g = Math.round((c.green ?? 0) * 255);
  const b = Math.round((c.blue ?? 0) * 255);
  const a = c.alpha ?? 1;
  return a === 1 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`;
}

function applyTextFormat(el, fmt) {
  if (!fmt) return;
  if (fmt.bold) el.style.fontWeight = "bold";
  if (fmt.italic) el.style.fontStyle = "italic";
  if (fmt.strikethrough || fmt.underline) {
    const parts = [];
    if (fmt.underline) parts.push("underline");
    if (fmt.strikethrough) parts.push("line-through");
    el.style.textDecoration = parts.join(" ");
  }
  if (fmt.fontFamily) el.style.fontFamily = fmt.fontFamily;
  if (fmt.fontSize) el.style.fontSize = `${fmt.fontSize}px`;
  const color = toCssColor(fmt.foregroundColorStyle);
  if (color) el.style.color = color;
}

function setTextWithBreaks(el, str) {
  const parts = str.split("\n");
  for (let i = 0; i < parts.length; i++) {
    if (i > 0) el.appendChild(document.createElement("br"));
    el.appendChild(document.createTextNode(parts[i]));
  }
}

function cellToDom(cell) {
  const text = cell.formattedValue ?? "";
  if (!text) return document.createTextNode("");

  const runs = cell.textFormatRuns;
  const defaultFmt = cell.effectiveFormat?.textFormat;
  const wrap = cell.hyperlink
    ? () => {
        const a = document.createElement("a");
        a.href = cell.hyperlink;
        a.target = "_blank";
        a.rel = "noopener";
        return a;
      }
    : () => document.createDocumentFragment();

  // No rich-text runs → single span with the cell-level format
  if (!runs || runs.length === 0) {
    const container = wrap();
    const span = document.createElement("span");
    applyTextFormat(span, defaultFmt);
    setTextWithBreaks(span, text);
    container.appendChild(span);
    return container;
  }

  // Rich-text runs
  const container = wrap();
  for (let i = 0; i < runs.length; i++) {
    const start = runs[i].startIndex ?? 0;
    const end =
      i + 1 < runs.length
        ? (runs[i + 1].startIndex ?? text.length)
        : text.length;
    const span = document.createElement("span");
    // Merge default format with run-specific overrides
    const merged = { ...defaultFmt, ...runs[i].format };
    applyTextFormat(span, merged);
    setTextWithBreaks(span, text.slice(start, end));
    container.appendChild(span);
  }
  return container;
}

export function renderTable(rows) {
  const table = document.createElement("table");
  for (const row of rows) {
    const tr = document.createElement("tr");
    for (const cell of row.values ?? []) {
      const td = document.createElement("td");
      const bg = toCssColor(cell?.effectiveFormat?.backgroundColorStyle);
      if (bg) td.style.backgroundColor = bg;
      const align = cell?.effectiveFormat?.horizontalAlignment;
      if (align) td.style.textAlign = align.toLowerCase();
      td.appendChild(cellToDom(cell ?? {}));
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}
