$('.buttonAddToBasket').click(function(e) {
   e.stopPropagation();

   var cardProductId = $(this).closest('.cardProduct').attr('id').replace("elem_", "");
   var priceProduct = $(this).text().replace(/\D/g, "");
   var data = {
      cardProductId: cardProductId,
      priceProduct: priceProduct
   }
   
   // следующие три строчки кода - временное решение, пока нет бека
   const buttons = '<button class="buttonRemove">-</button> <input class="quantity" readonly value = 1> <button class="buttonAdd">+</button>';
   const btnSpace = $(this).parents('.btn-space');
   btnSpace.html($(buttons));
/*
   $.ajax({
      type: 'POST',
      url: '#',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(response) {
         
      },
      error: function(xhr, status, error) {
         
      }
   });*/
 });