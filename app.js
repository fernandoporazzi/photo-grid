let items = [
  {w: 386, h: 217, src: 'image_1.jpg'},
  {w: 130, h: 232, src: 'image_2.jpg'},
  {w: 351, h: 197, src: 'image_3.jpg'},
  {w: 121, h: 215, src: 'image_4.jpg'},
  {w: 380, h: 214, src: 'image_5.jpg'},
  {w: 120, h: 214, src: 'image_6.jpg'},
  {w: 414, h: 233, src: 'image_7.jpg'},
  {w: 122, h: 217, src: 'image_8.jpg'},
  {w: 112, h: 200, src: 'image_9.jpg'},
  {w: 391, h: 220, src: 'image_10.jpg'},
  {w: 408, h: 230, src: 'image_11.jpg'},
  {w: 498, h: 280, src: 'image_12.jpg'},
  {w: 427, h: 240, src: 'image_13.jpg'},
  {w: 161, h: 215, src: 'image_14.jpg'},
  {w: 165, h: 220, src: 'image_15.jpg'},
  {w: 124, h: 220, src: 'image_16.jpg'},
  {w: 382, h: 215, src: 'image_17.jpg'},
  {w: 411, h: 231, src: 'image_18.jpg'},
  {w: 380, h: 214, src: 'image_19.jpg'},
  {w: 391, h: 220, src: 'image_20.jpg'}
];

const root = document.getElementById('root');
const desirableHeight = 230;
const availableWidth = root.offsetWidth;
const gutter = 11;
let rows = [];
let row = {};
let startNewRow = true;
let accumulatedWidth = 0;
let itemsInThisRow = 0;

for (let i = 0; i < items.length; i++) {
  if (startNewRow) {
    row.items = [];
    row.height = 0;
    accumulatedWidth = 0;
    itemsInThisRow = 0;
  }

  startNewRow = false;

  accumulatedWidth = accumulatedWidth + ( (items[i].w * desirableHeight) / items[i].h );
  itemsInThisRow++;
  row.items = row.items.concat(items[i]);

  if ( (availableWidth - accumulatedWidth) < 100 ) {
    const accumulatedGutter = (itemsInThisRow - 1) * gutter;
    accumulatedWidth = accumulatedWidth + accumulatedGutter;
    row.height = (availableWidth * desirableHeight) / accumulatedWidth;

    let { height, items } = row;

    rows = rows.concat({height, items});
    startNewRow = true;
  } else {
    if (!items[i + 1]) {
      const { items } = row;
      const height = desirableHeight;
      rows = rows.concat({height, items})
    }
  }
}

const fragment = rows.reduce((acc, curr) => {
return `${acc}<div class="row" style="height: ${curr.height}px">
  ${curr.items.reduce((accumulated, currentItem) => {
    return `${accumulated}<img src="./img/${currentItem.src}">`  
  }, '')}  
</div>`
}, '');

root.innerHTML = fragment;
