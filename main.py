import asyncio
import logging
import sys
import time

from aiogram import Bot, Dispatcher
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

API_TOKEN = '6864075963:AAF4l4saMFdZ0V7YSytBviMEddw7chYGwz4'

dp = Dispatcher()

inline_menu = InlineKeyboardMarkup(row_width=1, inline_keyboard=[
    [InlineKeyboardButton(text="Меню", web_app=WebAppInfo(url='https://domitory1.github.io/index.html'))]
])

@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    await message.answer("Добрый день! 😊")
    time.sleep(1)
    await message.answer("Здесь вы можете ознакомитсья с меню Десертрума")
    time.sleep(2)
    await message.answer("Нажмите на кнопку, которая расположена под этим сообщением", reply_markup=inline_menu)

async def main() -> None:
    bot = Bot(API_TOKEN, parse_mode=ParseMode.HTML)
    await dp.start_polling(bot)

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())