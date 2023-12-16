// Получаем элементы по селекторам
const descriptions = document.querySelectorAll('#descriptionProduct');
const names = document.querySelectorAll('#nameProduct');
const popupOverlay = document.getElementById("popup-overlay");
const popup = document.getElementById("popup");

// Создаем массивы из текстовых содержимых элементов
const originalDescriptions = Array.from(descriptions).map(description => description.textContent);
const originalNames = Array.from(names).map(name => name.textContent);

// Функция для отображения всплывающего окна

function showPopup(element) {
    document.body.classList.add('popup-open');

    const idElement = parseInt(element.id.replace(/\D/g, ''));
    const srcImageProduct = element.querySelector('img').getAttribute('src');

    const image = document.createElement('img');
    image.src = srcImageProduct;

    const name = document.createElement('h3');
    name.textContent = originalNames[idElement - 1];

    const description = document.createElement('p');
    description.textContent = originalDescriptions[idElement - 1];

    popup.innerHTML = '';
    popup.appendChild(image);
    popup.appendChild(name);
    popup.appendChild(description);

    var popupOverlay = document.getElementById('popup-overlay');
    popupOverlay.classList.add('active');

    //popupOverlay.classList.add('show');
    //popupOverlay.style.display = "block";
}

// Функция для обрезания текста
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

// Добавляем обработчики событий для карточек
const cards = document.querySelectorAll('.cardProduct');
cards.forEach(card => {
    card.addEventListener('click', function() {
        showPopup(this);
    });
});

// Вызываем функцию обрезания текста для карточек
truncateText(descriptions);
truncateText(names);

// Функция для скрытия всплывающего окна
function hidePopup() {
    while (popup.firstChild) {
        popup.removeChild(popup.firstChild);
    }

    var popupOverlay = document.getElementById('popup-overlay');
    popupOverlay.classList.remove('active');

    //popupOverlay.classList.remove('show');
    //popupOverlay.style.display = "none";
    document.body.classList.remove('popup-open');
}

// Добавляем обработчики событий для скрытия всплывающего окна
popupOverlay.addEventListener("click", hidePopup);
popup.addEventListener("click", hidePopup);
popup.addEventListener("click", (event) => event.stopPropagation());