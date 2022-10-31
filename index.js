import './style.css';

var headers = Array.from(document.querySelectorAll('.headers > div')),
  rows = Array.from(document.querySelectorAll('.tble-rows')),
  body = document.querySelector('.body'),
  data = null,
  table = null,
  search = document.getElementById('search-field'),
  markup = '',
  queryStr = '';

// search.addEventListener('keyup', (e) => {
//   queryStr = search.value;

//   for (let i = 0; i < data.length; i++) {
//     if (data[i].title.includes(queryStr)) {
//       let arr = data[i];
//       data = arr;
//       populateTable(data);
//     }
//     if ((search.value = '')) {
//       populateTable(data);
//     }
//   }
// });

function setHeaderHandlers(e) {
  var table,
    i,
    x,
    y,
    ascending,
    index,
    caret,
    reorder = true;

  table = document.getElementById('html-table');
  caret = document.querySelector('.caret');
  caret != undefined ? caret.remove() : '';
  index = e.target.getAttribute('data-id');
  caret = document.createElement('span');
  caret.classList.add('caret');
  caret.innerHTML = '&#x25B2';
  e.target.appendChild(caret);

  /* Sort */
  while (reorder) {
    reorder = false;
    rows = Array.from(table.querySelectorAll('.tble-rows'));
    for (i = 0; i < rows.length - 1; i++) {
      ascending = false;
      x = Array.from(rows[i].getElementsByClassName('tble-cells'))[index];
      y = Array.from(rows[i + 1].getElementsByClassName('tble-cells'))[index];

      if (x.innerHTML > y.innerHTML) {
        ascending = true;
        break;
      }
    }
    if (ascending) {
      rows[i].parentElement.insertBefore(rows[i + 1], rows[i]);
      reorder = true;
    }
    return rows;
  }
}

/* Populate HTML */
function populateTable(arr) {
  let jsonIndex = 0;
  markup = '';
  jsonIndex = 0;
  body.innerHTML = '';
  table = document.getElementById('html-table');
  for (; jsonIndex < arr.length; jsonIndex++) {
    markup +=
      `<div class="tble-rows"><div class="tble-cells" data-type="id">${arr[jsonIndex].id}</div>` +
      `<div class="tble-cells" data-type="brand">${arr[jsonIndex].brand}</div>` +
      `<div class="tble-cells" data-type="category">${arr[jsonIndex].category}</div>` +
      `<div class="tble-cells" data-type="title">${arr[jsonIndex].title}</div>` +
      `<div class="tble-cells" data-type="price">${arr[jsonIndex].price}</div></div>`;
  }
  body.innerHTML = markup;
}

/* Import JSON */
(async () => {
  const { default: json } = await import('./data.json', {
    assert: { type: 'json' },
  });
  data = json.products;
  populateTable(data);
  for (var i = 0; i < headers.length; i++) {
    headers[i].addEventListener('click', setHeaderHandlers);
  }
})();
