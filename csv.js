var textData = [];
var pushhtml = document.getElementById('site');

async function csv_load() {
  const url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSxT-emvCVDnjvmlNy_R1DUIyL0dh9UlcmjL1WMV_XFdvoGWfb6Co5YPJcnvYXU5tuJvvJwrMyNEAYl/pub?output=csv';

  Papa.parse(url, {
    download: true,
    header: true,
    complete: function (results) {
      textData = results.data;
      textData.sort(
        (a, b) => b['IDを入力してください'] - a['IDを入力してください']
      );
      renderList();
    },
    error: function (err) {
      console.error('データの読み込み失敗:', err);
    },
  });
}

function renderList() {
  pushhtml.innerHTML = '';

  textData.forEach((item, index) => {
    const title = item['タイトルを入力してください'];
    const date = item['日にちを答えてください'];

    if (!title) return;

    const div = document.createElement('div');
    div.className = 'content';
    div.innerHTML = `
        <div class="block">
            <a href="javascript:void(0)" onclick="moves(${index})" class="read">・${title}</a>
            <p class="explain">投稿日:${date}</p>
        </div>
    `;
    pushhtml.appendChild(div);
  });
}

function moves(index) {
  const item = textData[index];
  const title = item['タイトルを入力してください'];
  const content = item['内容を入力してください'];
  const time = item['タイムスタンプ'];
  var rightButton = '';
  var leftButton = '';
  if (index > 0) {
    rightButton = `<a class="RightGo" onclick="moves(${index - 1})">></a>`;
  }
  if (index < textData.length - 1) {
    leftButton = `<a class="LeftGo" onclick="moves(${index + 1})"><</a>`;
  }

  const htmlcontent = `
    <div style="padding: 20px;">
        <a href="index.html" class="back">⇦</a>
        <div class="titleLine">
          ${leftButton}
          <h2 class="titleName">${title}</h2>
          ${rightButton}
        </div>
        <p class="contents">${content}</p>
    </div>
    <p class="explain">投稿:${time}</p>
  `;
  document.body.innerHTML = htmlcontent;
  window.screenTop;
}

csv_load();
