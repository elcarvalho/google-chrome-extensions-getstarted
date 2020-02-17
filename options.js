const page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

const constructOptions = kButtonColors => {
  kButtonColors.forEach(color => {
    const button = document.createElement('button');

    button.style.backgroundColor = color;

    button.addEventListener('click', () => {
      chrome.storage.sync.set({ color: color }, () => {
        console.log('color is ' + color);
      });
    });

    page.appendChild(button);
  });
};

constructOptions(kButtonColors);
