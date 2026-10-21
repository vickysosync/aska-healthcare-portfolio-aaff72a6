import { describe, expect, it } from "vitest";
import { validateEnquiry } from "@/lib/validation";
import { checkCredentials } from "@/data/content";

const ok = { name: "A", email: "a@b.com", phone: "", type: "General Enquiry", subject: "Hi", message: "Hello there team" };

describe("enquiry validation", () => {
  it("accepts a complete enquiry", () => expect(validateEnquiry(ok)).toEqual({}));
  it("rejects bad email", () => expect(validateEnquiry({ ...ok, email: "nope" }).email).toBeTruthy());
  it("requires name", () => expect(validateEnquiry({ ...ok, name: " " }).name).toBeTruthy());
});

describe("demo admin login", () => {
  it("accepts the demo credentials", () => expect(checkCredentials("admin@askahealthcare.demo", "AskaAdmin@2026")).toBe(true));
  it("rejects wrong password", () => expect(checkCredentials("admin@askahealthcare.demo", "wrong")).toBe(false));
});
