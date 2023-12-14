tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

var slider = new Flickity('.slider',{
	freeScroll: true,
	contain: true,
	cellAlign: 'center',
	dragThreshold: 10,
	prevNextButtons: false,
	pageDots: false,
});

function getActiveICatalogNav(target) {
	let w = $(window);
	let t = $(target);
	let wt = w.scrollTop();
	let wh = w.height()- tg.viewportHeight / 2;
	let eh = t.outerHeight();
	let et = t.offset().top;
	if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)){
		return true;
	} else {
		return false;
	}
}

$('body').on('click', '[href*="#"]', function(e){
	e.preventDefault();
	e.stopImmediatePropagation();
	$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - 100 }, 200);
});

$(window).scroll(function(){
	$('.categoryElem').each(function(i) {
		if(getActiveICatalogNav('#'+$(this).attr('id'))) {
			if(slider.selectedIndex != i) {
				let current = $(this).attr('id');
				$('.slider a').each(function() {
					$(this).removeClass('active');
				})
				$('.slider a[href="#'+current+'"]').addClass('active');
				slider.select(i);
			}
		}
	});
});

const textBlocks = document.querySelectorAll('#descriptionProduct, #nameProduct');

function truncateText() {
    textBlocks.forEach(textBlock => {
    	const availableHeight = textBlock.clientHeight;
    	const originalText = textBlock.innerHTML;

		if (textBlock.scrollHeight > availableHeight) {
			let truncatedText = originalText;
			while (textBlock.scrollHeight > availableHeight && truncatedText.length > 0) {
				truncatedText = truncatedText.slice(0, -1);
				textBlock.innerHTML = truncatedText + '...';
			}
		}
  	});
}
truncateText();

function getData(){
	var imageURL = document.querySelector('.cardProduct img').getAttribute('src');
	var nameProduct = document.getElementById('nameProduct').textContent;

	var idCardProduct = this.closest('.cardProduct').id;
	console.log(idCardProduct);
}