import { describe, expect, it } from "vitest";
import { truncateWords } from "./news-feed";

describe("truncateWords", () => {
  it("keeps short text unchanged", () => {
    expect(truncateWords("Kurzer Text", 200)).toBe("Kurzer Text");
  });
  it("cuts long text at a word boundary within the limit", () => {
    const out = truncateWords("wort ".repeat(80), 200);
    expect(out.length).toBeLessThanOrEqual(200);
    expect(out.endsWith("wort …")).toBe(true);
  });
});
