import asyncio
import logging
import sys
import time

from aiogram import Bot, Dispatcher, types, F
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart, Command
from aiogram.types import Message

import Bot.Buttons.buttons as buttons

API_TOKEN = "6556668249:AAF4eKx4c2IvgLZHNLKITpjM_msVb50-8OI"
dp = Dispatcher()
bot = Bot(API_TOKEN, parse_mode=ParseMode.HTML)

@dp.message(CommandStart())
async def start_command(message: Message):
   await message.answer("Привет", reply_markup=buttons.inline_menu)

async def main() -> None:
   await dp.start_polling(bot)

if __name__ == "__main__":
   logging.basicConfig(level=logging.INFO, stream=sys.stdout)
   asyncio.run(main())