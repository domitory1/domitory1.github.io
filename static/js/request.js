$(document).on('click', '.buttonAddToBasket', (e) => {
   e.stopPropagation();

   const cardProductId = $(e.target).closest('.cardProduct').attr('id');
   const priceProduct = $(e.target).text().replace(/\D/g, "");

   const data = {
      cardProductId,
      priceProduct
   };
   
   // следующие три строчки кода - временное решение, пока нет бека
   const buttons = '<button class="buttonRemove">-</button> <input class="quantity" readonly value = 1> <button class="buttonAdd">+</button>';
   const btnSpace = $(e.target).parents('.btn-space');
   btnSpace.html(buttons);
   console.log(btnSpace);
   /*
   $.ajax({
      type: 'POST',
      url: '#',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: (response) => {
         
      },
      error: (xhr, status, error) => {
         
      }
   });*/
});

$(document).on('click', '.buttonRemove', (e) => {
   e.stopPropagation();

   const cardProductId = $(e.target).closest('.cardProduct').attr('id');
   const priceProduct = $(e.target).text().replace(/\D/g, "");
   const data = {
      cardProductId,
      priceProduct
   };
   
   // следующие три строчки кода - временное решение, пока нет бека
   const buttons = '<button class="buttonRemove">-</button> <input class="quantity" readonly value = 1> <button class="buttonAdd">+</button>';
   const btnSpace = $(e.target).parents('.btn-space');
   btnSpace.html(buttons);
   /*
   $.ajax({
      type: 'POST',
      url: '#',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: (response) => {
         
      },
      error: (xhr, status, error) => {
         
      }
   });*/
});
$(document).on('click', '.buttonAdd', (e) => {
   e.stopPropagation();

   const cardProductId = $(e.target).closest('.cardProduct').attr('id');
   const priceProduct = $(e.target).text().replace(/\D/g, "");
   const data = {
      cardProductId,
      priceProduct
   };
   
   // следующие три строчки кода - временное решение, пока нет бека
   const buttons = '<button class="buttonRemove">-</button> <input class="quantity" readonly value = 1> <button class="buttonAdd">+</button>';
   const btnSpace = $(e.target).parents('.btn-space');
   btnSpace.html(buttons);
   /*
   $.ajax({
      type: 'POST',
      url: '#',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: (response) => {
         
      },
      error: (xhr, status, error) => {
         
      }
   });*/
});