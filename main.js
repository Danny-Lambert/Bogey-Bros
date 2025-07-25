
// keep track of previous scroll position
let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', function() {
  // current scroll position
  const currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    // user has scrolled up
    document.querySelector('.navbar2').classList.remove('d-none');
  } else {
    // user has scrolled down
    document.querySelector('.navbar2').classList.add('d-none');
  }

  // update previous scroll position
  prevScrollPos = currentScrollPos;
});
        
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to all links
  $("a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const table = document.querySelector('.sortable-table');
  const headers = table.querySelectorAll('thead th button');
  const tbody = table.querySelector('tbody');
  let sortDirections = Array(headers.length).fill(null); // track asc/desc per column

  headers.forEach((headerBtn, index) => {
    headerBtn.addEventListener('click', () => {
      const rows = Array.from(tbody.querySelectorAll('tr'));
      const currentDirection = sortDirections[index] === 'asc' ? 'desc' : 'asc';

      // Reset all directions, set current
      sortDirections.fill(null);
      sortDirections[index] = currentDirection;

      rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[index].textContent.trim();
        const cellB = rowB.cells[index].textContent.trim();

        // Try numeric comparison first
        const numA = parseFloat(cellA.replace(/[^0-9.-]+/g, ''));
        const numB = parseFloat(cellB.replace(/[^0-9.-]+/g, ''));

        if (!isNaN(numA) && !isNaN(numB)) {
          return currentDirection === 'asc' ? numA - numB : numB - numA;
        }

        // Fallback to string compare
        return currentDirection === 'asc'
          ? cellA.localeCompare(cellB, undefined, { sensitivity: 'base' })
          : cellB.localeCompare(cellA, undefined, { sensitivity: 'base' });
      });

      // Re-add rows in sorted order
      rows.forEach(row => tbody.appendChild(row));

      // Update aria-sort and arrow icons
      headers.forEach((btn, i) => {
        const arrowSpan = btn.querySelector('span[aria-hidden="true"]');
        if (i === index) {
          btn.setAttribute('aria-sort', currentDirection === 'asc' ? 'ascending' : 'descending');
          arrowSpan.textContent = currentDirection === 'asc' ? ' ▲' : ' ▼';
        } else {
          btn.removeAttribute('aria-sort');
          arrowSpan.textContent = '';
        }
      });
    });
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const table = document.getElementById('player-stats-table');
  const headers = table.querySelectorAll('th');
  let sortDirection = {};

  headers.forEach((header, index) => {
    header.addEventListener('click', () => {
      const type = header.getAttribute('data-sort');
      const rows = Array.from(table.querySelector('tbody').rows);
      const direction = sortDirection[index] === 'asc' ? 'desc' : 'asc';
      sortDirection = {}; // reset
      sortDirection[index] = direction;

      // Remove previous sort classes
      headers.forEach(h => h.classList.remove('sorted-asc', 'sorted-desc'));
      header.classList.add(direction === 'asc' ? 'sorted-asc' : 'sorted-desc');

      const sortedRows = rows.sort((a, b) => {
        let aText = a.cells[index].innerText.trim();
        let bText = b.cells[index].innerText.trim();

        if (type === 'number') {
          aText = parseFloat(aText) || 0;
          bText = parseFloat(bText) || 0;
        }

        if (aText < bText) return direction === 'asc' ? -1 : 1;
        if (aText > bText) return direction === 'asc' ? 1 : -1;
        return 0;
      });

      const tbody = table.querySelector('tbody');
      tbody.innerHTML = '';
      tbody.append(...sortedRows);
    });
  });
});


