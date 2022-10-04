import './style.css';

let headers = Array.from(document.querySelectorAll('.headers > div')),
  data = null,
  table = null,
  markup = '';

function setHeaderHandlers(e) {
  var table,
    rows,
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
  }
}

function populateTable() {
  table = document.getElementById('html-table');
  for (var jsonIndex = 0; jsonIndex < data.length; jsonIndex++) {
    markup +=
      '<div class="tble-rows">' +
      '<div class="tble-cells" data-type="id">' +
      data[jsonIndex].id +
      '</div>' +
      '<div class="tble-cells" data-type="brand">' +
      data[jsonIndex].brand +
      '</div>' +
      '<div class="tble-cells" data-type="category">' +
      data[jsonIndex].category +
      '</div>' +
      '<div class="tble-cells" data-type="title">' +
      data[jsonIndex].title +
      '</div>' +
      '<div class="tble-cells" data-type="price">' +
      data[jsonIndex].price +
      '</div>' +
      '</div>';
  }
  table.insertAdjacentHTML('beforeend', markup);
}

(async () => {
  const { default: json } = await import('./data.json', {
    assert: { type: 'json' },
  });
  data = json.products;
  populateTable();
  for (var i = 0; i < headers.length; i++) {
    headers[i].addEventListener('click', setHeaderHandlers);
  }
})();
