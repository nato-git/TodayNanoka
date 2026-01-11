var textData = [];
const pushhtml = document.getElementById('site');

const uptime = 'タイムスタンプ';
const update = '日にちを答えてください';
const upid = 'IDを入力してください';
const upcontent = '内容を入力してください';
const uptitle = 'タイトルを入力してください';

async function csv_load() {
  const url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSxT-emvCVDnjvmlNy_R1DUIyL0dh9UlcmjL1WMV_XFdvoGWfb6Co5YPJcnvYXU5tuJvvJwrMyNEAYl/pub?output=csv';

  Papa.parse(url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      textData = results.data;
      textData.sort((a, b) => b[upid] - a[upid]);
      clickFile();
    },
  });
}

function clickFile() {
  pushhtml.innerHTML = '';
  let filecontent = '';
  const maxId = Math.max(...textData.map((item) => parseInt(item[upid]) || 0));
  for (let i = 1; i <= maxId; i += 10) {
    const start = i;
    const end = i + 9;
    const hasData = textData.some((item) => {
      const id = parseInt(item[upid]);
      return id >= start && id <= end;
    });
    if (hasData) {
      filecontent += `
        <div class="block">
          <a href="javascript:void(0)" onclick="renderList(${start})" class="read">
            ・今日のナノカ ${start} ~ ${end}
          </a>
        </div>`;
    }
  }
  pushhtml.innerHTML = filecontent;
}

function renderList(number) {
  pushhtml.innerHTML = '';
  const startID = number;
  const endID = number + 9;
  var textcontent = '';
  const filteredData = textData.filter((item) => {
    const id = parseInt(item[upid]);
    return id >= startID && id <= endID;
  });
  filteredData.sort((a, b) => b[upid] - a[upid]);
  for (let i = 0; i < filteredData.length; i++) {
    const item = filteredData[i];
    const originalIndex = textData.indexOf(item);
    textcontent += `
      <div class="block">
        <a href="javascript:void(0)" onclick="moves(${originalIndex})">・${item[uptitle]}</a>
        <p class="explain">投稿日:${item[update]} ID:${item[upid]}</p>
      </div>`;
  }
  textcontent += `<div class="block"><a href="javascript:void(0)" onclick="clickFile()">← 戻る</a></div>`;
  pushhtml.innerHTML = textcontent;
}

function moves(index) {
  const item = textData[index];
  if (!item) return;

  const leftButton =
    index > 0
      ? `<a class="LeftGo" onclick="moves(${
          index - 1
        })"><strong>＜</strong></a>`
      : '';
  const rightButton =
    index < textData.length - 1
      ? `<a class="RightGo" onclick="moves(${
          index + 1
        })"><strong>＞</strong></a>`
      : '';

  pushhtml.innerHTML = `
    <div style="padding: 20px;">
        <a href="index.html" class="back"><strong>⇦</strong></a>
        <div class="titleLine">
          ${leftButton}
          <h2 class="titleName">${item[uptitle]}</h2>
          ${rightButton}
        </div>
        <p class="contents">${item[upcontent]}</p>
    </div>
    <p class="explain">投稿:${item[uptime]}</p>
  `;

  window.scrollTo(0, 0);
}

csv_load();
