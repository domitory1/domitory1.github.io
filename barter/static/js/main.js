const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.ready();

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader')
    preloader.classList.add('preloader_hidden')
})

const sliderSale = new Flickity('.sliderSale', {
    autoPlay: 7000,
    wrapAround: true,
    fade: true,
    cellAlign: 'center',
    dragThreshold: 10,
    prevNextButtons: false,
});

function truncateText(elements) {
    elements.forEach(element => {
        const availableHeight = element.clientHeight;
        const originalText = element.textContent;

        if (element.scrollHeight > availableHeight) {
            let truncatedText = originalText;
            while (element.scrollHeight > availableHeight && truncatedText.length > 0) {
                truncatedText = truncatedText.slice(0, -1);
                element.textContent = truncatedText + '...';
            }
        }
    });
}

const descriptions = document.querySelectorAll('#descriptionProduct');
const names = document.querySelectorAll('#nameProduct');
const originalDescriptions = Array.from(descriptions).map(description => description.textContent);
const originalNames = Array.from(names).map(name => name.textContent);

truncateText(descriptions);
truncateText(names);

const popupOverlay = document.getElementById("popup-overlay");
const popup = document.querySelector(".popup");

const showPopup = (element) => {
    document.body.classList.add('popup-open');

    const idProduct = element.id.replace(/\D/g, '');
    const srcImageProduct = element.querySelector('img').getAttribute('src');

    const image = new Image();
    image.src = srcImageProduct;
    const name = document.createElement('h3');
    name.textContent = originalNames[idProduct];
    const description = document.createElement('p');
    description.textContent = originalDescriptions[idProduct];

    popup.innerHTML = '';
    popup.appendChild(image);
    popup.appendChild(name);
    popup.appendChild(description);

    popupOverlay.classList.add('active');
};

document.querySelectorAll('.cardProduct').forEach(item => {
    item.addEventListener('click', (event) => {
        if (event.target.closest('.btnEnable') && document.body.classList != "popup-open") {
            showPopup(item);
        }
    });
});

const hidePopup = () => {
    popup.innerHTML = '';
    popupOverlay.classList.remove('active');
    document.body.classList.remove('popup-open');
};

popupOverlay.addEventListener("click", hidePopup);
popup.addEventListener("click", hidePopup);
popup.addEventListener("click", (event) => event.stopPropagation());

