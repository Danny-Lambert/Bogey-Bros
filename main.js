


      
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


        /*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   sortable-table.js
 *
 *   Desc:   Adds sorting to a HTML data table that implements ARIA Authoring Practices
 */

        'use strict';

        class SortableTable {
          constructor(tableNode) {
            this.tableNode = tableNode;
        
            this.columnHeaders = tableNode.querySelectorAll('thead th');
        
            this.sortColumns = [];
        
            for (var i = 0; i < this.columnHeaders.length; i++) {
              var ch = this.columnHeaders[i];
              var buttonNode = ch.querySelector('button');
              if (buttonNode) {
                this.sortColumns.push(i);
                buttonNode.setAttribute('data-column-index', i);
                buttonNode.addEventListener('click', this.handleClick.bind(this));
              }
            }
        
            this.optionCheckbox = document.querySelector(
              'input[type="checkbox"][value="show-unsorted-icon"]'
            );
        
            if (this.optionCheckbox) {
              this.optionCheckbox.addEventListener(
                'change',
                this.handleOptionChange.bind(this)
              );
              if (this.optionCheckbox.checked) {
                this.tableNode.classList.add('show-unsorted-icon');
              }
            }
          }
        
          setColumnHeaderSort(columnIndex) {
            if (typeof columnIndex === 'string') {
              columnIndex = parseInt(columnIndex);
            }
        
            for (var i = 0; i < this.columnHeaders.length; i++) {
              var ch = this.columnHeaders[i];
              var buttonNode = ch.querySelector('button');
              if (i === columnIndex) {
                var value = ch.getAttribute('aria-sort');
                if (value === 'descending') {
                  ch.setAttribute('aria-sort', 'ascending');
                  this.sortColumn(
                    columnIndex,
                    'ascending',
                    ch.classList.contains('num')
                  );
                } else {
                  ch.setAttribute('aria-sort', 'descending');
                  this.sortColumn(
                    columnIndex,
                    'descending',
                    ch.classList.contains('num')
                  );
                }
              } else {
                if (ch.hasAttribute('aria-sort') && buttonNode) {
                  ch.removeAttribute('aria-sort');
                }
              }
            }
          }
        
          sortColumn(columnIndex, sortValue, isNumber) {
            function compareValues(a, b) {
              if (sortValue === 'ascending') {
                if (a.value === b.value) {
                  return 0;
                } else {
                  if (isNumber) {
                    return a.value - b.value;
                  } else {
                    return a.value < b.value ? -1 : 1;
                  }
                }
              } else {
                if (a.value === b.value) {
                  return 0;
                } else {
                  if (isNumber) {
                    return b.value - a.value;
                  } else {
                    return a.value > b.value ? -1 : 1;
                  }
                }
              }
            }
        
            if (typeof isNumber !== 'boolean') {
              isNumber = false;
            }
        
            var tbodyNode = this.tableNode.querySelector('tbody');
            var rowNodes = [];
            var dataCells = [];
        
            var rowNode = tbodyNode.firstElementChild;
        
            var index = 0;
            while (rowNode) {
              rowNodes.push(rowNode);
              var rowCells = rowNode.querySelectorAll('th, td');
              var dataCell = rowCells[columnIndex];
        
              var data = {};
              data.index = index;
              data.value = dataCell.textContent.toLowerCase().trim();
              if (isNumber) {
                data.value = parseFloat(data.value);
              }
              dataCells.push(data);
              rowNode = rowNode.nextElementSibling;
              index += 1;
            }
        
            dataCells.sort(compareValues);
        
            // remove rows
            while (tbodyNode.firstChild) {
              tbodyNode.removeChild(tbodyNode.lastChild);
            }
        
            // add sorted rows
            for (var i = 0; i < dataCells.length; i += 1) {
              tbodyNode.appendChild(rowNodes[dataCells[i].index]);
            }
          }
        
          /* EVENT HANDLERS */
        
          handleClick(event) {
            var tgt = event.currentTarget;
            this.setColumnHeaderSort(tgt.getAttribute('data-column-index'));
          }
        
          handleOptionChange(event) {
            var tgt = event.currentTarget;
        
            if (tgt.checked) {
              this.tableNode.classList.add('show-unsorted-icon');
            } else {
              this.tableNode.classList.remove('show-unsorted-icon');
            }
          }
        }
        
        // Initialize sortable table buttons
        window.addEventListener('load', function () {
          var sortableTables = document.querySelectorAll('table.sortable');
          for (var i = 0; i < sortableTables.length; i++) {
            new SortableTable(sortableTables[i]);
          }
        });
        
        
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
              $(document).ready(function () {
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
        
        