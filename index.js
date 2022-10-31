import './style.css';

var headers = Array.from(document.querySelectorAll('.headers > div')),
  search = document.getElementById('search-field'),
  caret = document.querySelector('.caret'),
  body = document.querySelector('.body'),
  filterType = null,
  filtered = null,
  index = null,
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
          (item, i) => filtered.indexOf(item) === i
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

/* Sort */
function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };
}

/* Filter Type & Caret Positioning */
function sortColumn(e) {
  filterType = e.target.innerHTML.toLowerCase();
  data.sort(compareValues(filterType));
  populateTable(data);

  table = document.getElementById('html-table');
  caret != undefined ? caret.remove() : '';
  caret = document.createElement('span');
  caret.classList.add('caret');
  caret.innerHTML = '&#x25B2';
  index = e.target.getAttribute('data-id');
  e.target.appendChild(caret);
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
