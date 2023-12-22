const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.ready();

const sliderCategory = new Flickity('.sliderCategory', {
    freeScroll: true,
    contain: true,
    cellAlign: 'center',
    dragThreshold: 10,
    prevNextButtons: false,
    pageDots: false,
});

const sliderSale = new Flickity('.sliderSale', {
    autoPlay: 7000,
    wrapAround: true,
    fade: true,
    cellAlign: 'center',
    dragThreshold: 10,
    prevNextButtons: false,
});

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

$('body').on('click', '[href*="#"]', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - 100 }, 200);
});

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

console.log(originalDescriptions);

truncateText(descriptions);
truncateText(names);