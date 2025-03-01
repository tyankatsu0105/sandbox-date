import { expect, describe, it, vi, beforeEach, afterEach } from "vitest";
import * as Features from "./date";
import dayjs from "dayjs";

describe("タイムゾーンが変わっている", () => {
  it("日本 - Asia/Tokyo", () => {
    process.env.TZ = "Asia/Tokyo";

    expect(process.env.TZ).toBe("Asia/Tokyo");
    expect(new Date().getTimezoneOffset()).toBe(-540);
    expect(new Date("2000-01-01").toString()).toBe(
      "Sat Jan 01 2000 09:00:00 GMT+0900 (日本標準時)"
    );
  });
  it("Nome、AK - アメリカ合衆国 - America/Nome", () => {
    process.env.TZ = "America/Nome";

    expect(process.env.TZ).toBe("America/Nome");
    expect(new Date().getTimezoneOffset()).toBe(540);
    expect(new Date("2000-01-01").toString()).toBe(
      "Fri Dec 31 1999 15:00:00 GMT-0900 (アラスカ標準時)"
    );
  });
});

describe("date", () => {
  describe("2000-01-01T00:00:00Z", () => {
    const date = "2000-01-01T00:00:00Z";

    it("日本 - Asia/Tokyo", () => {
      process.env.TZ = "Asia/Tokyo";

      expect(Features.dayJST(date).toDate().toString()).toBe(
        "Sat Jan 01 2000 09:00:00 GMT+0900 (日本標準時)"
      );
      expect(Features.dayJST(date).toString()).toBe(
        "Sat, 01 Jan 2000 00:00:00 GMT"
      );
      expect(Features.dayJST(date).format("YYYY-MM-DDTHH:mm:ss")).toBe(
        "2000-01-01T09:00:00"
      );
    });

    it("Nome、AK - アメリカ合衆国 - America/Nome", () => {
      process.env.TZ = "America/Nome";

      expect(Features.dayJST(date).toDate().toString()).toBe(
        "Fri Dec 31 1999 15:00:00 GMT-0900 (アラスカ標準時)"
      );
      expect(Features.dayJST(date).toString()).toBe(
        "Sat, 01 Jan 2000 00:00:00 GMT"
      );
      expect(Features.dayJST(date).format("YYYY-MM-DDTHH:mm:ss")).toBe(
        "2000-01-01T09:00:00"
      );
    });
  });

  describe("2000-01-01T00:00:00+00:00", () => {
    const date = "2000-01-01T00:00:00+00:00";
    it("日本 - Asia/Tokyo", () => {
      process.env.TZ = "Asia/Tokyo";

      expect(Features.dayJST(date).toDate().toString()).toBe(
        "Sat Jan 01 2000 09:00:00 GMT+0900 (日本標準時)"
      );
      expect(Features.dayJST(date).toString()).toBe(
        "Sat, 01 Jan 2000 00:00:00 GMT"
      );
      expect(Features.dayJST(date).format("YYYY-MM-DDTHH:mm:ss")).toBe(
        "2000-01-01T09:00:00"
      );
    });
    it("Nome、AK - アメリカ合衆国 - America/Nome", () => {
      process.env.TZ = "America/Nome";

      expect(Features.dayJST(date).toDate().toString()).toBe(
        "Fri Dec 31 1999 15:00:00 GMT-0900 (アラスカ標準時)"
      );
      expect(Features.dayJST(date).toString()).toBe(
        "Sat, 01 Jan 2000 00:00:00 GMT"
      );
      expect(Features.dayJST(date).format("YYYY-MM-DDTHH:mm:ss")).toBe(
        "2000-01-01T09:00:00"
      );
    });
  });

  describe("2000-01-01T00:00:00+09:00", () => {
    const date = "2000-01-01T00:00:00+09:00";
    it("日本 - Asia/Tokyo", () => {
      process.env.TZ = "Asia/Tokyo";

      expect(Features.dayJST(date).toDate().toString()).toBe(
        "Sat Jan 01 2000 09:00:00 GMT+0900 (日本標準時)"
      );
      expect(Features.dayJST(date).toString()).toBe(
        "Sat, 01 Jan 2000 00:00:00 GMT"
      );
      expect(Features.dayJST(date).format("YYYY-MM-DDTHH:mm:ss")).toBe(
        "2000-01-01T09:00:00"
      );
    });
    it("Nome、AK - アメリカ合衆国 - America/Nome", () => {
      process.env.TZ = "America/Nome";

      expect(Features.dayJST(date).toDate().toString()).toBe(
        "Fri Dec 31 1999 15:00:00 GMT-0900 (アラスカ標準時)"
      );
      expect(Features.dayJST(date).toString()).toBe(
        "Sat, 01 Jan 2000 00:00:00 GMT"
      );
      expect(Features.dayJST(date).format("YYYY-MM-DDTHH:mm:ss")).toBe(
        "2000-01-01T09:00:00"
      );
    });
  });

  describe("Sat, 01 Jan 2000 00:00:00 GMT", () => {
    const date = "Sat, 01 Jan 2000 00:00:00 GMT";
    it("日本 - Asia/Tokyo", () => {
      process.env.TZ = "Asia/Tokyo";

      expect(Features.dayJST(date).toDate().toString()).toBe(
        "Sat Jan 01 2000 09:00:00 GMT+0900 (日本標準時)"
      );
      expect(Features.dayJST(date).toString()).toBe(
        "Sat, 01 Jan 2000 00:00:00 GMT"
      );
      expect(Features.dayJST(date).format("YYYY-MM-DDTHH:mm:ss")).toBe(
        "2000-01-01T09:00:00"
      );
    });
    it("Nome、AK - アメリカ合衆国 - America/Nome", () => {
      process.env.TZ = "America/Nome";

      expect(Features.dayJST(date).toDate().toString()).toBe(
        "Fri Dec 31 1999 15:00:00 GMT-0900 (アラスカ標準時)"
      );
      expect(Features.dayJST(date).toString()).toBe(
        "Sat, 01 Jan 2000 00:00:00 GMT"
      );
      expect(Features.dayJST(date).format("YYYY-MM-DDTHH:mm:ss")).toBe(
        "2000-01-01T09:00:00"
      );
    });
  });

  describe(`${Features.dayJST("2000-01-01T00:00:00+00:00").toDate()}`, () => {
    const date = Features.dayJST("2000-01-01T00:00:00+00:00").toDate();
    it("日本 - Asia/Tokyo", () => {
      process.env.TZ = "Asia/Tokyo";

      expect(Features.dayJST(date).toDate().toString()).toBe(
        "Sat Jan 01 2000 09:00:00 GMT+0900 (日本標準時)"
      );
      expect(Features.dayJST(date).toString()).toBe(
        "Sat, 01 Jan 2000 00:00:00 GMT"
      );
      expect(Features.dayJST(date).format("YYYY-MM-DDTHH:mm:ss")).toBe(
        "2000-01-01T09:00:00"
      );
    });
    it("Nome、AK - アメリカ合衆国 - America/Nome", () => {
      process.env.TZ = "America/Nome";

      expect(Features.dayJST(date).toDate().toString()).toBe(
        "Fri Dec 31 1999 15:00:00 GMT-0900 (アラスカ標準時)"
      );
      expect(Features.dayJST(date).toString()).toBe(
        "Sat, 01 Jan 2000 00:00:00 GMT"
      );
      expect(Features.dayJST(date).format("YYYY-MM-DDTHH:mm:ss")).toBe(
        "2000-01-01T09:00:00"
      );
    });
  });

  describe(`${Features.dayJST("2000-01-01T00:00:00+09:00").toDate()}`, () => {
    const date = Features.dayJST("2000-01-01T00:00:00+09:00").toDate();
    it("日本 - Asia/Tokyo", () => {
      process.env.TZ = "Asia/Tokyo";

      expect(Features.dayJST(date).toDate().toString()).toBe(
        "Sat Jan 01 2000 09:00:00 GMT+0900 (日本標準時)"
      );
      expect(Features.dayJST(date).toString()).toBe(
        "Sat, 01 Jan 2000 00:00:00 GMT"
      );
      expect(Features.dayJST(date).format("YYYY-MM-DDTHH:mm:ss")).toBe(
        "2000-01-01T09:00:00"
      );
    });
    it("Nome、AK - アメリカ合衆国 - America/Nome", () => {
      process.env.TZ = "America/Nome";

      expect(Features.dayJST(date).toDate().toString()).toBe(
        "Fri Dec 31 1999 15:00:00 GMT-0900 (アラスカ標準時)"
      );
      expect(Features.dayJST(date).toString()).toBe(
        "Sat, 01 Jan 2000 00:00:00 GMT"
      );
      expect(Features.dayJST(date).format("YYYY-MM-DDTHH:mm:ss")).toBe(
        "2000-01-01T09:00:00"
      );
    });
  });

  describe("current date", () => {
    beforeEach(() => {
      // tell vitest we use mocked time
      vi.useFakeTimers();
    });

    afterEach(() => {
      // restoring date after each test run
      vi.useRealTimers();
    });

    it("日本 - Asia/Tokyo", () => {
      const date = "2000-01-01";
      process.env.TZ = "Asia/Tokyo";
      const time = new Date(date);
      vi.setSystemTime(time);

      expect(new Date().toString()).toBe(
        "Sat Jan 01 2000 09:00:00 GMT+0900 (日本標準時)"
      );
      expect(Features.dayJST(date).toDate().toString()).toBe(
        "Sat Jan 01 2000 09:00:00 GMT+0900 (日本標準時)"
      );
      expect(Features.dayJST().toString()).toBe(
        "Sat, 01 Jan 2000 00:00:00 GMT"
      );
      expect(Features.dayJST().format("YYYY-MM-DDTHH:mm:ss")).toBe(
        "2000-01-01T09:00:00"
      );
    });
    it("Nome、AK - アメリカ合衆国 - America/Nome", () => {
      const date = "2000-01-01";
      process.env.TZ = "America/Nome";
      const time = new Date(date);
      vi.setSystemTime(time);

      expect(new Date().toString()).toBe(
        "Fri Dec 31 1999 15:00:00 GMT-0900 (アラスカ標準時)"
      );
      expect(Features.dayJST(date).toDate().toString()).toBe(
        "Fri Dec 31 1999 15:00:00 GMT-0900 (アラスカ標準時)"
      );
      expect(Features.dayJST().toString()).toBe(
        "Sat, 01 Jan 2000 00:00:00 GMT"
      );
      expect(Features.dayJST().format("YYYY-MM-DDTHH:mm:ss")).toBe(
        "2000-01-01T09:00:00"
      );
    });
  });

  describe("2000年01月01日", () => {
    const date = "2000年01月01日";
    it("日本 - Asia/Tokyo", () => {
      process.env.TZ = "Asia/Tokyo";

      expect(
        Features.toJSTFromFormat({
          date,
          dateformat: "YYYY年MM月DD日",
        })
          .toDate()
          .toString()
      ).toBe("Sat Jan 01 2000 09:00:00 GMT+0900 (日本標準時)");
      expect(
        Features.toJSTFromFormat({
          date,
          dateformat: "YYYY年MM月DD日",
        }).toString()
      ).toBe("Sat, 01 Jan 2000 00:00:00 GMT");
      expect(
        Features.toJSTFromFormat({ date, dateformat: "YYYY年MM月DD日" }).format(
          "YYYY-MM-DDTHH:mm:ss"
        )
      ).toBe("2000-01-01T09:00:00");
    });
    it("Nome、AK - アメリカ合衆国 - America/Nome", () => {
      process.env.TZ = "America/Nome";

      expect(
        Features.toJSTFromFormat({
          date,
          dateformat: "YYYY年MM月DD日",
        })
          .toDate()
          .toString()
      ).toBe("Fri Dec 31 1999 15:00:00 GMT-0900 (アラスカ標準時)");
      expect(
        Features.toJSTFromFormat({
          date,
          dateformat: "YYYY年MM月DD日",
        }).toString()
      ).toBe("Sat, 01 Jan 2000 00:00:00 GMT");
      expect(
        Features.toJSTFromFormat({ date, dateformat: "YYYY年MM月DD日" }).format(
          "YYYY-MM-DDTHH:mm:ss"
        )
      ).toBe("2000-01-01T09:00:00");
    });
  });
});
