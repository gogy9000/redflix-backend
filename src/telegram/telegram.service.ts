import { Injectable } from '@nestjs/common'
import { Telegraf } from 'telegraf'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'

interface TelegramOptions {
  chatId: string
  token: string
}

export const getTelegramConfig = (): TelegramOptions => ({
  // https://api.telegram.org/bot1201241240:token/getUpdates
  chatId: '288642712',
  token: '5070807616:AAGHWhiD9qTMz68gz6yccEXGRtY8x0ohOb0',
})

@Injectable()
export class TelegramService {
  bot: Telegraf
  options: TelegramOptions
  constructor() {
    this.options = getTelegramConfig()
    this.bot = new Telegraf(this.options.token)
  }
  async sendMessage(
    msg: string,
    chatId: string = this.options.chatId,
    options?: ExtraReplyMessage
  ) {
    await this.bot.telegram.sendMessage(chatId, msg, {
      parse_mode: 'HTML',
      ...options,
    })
  }
  async sendPhoto(
    photo: string,
    chatId: string = this.options.chatId,
    msg?: string
  ) {
    await this.bot.telegram.sendPhoto(
      chatId,
      photo,
      msg ? { caption: msg } : {}
    )
  }
}
