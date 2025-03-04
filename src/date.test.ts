import { expect, describe, it, vi, beforeEach, afterEach } from "vitest";
import * as Features from "./date";

describe("タイムゾーンが変わっている", () => {
  it("日本 - Asia/Tokyo", () => {
    process.env.TZ = "Asia/Tokyo";

    expect(process.env.TZ).toBe("Asia/Tokyo");
    expect(Intl.DateTimeFormat().resolvedOptions().timeZone).toBe("Asia/Tokyo");
  });
  it("Nome、AK - アメリカ合衆国 - America/Nome", () => {
    process.env.TZ = "America/Nome";

    expect(process.env.TZ).toBe("America/Nome");
    expect(Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(
      "America/Nome"
    );
  });
});

describe("dayJST", () => {
  const timezones = [
    "Asia/Tokyo",
    // 日本と時差が-18時間
    "America/Nome",
  ];

  timezones.forEach((timezone) => {
    describe(`timezoneが${timezone}`, () => {
      process.env.TZ = timezone;

      const date = "2000-01-01";
      const time = new Date(date);
      vi.setSystemTime(time);

      it("現在時刻を取得", () => {
        const result = Features.dayJST();

        expect(result.toISOString()).toBe("2000-01-01T00:00:00.000Z");
        expect(result.toString()).toBe("Sat, 01 Jan 2000 00:00:00 GMT");
        expect(result.format("YYYY-MM-DDTHH:mm:ss")).toBe(
          "2000-01-01T09:00:00"
        );
      });

      it("UTC文字列", () => {
        const result = Features.dayJST("2000-01-01T00:00:00Z");

        expect(result.toISOString()).toBe("2000-01-01T00:00:00.000Z");
        expect(result.toString()).toBe("Sat, 01 Jan 2000 00:00:00 GMT");
        expect(result.format("YYYY-MM-DDTHH:mm:ss")).toBe(
          "2000-01-01T09:00:00"
        );
      });

      it("TとZがないUTC文字列", () => {
        const result = Features.dayJST("2000-01-01T00:00:00+00:00");

        expect(result.toISOString()).toBe("2000-01-01T00:00:00.000Z");
        expect(result.toString()).toBe("Sat, 01 Jan 2000 00:00:00 GMT");
        expect(result.format("YYYY-MM-DDTHH:mm:ss")).toBe(
          "2000-01-01T09:00:00"
        );
      });

      it("JST文字列", () => {
        const result = Features.dayJST("2000-01-01T00:00:00+09:00");

        expect(result.toISOString()).toBe("1999-12-31T15:00:00.000Z");
        expect(result.toString()).toBe("Fri, 31 Dec 1999 15:00:00 GMT");
        expect(result.format("YYYY-MM-DDTHH:mm:ss")).toBe(
          "2000-01-01T00:00:00"
        );
      });

      it("日付文字列", () => {
        const result = Features.dayJST("Sat, 01 Jan 2000 00:00:00 GMT");

        expect(result.toISOString()).toBe("2000-01-01T00:00:00.000Z");
        expect(result.toString()).toBe("Sat, 01 Jan 2000 00:00:00 GMT");
        expect(result.format("YYYY-MM-DDTHH:mm:ss")).toBe(
          "2000-01-01T09:00:00"
        );
      });

      it("YYYY年MM月DD日", () => {
        const result = Features.dayJST("2000年01月01日", "YYYY年MM月DD日");

        expect(result.toISOString()).toBe("1999-12-31T15:00:00.000Z");
        expect(result.toString()).toBe("Fri, 31 Dec 1999 15:00:00 GMT");
        expect(result.format("YYYY-MM-DDTHH:mm:ss")).toBe(
          "2000-01-01T00:00:00"
        );
      });
    });
  });
});
