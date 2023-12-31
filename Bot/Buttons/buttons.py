from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, ReplyKeyboardMarkup, KeyboardButton, WebAppInfo


application_number_phone = ReplyKeyboardMarkup(resize_keyboard=True, keyboard=[
   [KeyboardButton(text="Поделиться номером", request_contact=True)]
])

inlineMenu = InlineKeyboardMarkup(row_width=1, inline_keyboard=[
   [InlineKeyboardButton(text="Меню", web_app=WebAppInfo(url='https://domitory1.github.io/index.html'))],
   [InlineKeyboardButton(text="FAQ", callback_data='FAQ')]
])

inlineFaq = InlineKeyboardMarkup(row_width=1, inline_keyboard=[
   [InlineKeyboardButton(text="1️⃣ Как осуществляется доставка ?", callback_data='delivery')],
   [InlineKeyboardButton(text="2️⃣ Сколько кубов в коробке и какая цена ?", callback_data='count_block')], 
   [InlineKeyboardButton(text="3️⃣ Можно ли выбрать вкусы самостоятельно ?", callback_data='choice_flavors')],
   [InlineKeyboardButton(text="4️⃣ Как правильно приготовить коктель ?", callback_data='how_make')],
   [InlineKeyboardButton(text="5️⃣ Как красиво украсить коктель ?", callback_data='how_decorate')],
   [InlineKeyboardButton(text="6️⃣ Сколько будет проходить разморозка куба ?", callback_data='defrosting')],
   [InlineKeyboardButton(text="« Назад", callback_data='back')]
])

markup_admin_keyboard = ReplyKeyboardMarkup(resize_keyboard=True, keyboard=[
   [KeyboardButton(text='Редактировать приветственные сообщения', callback_data = '/edit_welcome_message')],
   [KeyboardButton(text='Редактировать меню (бот)', callback_data = '/edit_menu(bot)')],
   [KeyboardButton(text='Редактировать меню (сайт)', callback_data = '/edit_menu(site)')]
])
