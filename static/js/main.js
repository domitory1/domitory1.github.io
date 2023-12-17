// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.ready();

// Инициализация слайдера для категорий
const sliderCategory = new Flickity('.sliderCategory', {
    freeScroll: true,
    contain: true,
    cellAlign: 'center',
    dragThreshold: 10,
    prevNextButtons: false,
    pageDots: false,
});

// Инициализация слайдера для распродажи
const sliderSale = new Flickity('.sliderSale', {
    autoPlay: 5000,
    wrapAround: true,
    fade: true,
    cellAlign: 'center',
    dragThreshold: 10,
    prevNextButtons: false,
});

// Функция для определения активного элемента в навигации
function getActiveICatalogNav(target) {
    let w = $(window);
    let t = $(target);
    let wt = w.scrollTop();
    let wh = w.height() - tg.viewportHeight / 2;
    let eh = t.outerHeight();
    let et = t.offset().top;
    if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {
        return true;
    } else {
        return false;
    }
}

// Обработчик клика по ссылкам
$('body').on('click', '[href*="#"]', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - 100 }, 200);
});

// Обработчик прокрутки страницы
$(window).scroll(function() {
    $('.categoryElem').each(function(i) {
        if (getActiveICatalogNav('#' + $(this).attr('id'))) {
            if (sliderCategory.selectedIndex != i) {
                let current = $(this).attr('id');
                $('.sliderCategory a').each(function() {
                    $(this).removeClass('active');
                })
                $('.sliderCategory a[href="#' + current + '"]').addClass('active');
                sliderCategory.select(i);
            }
        }
    });
});

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

// Получаем элементы по селекторам (! используются в popup.js)
const descriptions = document.querySelectorAll('#descriptionProduct');
const names = document.querySelectorAll('#nameProduct');

// Создаем массивы из текстовых содержимых элементов
const originalDescriptions = Array.from(descriptions).map(description => description.textContent);
const originalNames = Array.from(names).map(name => name.textContent);

// Вызываем функцию обрезания текста для карточек
truncateText(descriptions);
truncateText(names);