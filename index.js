import './style.css';

var headers = Array.from(document.querySelectorAll('.headers > div')),
  rows = Array.from(document.querySelectorAll('.tble-rows')),
  search = document.getElementById('search-field'),
  caret = document.querySelector('.caret'),
  body = document.querySelector('.body'),
  filtered = null,
  table = null,
  data = null,
  markup = '',
  str = '';

/* Search and Filter */
search.addEventListener('keyup', () => {
  str = search.value;
  if (str != '') {
    filtered = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].title.includes(str)) {
        filtered.push(data[i]);
        filtered = filtered.filter(
          (item, index) => filtered.indexOf(item) === index
        );
        populateTable(filtered);
      }
    }
  } else {
    populateTable(data);
  }
});

/* Populate HTML */
function populateTable(arr) {
  markup = '';
  body.innerHTML = '';
  renderData(arr);
  body.innerHTML = markup;
}

/* Render Data */
function renderData(arr) {
  for (var i = 0; i < arr.length; i++) {
    markup +=
      `<div class="tble-rows">` +
      `<div class="tble-cells">${arr[i].id}</div>` +
      `<div class="tble-cells">${arr[i].brand}</div>` +
      `<div class="tble-cells">${arr[i].category}</div>` +
      `<div class="tble-cells">${arr[i].title}</div>` +
      `<div class="tble-cells">${arr[i].price}</div>` +
      `</div>`;
  }
}

function compare(a,b){
  if ( a.title < b.title ){
    return -1;
  }
  if ( a.title > b.title ){
    return 1;
  }
  return 0;
}


function sortColumn(type) {
  console.log(type)
  // let sorted = data.sort(compare);
  // populateTable(sorted)
  // console.log(sorted)

  // var x,
  //   y,
  //   ascending,
  //   index,
  //   reorder = true;

  // table = document.getElementById('html-table');
  // caret != undefined ? caret.remove() : '';
  // caret = document.createElement('span');
  // caret.classList.add('caret');
  // caret.innerHTML = '&#x25B2';
  // index = e.target.getAttribute('data-id');
  // e.target.appendChild(caret);

  // /* Sort */
  // while (reorder) {
  //   reorder = false;
  //   rows = Array.from(table.querySelectorAll('.tble-rows'));
  //   for (var i = 0; i < rows.length - 1; i++) {
  //     ascending = false;
  //     x = Array.from(rows[i].getElementsByClassName('tble-cells'))[index];
  //     y = Array.from(rows[i + 1].getElementsByClassName('tble-cells'))[index];

  //     if (x.innerHTML > y.innerHTML) {
  //       ascending = true;
  //       break;
  //     }
  //   }
  //   if (ascending) {
  //     rows[i].parentElement.insertBefore(rows[i + 1], rows[i]);
  //     reorder = true;
  //   }
  //   return rows;
  // }
}

/* Import JSON */
(async () => {
  const { default: json } = await import('./data.json', {
    assert: { type: 'json' },
  });
  data = json.products;
  populateTable(data);
  for (var i = 0; i < headers.length; i++) {
    headers[i].addEventListener('click', sortColumn);
  }
})();
