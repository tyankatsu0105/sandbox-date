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
 * タイムゾーンがついている文字列からタイムゾーンを削除した文字列を返す
 */
const toUTC = (date: string) => {
  return date.replace(/\+09:00/g, "");
};

/**
 * 日付文字列をUTC文字列に変換した後、JSTに変換する
 */
const toJSTFromUTC = (...params: Parameters<typeof dayjs.utc>) =>
  dayjs.utc(...params).tz(TIMEZONE);

/**
 * JST文字列に変換する
 */
const toJST = (
  date: Parameters<typeof dayjs>[0],
  format?: Parameters<typeof dayjs>[1]
) => dayjs(date, format).tz(TIMEZONE);
/**
 * 日付文字列を、JSTの日付オブジェクトに変換する
 */
export const dayJST = (
  date?: Parameters<typeof dayjs.utc>[0],
  /**
   * 第一引数の文字列を、dayjsが標準で日付として認識できない場合、日付として解析させる文字列
   *
   * @see https://day.js.org/docs/en/parse/string-format#list-of-all-available-parsing-tokens
   * @example
   * dayJST("2021年01月01日", "YYYY年MM月DD日")
   * // 2021-01-01T00:00:00.000Z
   * dayJST("2021あいうえお01かきくけこ01さしすせそ", "YYYYあいうえおMMかきくけこDDさしすせそ")
   * // 2021-01-01T00:00:00.000Z
   */
  dateformat?: "YYYY年MM月DD日"
) => {
  const isString = typeof date === "string";
  if (!isString) return toJSTFromUTC(date, dateformat);

  const hasJSTTimezone = date.includes("+09:00");

  if (hasJSTTimezone) {
    const jstString = toJST(date);

    const datestring = toUTC(jstString.toISOString());

    return toJSTFromUTC(datestring, dateformat);
  }

  if (dateformat) {
    /**
     * NOTE: 2020-01-01のような文字列が来ても、タイムゾーンが未定なので、これを確定し、JSTとして扱う必要がある。
     * まずJSTとして扱い、+9時間された時間と、UTCに変換するための9時間の合計18時間を引くことで、UTCと思われる文字列に変換する。
     */
    const utcString = toJST(date, dateformat).subtract(18, "hour");

    const datestring = toUTC(utcString.toISOString());

    return toJST(datestring);
  }

  return toJSTFromUTC(date, dateformat);
};
