import { Injectable } from '@nestjs/common'
import { Telegraf } from 'telegraf'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'

interface TelegramOptions {
  chatId: string
  token: string
}

export const getTelegramConfig = (): TelegramOptions => ({
  // https://api.telegram.org/bot5931196524:AAEvd3uA4hR_B-Xdmn-rra2NrvisYY3Bslk/getUpdates
  chatId: '1916519017',
  token: '5931196524:AAEvd3uA4hR_B-Xdmn-rra2NrvisYY3Bslk',
})

@Injectable()
export class TelegramService {
  bot: Telegraf
  options: TelegramOptions
  constructor() {
    this.options = getTelegramConfig()
    this.bot = new Telegraf(this.options.token)
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
  async sendMessage(
    msg: string,
    options?: ExtraReplyMessage,
    chatId: string = this.options.chatId
  ) {
    await this.bot.telegram.sendMessage(chatId, msg, {
      parse_mode: 'HTML',
      ...options,
    })
  }
}
