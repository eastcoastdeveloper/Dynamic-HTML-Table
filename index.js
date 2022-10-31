import './style.css';

var headers = Array.from(document.querySelectorAll('.headers > div')),
  rows = Array.from(document.querySelectorAll('.tble-rows')),
  data = null,
  table = null,
  search = document.getElementById('search-field'),
  markup = '',
  queryStr = '',
  productID = document.getElementById('id'),
  brand = document.getElementById('brand'),
  category = document.getElementById('category'),
  title = document.getElementById('title'),
  price = document.getElementById('price');

search.addEventListener('keyup', (e) => {
  queryStr = search.value;

  for (let i = 0; i < data.length; i++) {
    if (data[i].title.includes(queryStr)) {
      let arr = data[i];
      data = arr;
      markup = "";
      populateTable(data)
    }
  }
});

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
  // console.log(arr)
  table = document.getElementById('html-table');
  for (var jsonIndex = 0; jsonIndex < arr.length; jsonIndex++) {
    markup +=
      `<div class="tble-rows"><div class="tble-cells" data-type="id">${arr[jsonIndex].id}</div>` +
      `<div class="tble-cells" data-type="brand">${arr[jsonIndex].brand}</div>` +
      `<div class="tble-cells" data-type="category">${arr[jsonIndex].category}</div>` +
      `<div class="tble-cells" data-type="title">${arr[jsonIndex].title}</div>` +
      `<div class="tble-cells" data-type="price">${arr[jsonIndex].price}</div></div>`;
      console.log(markup)
  }
  table.insertAdjacentHTML('beforeend', markup);
}

/* Import JSON */
(async () => {
  const { default: json } = await import('./data.json', {
    assert: { type: 'json' },
  });
  data = json.products;
  // masterArray = data.slice();
  populateTable(data);
  for (var i = 0; i < headers.length; i++) {
    headers[i].addEventListener('click', setHeaderHandlers);
  }
})();
