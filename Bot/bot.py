import asyncio
import logging
import sys
import time

import mysql.connector

from aiogram import Bot, Dispatcher, types, F
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message

import Buttons.buttons as buttons

def connect_to_db():
   return mysql.connector.connect(user='root', password='root',
                                 database='webappmenu', host='127.0.0.1')

def check_phone_number_in_db(user_id):
   conn = connect_to_db()
   cursor = conn.cursor(buffered=True)
   try:
      cursor.execute(f'SELECT * FROM пользователи WHERE `Телеграм ID пользователя` = {user_id}')
      result = cursor.fetchone()
      return result is not None
   finally:
      cursor.close()
      conn.close()

API_TOKEN = "6658531652:AAEn5TRw5p4yHulphWYttyNfr2bQecvDNvU"

dp = Dispatcher()

bot = Bot(API_TOKEN, parse_mode=ParseMode.HTML)

message_texts_start = ["Добрый день! 😊", "Перед тем, как вы сделаете ваш первый заказ, поделитесь, пожалуйста, своим номером телефона. 😌\n\n"
                     "Он нужен для того, чтобы мы смогли добавить блюда именно в вашу корзину"]

@dp.message(CommandStart())
async def start_command(message: Message):
   user_id = message.from_user.id
   if check_phone_number_in_db(user_id):
      await message.answer("Выберите раздел", reply_markup=buttons.inline_menu)
   else:
      for text in message_texts_start:
         time.sleep(1)
         if message_texts_start.index(text) != 1:
            await message.answer(text)
         else:
            await message.answer(text, reply_markup=buttons.application_number_phone)

@dp.message(F.content_type == types.ContentType.CONTACT)
async def handler_contant(message: Message):
   await message.answer("Спасибо! Ваш номер телефона сохранен", reply_markup=types.ReplyKeyboardRemove())
   time.sleep(1)
   await message.answer("Выберите раздел", reply_markup=buttons.inline_menu)
   conn = connect_to_db()
   cursor = conn.cursor(buffered=True)
   try:
      cursor.execute(f'INSERT INTO пользователи (`Телеграм ID пользователя`, `Номер телефона`) VALUES ({message.contact.user_id}, {message.contact.phone_number})')
      conn.commit()
   finally:
      cursor.close()
      conn.close()

async def main() -> None:
   await dp.start_polling(bot)

if __name__ == "__main__":
   logging.basicConfig(level=logging.INFO, stream=sys.stdout)
   asyncio.run(main())