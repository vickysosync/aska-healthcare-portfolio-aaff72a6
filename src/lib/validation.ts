export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type Errors<T> = Partial<Record<keyof T, string>>;

export function isEmail(v: string) {
  return EMAIL_RE.test(v.trim());
}

export interface EnquiryInput {
  name: string;
  email: string;
  phone: string;
  type: string;
  subject: string;
  message: string;
}

export function validateEnquiry(v: EnquiryInput): Errors<EnquiryInput> {
  const e: Errors<EnquiryInput> = {};
  if (!v.name.trim()) e.name = "Please enter your full name.";
  else if (v.name.length > 100) e.name = "Name must be under 100 characters.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!isEmail(v.email)) e.email = "Please enter a valid email address.";
  if (v.phone && !/^[+\d][\d\s-]{6,19}$/.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (!v.type) e.type = "Please choose an enquiry type.";
  if (!v.subject.trim()) e.subject = "Please add a subject.";
  else if (v.subject.length > 150) e.subject = "Subject must be under 150 characters.";
  if (!v.message.trim()) e.message = "Please write your message.";
  else if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  else if (v.message.length > 2000) e.message = "Message must be under 2000 characters.";
  return e;
}
