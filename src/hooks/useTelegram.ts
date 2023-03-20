declare global {
  interface Window {
    Telegram: any
  }
}

export const useTelegram = () => {
  const tg = window.Telegram.WebApp
  return tg
}
