import asyncio
import logging
import sys

from aiogram import Bot, Dispatcher, Router, types, F
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

API_TOKEN = "6556668249:AAF4eKx4c2IvgLZHNLKITpjM_msVb50-8OI"

dp = Dispatcher()
router = Router()
bot = Bot(API_TOKEN, parse_mode=ParseMode.HTML)

inlineMenu = InlineKeyboardMarkup(row_width=1, inline_keyboard=[
   [InlineKeyboardButton(text="Меню", web_app=WebAppInfo(url='https://domitory1.github.io/index.html'))],
   [InlineKeyboardButton(text="FAQ", callback_data='FAQ')]
])
inlineFAQ = InlineKeyboardMarkup(row_width=1, inline_keyboard=[
[InlineKeyboardButton(text="1️⃣ Как осуществляется доставка ?", callback_data='FAQ_delivery')],
   [InlineKeyboardButton(text="2️⃣ Сколько кубов в коробке и какая цена ?", callback_data='FAQ_countBlock')], 
   [InlineKeyboardButton(text="3️⃣ Можно ли выбрать вкусы самостоятельно ?", callback_data='FAQ_choiceFlavors')],
   [InlineKeyboardButton(text="4️⃣ Как правильно приготовить коктель ?", callback_data='FAQ_howMake')],
   [InlineKeyboardButton(text="5️⃣ Как красиво украсить коктель ?", callback_data='FAQ_howDecorate')],
   [InlineKeyboardButton(text="6️⃣ Сколько будет проходить разморозка куба ?", callback_data='FAQ_defrosting')],
   [InlineKeyboardButton(text="« Назад", callback_data='FAQ_back')]
])

@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
   await message.answer("Выбери подходящий раздел", reply_markup=inlineMenu)

@dp.callback_query(F.data == "FAQ")
async def callback_query_handler_FAQ(callback_query: types.CallbackQuery):
   await bot.edit_message_reply_markup(chat_id=callback_query.message.chat.id, message_id=callback_query.message.message_id, reply_markup=inlineFAQ)

@dp.callback_query(F.data == "FAQ_delivery")
async def callback_query_handler_delivery(callback_query: types.CallbackQuery):
   await bot.send_message(chat_id=callback_query.message.chat.id, text="👉Доставка осуществляется через Яндекс.такси по городу Казань и через маркетплейсы по России.")

@dp.callback_query(F.data == "FAQ_countBlock")
async def callback_query_handler_count_block(callback_query: types.CallbackQuery):
   await bot.send_message(chat_id=callback_query.message.chat.id, text="👉Xs коробка 6 кубиков - 1500 руб \nS коробка 12 кубиков -2300 руб \nМ коробка 24 кубика -4800 руб")

@dp.callback_query(F.data == "FAQ_choiceFlavors")
async def callback_query_handler_choice_flavors(callback_query: types.CallbackQuery):
   await bot.send_message(chat_id=callback_query.message.chat.id, text="👉Вы можете кликнуть на сайт baybox.ru, перейти в раздел товары и выбрать самостоятельно любимые вкусы для набора ")

@dp.callback_query(F.data == "FAQ_howMake")
async def callback_query_handler_how_make(callback_query: types.CallbackQuery):
   await bot.send_message(chat_id=callback_query.message.chat.id, text="👉 \n1) закинь куб в бокал \n2) добавь тоник или алкоголь, указанный в рецепте \n3) укрась коктейль лимоном, апельсином, лаймом или чем-то другим:) ")

@dp.callback_query(F.data == "FAQ_howDecorate")
async def callback_query_handler_how_decorate(callback_query: types.CallbackQuery):
   await bot.send_message(chat_id=callback_query.message.chat.id, text="👉В каждый набор мы кладем рецепты, где представлены варианты подачи и украшений ваших великолепных коктейлей. \n\nТакже можете посмотреть видео для более наглядного примера: https://youtube.com/shorts/vqgt1N14LXQ?si=RNzcU5EJz8upXECp")

@dp.callback_query(F.data == "FAQ_defrosting")
async def callback_query_handler_defrosting(callback_query: types.CallbackQuery):
   await bot.send_message(chat_id=callback_query.message.chat.id, text="👉Примерно в течение 5 минут куб полностью разморозится и раскроет все грани вкуса, выбранного вами, коктейля 🍸")

@dp.callback_query(F.data == "FAQ_back")
async def callback_query_handler_defrosting(callback_query: types.CallbackQuery):
   await bot.edit_message_reply_markup(chat_id=callback_query.message.chat.id, message_id=callback_query.message.message_id, reply_markup=inlineMenu)

async def main() -> None:
    await dp.start_polling(bot)

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())