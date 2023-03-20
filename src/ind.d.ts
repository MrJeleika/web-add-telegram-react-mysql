export {}

declare global {
  interface Window {
    Telegram: any
  }
  interface Date {
    getWeek(): number
  }
}
