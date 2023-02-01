import { formattingDate } from "@/modules/shared/helpers";

describe("Test in dateFormat", () => {
  const date1 = 5894737432;
  const date2 = "un string" as any;
  const date3 = null as any;
  const date4 = undefined as any;
  const date5 = {} as any;
  const date6 = [] as any;
  test("should return a valid date", () => {
    const result = formattingDate(date1);
    expect(typeof result).toBe("string");
  });
  test("should return invalid date message", () => {
    const result = formattingDate(date2);
    expect(result).toBe("Invalid date");
    const result2 = formattingDate(date3);
    expect(result2).toBe("Invalid date");
    const result3 = formattingDate(date4);
    expect(result3).toBe("Invalid date");
    const result4 = formattingDate(date5);
    expect(result4).toBe("Invalid date");
    const result5 = formattingDate(date6);
    expect(result5).toBe("Invalid date");
  });
});
