import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

import "dayjs/locale/ja";

dayjs.locale("ja");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const TIMEZONE = "Asia/Tokyo";

/**
 * JST文字列と推測される文字列から、+09:00を削除する
 */
const toRemovedJSTTimezoneString = (date: string) => {
  return date.replace(/\+09:00/g, "");
};

/**
 * 日付文字列をUTC文字列に変換した後、JSTに変換する
 */
const toJSTFromUTC = (...params: Parameters<typeof dayjs.utc>) =>
  dayjs.utc(...params).tz(TIMEZONE);

/**
 * 日付文字列を、JSTの日付オブジェクトに変換する
 */
export const dayJST = (
  date?: Parameters<typeof dayjs.utc>[0],
  /**
   * dayjsが標準で日付として認識できない文字列を、日付として解析する
   *
   * @see https://day.js.org/docs/en/parse/string-format#list-of-all-available-parsing-tokens
   * @example dayJST("2021年01月01日", "YYYY年MM月DD日")
   * // 2021-01-01T00:00:00.000Z
   * dayJST("2021あいうえお01かきくけこ01さしすせそ", "YYYYあいうえおMMかきくけこDDさしすせそ")
   * // 2021-01-01T00:00:00.000Z
   */
  dateformat?: "YYYY年MM月DD日"
) => {
  const isString = typeof date === "string";
  if (!isString) return toJSTFromUTC(date, dateformat);

  const hasJSTTimezone = date.includes("+09:00");
  const isUserTimezoneJapan =
    Intl.DateTimeFormat().resolvedOptions().timeZone === TIMEZONE;

  if (hasJSTTimezone) {
    const datestring = toRemovedJSTTimezoneString(date);

    if (isUserTimezoneJapan) return toJSTFromUTC(datestring, dateformat);

    return toJSTFromUTC(datestring, dateformat);
  }

  return toJSTFromUTC(date, dateformat);
};
