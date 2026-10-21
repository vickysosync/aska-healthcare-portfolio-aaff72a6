import { useStored } from "@/lib/store";

const u = (id: string, w = 1000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export interface Service { id: string; title: string; category: string; description: string; details: string; image: string; visible: boolean }
export interface Product { id: string; name: string; category: string; description: string; image: string; status: string; availability: string; visible: boolean }
export interface Activity { id: string; title: string; description: string; image: string; visible: boolean }
export interface GalleryItem { id: string; image: string; caption: string; visible: boolean }
export interface TeamMember { id: string; name: string; role: string; image: string; visible: boolean }
export interface ValueItem { id: string; title: string; description: string }
export interface Step { id: string; title: string; description: string }
export interface About { heading: string; intro: string; focus: string; commitment: string; mission: string; vision: string }
export interface Contact { companyName: string; phone: string; email: string; address: string }
export type SectionKey = "about" | "services" | "products" | "hospital" | "why" | "approach" | "gallery" | "contact";
export interface Site { tagline: string; heroLabel: string; heroHeading: string; heroText: string; ctaPrimary: string; ctaSecondary: string; footerCredit: string; sections: Record<SectionKey, boolean> }
export interface Enquiry { id: string; name: string; email: string; phone: string; type: string; subject: string; message: string; status: "New" | "In Progress" | "Resolved"; createdAt: string }

export const ENQUIRY_TYPES = ["General Enquiry", "Pharmaceutical Products", "Healthcare Services", "Hospital-Related Activities", "Business Collaboration", "Other"];
export const PRODUCT_CATEGORIES = ["General Healthcare Products", "Pharmaceutical Formulations", "Medical Consumables", "Healthcare Essentials", "Hospital Supplies"];
export const SECTION_LABELS: Record<SectionKey, string> = { about: "About Us", services: "Healthcare Services", products: "Pharmaceutical Products", hospital: "Hospital Activities", why: "Why Choose Us", approach: "Our Approach", gallery: "Gallery", contact: "Contact" };

export const DEMO_ADMIN = { email: "admin@askahealthcare.demo", password: "AskaAdmin@2026" };
export function checkCredentials(email: string, password: string) {
  return email.trim().toLowerCase() === DEMO_ADMIN.email && password === DEMO_ADMIN.password;
}

export const initialContact: Contact = {
  companyName: "ASKA HEALTHCARE PRIVATE LIMITED",
  phone: "+91 3246541665",
  email: "aska1039@gmail.com",
  address: "Flat No. B-205, Noor-e-Jahan II CHS Ltd, 927 Pipe Road, Kurla, Mumbai, Maharashtra, India – 400070.",
};

export const initialSite: Site = {
  tagline: "Healthcare · Pharmaceuticals · Hospital Activities",
  heroLabel: "Your partner in healthcare",
  heroHeading: "Advancing Healthcare. Supporting Better Lives.",
  heroText: "ASKA Healthcare Private Limited is focused on human healthcare activities, pharmaceutical products, and hospital-related services, with a commitment to professionalism, quality, and responsible healthcare solutions.",
  ctaPrimary: "Explore Our Services",
  ctaSecondary: "Contact Our Team",
  footerCredit: "Designed and development by SOSynch Ai Tech",
  sections: { about: true, services: true, products: true, hospital: true, why: true, approach: true, gallery: true, contact: true },
};

export const initialAbout: About = {
  heading: "Healthcare with Purpose. Service with Responsibility.",
  intro: "ASKA Healthcare Private Limited is a Mumbai-based company working across human healthcare activities, pharmaceutical products, and hospital-related activities. We aim to bring a professional, organised, and dependable approach to every healthcare requirement we engage with.",
  focus: "Our focus spans healthcare support initiatives, a portfolio of pharmaceutical and healthcare-related products, and activities that support hospitals and healthcare institutions — always with the patient's wellbeing at the centre.",
  commitment: "We believe in responsible and ethical business practices, transparent communication, and long-term relationships built on trust.",
  mission: "To support healthcare needs through responsible healthcare activities, pharmaceutical product initiatives, and professional service.",
  vision: "To contribute to a more accessible, reliable, and quality-focused healthcare ecosystem.",
};

export const initialTeam: TeamMember[] = [
  { id: "team-1", name: "Aaliya Shakir Ali Khan", role: "Director", image: "", visible: true },
  { id: "team-2", name: "Aasiya Shakir Ali Khan", role: "Director", image: "", visible: true },
];

export const initialServices: Service[] = [
  { id: "svc-1", title: "Human Healthcare Activities", category: "Healthcare", description: "Healthcare-related support and service initiatives delivered with a responsible, professional approach.", details: "This area covers healthcare-related support initiatives. Specific programmes are discussed on enquiry and depend on the requirement and applicable regulations.", image: u("1576091160399-112ba8d25d1d"), visible: true },
  { id: "svc-2", title: "Pharmaceutical Products", category: "Pharmaceuticals", description: "A portfolio presentation of pharmaceutical and healthcare-related products, organised by category.", details: "Our portfolio is organised into clear categories so enquiries can be routed quickly. Entries shown on this website are illustrative and are verified on enquiry.", image: u("1587854692152-cbe660dbde88"), visible: true },
  { id: "svc-3", title: "Hospital-Related Activities", category: "Hospital", description: "Business activities that support hospitals and healthcare institutions across operational needs.", details: "We engage in activities that support healthcare institutions. ASKA Healthcare does not claim to own or operate a hospital.", image: u("1519494026892-80bbd2d6fd0d"), visible: true },
  { id: "svc-4", title: "Healthcare Product Distribution", category: "Distribution", description: "Illustrative overview of healthcare product supply and distribution activities.", details: "This is an illustrative description of supply and distribution activities. It does not imply any existing distribution agreement.", image: u("1584362917165-526a968579e8"), visible: true },
  { id: "svc-5", title: "Medical & Healthcare Supplies", category: "Supplies", description: "A sample catalogue of general healthcare supplies and essentials.", details: "General healthcare supplies are presented as a sample catalogue without efficacy claims. Availability is confirmed on enquiry.", image: u("1583912267550-d974311a9a6e"), visible: true },
  { id: "svc-6", title: "Healthcare Collaboration", category: "Collaboration", description: "Open to institutional, professional, and business enquiries for potential collaboration.", details: "We welcome enquiries from institutions and professionals exploring collaboration. No existing partnerships are implied.", image: u("1532938911079-1b06ac7ceec7"), visible: true },
];

export const initialProducts: Product[] = [
  { id: "prd-1", name: "Daily Care Wellness Kit", category: "General Healthcare Products", description: "Sample portfolio item representing a general healthcare kit.", image: u("1585435557343-3b092031a831", 700), status: "Illustrative Demo Product", availability: "On Enquiry", visible: true },
  { id: "prd-2", name: "Formulation Series A", category: "Pharmaceutical Formulations", description: "Placeholder entry for a pharmaceutical formulation category. No composition or usage information is provided.", image: u("1584308666744-24d5c474f2ae", 700), status: "Illustrative Demo Product", availability: "On Enquiry", visible: true },
  { id: "prd-3", name: "Formulation Series B", category: "Pharmaceutical Formulations", description: "Placeholder entry for a pharmaceutical formulation category. Details to be verified.", image: u("1471864190281-a93a3070b6de", 700), status: "Sample Portfolio Item", availability: "To Be Confirmed", visible: true },
  { id: "prd-4", name: "Sterile Disposable Syringes", category: "Medical Consumables", description: "Representative consumable item shown for portfolio illustration.", image: u("1603398938378-e54eab446dde", 700), status: "Sample Portfolio Item", availability: "On Enquiry", visible: true },
  { id: "prd-5", name: "Protective Face Masks", category: "Medical Consumables", description: "Representative protective consumable shown for portfolio illustration.", image: u("1607619056574-7b8d3ee536b2", 700), status: "Illustrative Demo Product", availability: "On Enquiry", visible: true },
  { id: "prd-6", name: "Clinical Stethoscope", category: "Healthcare Essentials", description: "Representative healthcare essential shown for portfolio illustration.", image: u("1550831107-1553da8c8464", 700), status: "Sample Portfolio Item", availability: "To Be Confirmed", visible: true },
  { id: "prd-7", name: "Pharmacy Essentials Range", category: "Healthcare Essentials", description: "Illustrative range of everyday healthcare essentials.", image: u("1628771065518-0d82f1938462", 700), status: "Illustrative Demo Product", availability: "On Enquiry", visible: true },
  { id: "prd-8", name: "Ward Care Supplies", category: "Hospital Supplies", description: "Illustrative set of ward and patient-room supplies.", image: u("1516549655169-df83a0774514", 700), status: "Sample Portfolio Item", availability: "On Enquiry", visible: true },
];

export const initialActivities: Activity[] = [
  { id: "act-1", title: "Hospital Support Activities", description: "Supporting the everyday operational needs of healthcare institutions.", image: u("1538108149393-fbbd81895907"), visible: true },
  { id: "act-2", title: "Healthcare Service Coordination", description: "Helping coordinate healthcare-related requirements between stakeholders.", image: u("1579684385127-1ef15d508118"), visible: true },
  { id: "act-3", title: "Medical Supplies & Essentials", description: "Sourcing conversations around general medical supplies and essentials.", image: u("1631549916768-4119b2e5f926"), visible: true },
  { id: "act-4", title: "Healthcare Operations Support", description: "Process-oriented support for healthcare operations.", image: u("1504813184591-01572f98c85f"), visible: true },
  { id: "act-5", title: "Institutional Healthcare Enquiries", description: "A dedicated channel for institutions to discuss their requirements.", image: u("1581594693702-fbdc51b2763b"), visible: true },
];

export const initialGallery: GalleryItem[] = [
  { id: "gal-1", image: u("1612349317150-e413f6a5b16d", 900), caption: "Healthcare professional in a clinical setting", visible: true },
  { id: "gal-2", image: u("1551076805-e1869033e561", 900), caption: "Teamwork in a modern hospital environment", visible: true },
  { id: "gal-3", image: u("1576765608535-5f04d1e3f289", 900), caption: "Laboratory research setting", visible: true },
  { id: "gal-4", image: u("1631815589968-fdb09a223b1e", 900), caption: "Pharmaceutical packaging", visible: true },
  { id: "gal-5", image: u("1588776814546-1ffcf47267a5", 900), caption: "Medical consultation environment", visible: true },
  { id: "gal-6", image: u("1582719471384-894fbb16e074", 900), caption: "Precision work in a laboratory", visible: true },
  { id: "gal-7", image: u("1530497610245-94d3c16cda28", 900), caption: "Healthcare supplies", visible: true },
  { id: "gal-8", image: u("1579154204601-01588f351e67", 900), caption: "Sample analysis in progress", visible: true },
];

export const initialValues: ValueItem[] = [
  { id: "val-1", title: "Responsible Healthcare Focus", description: "Every decision is guided by care for patients and communities." },
  { id: "val-2", title: "Professional Approach", description: "Structured, courteous, and accountable in every engagement." },
  { id: "val-3", title: "Quality-Conscious Practices", description: "We aim for consistency and care in what we offer." },
  { id: "val-4", title: "Transparent Communication", description: "Clear information, honest timelines, no overstatement." },
  { id: "val-5", title: "Healthcare-Centered Solutions", description: "Options shaped around the actual healthcare need." },
  { id: "val-6", title: "Long-Term Collaboration", description: "Relationships built to last, not single transactions." },
];

export const initialSteps: Step[] = [
  { id: "stp-1", title: "Understand the Requirement", description: "We listen carefully to what you need and why." },
  { id: "stp-2", title: "Identify the Healthcare Category", description: "We map the requirement to the relevant area." },
  { id: "stp-3", title: "Discuss Suitable Options", description: "We walk through possible options transparently." },
  { id: "stp-4", title: "Coordinate the Next Steps", description: "We agree on a clear plan and responsibilities." },
  { id: "stp-5", title: "Follow Up on the Enquiry", description: "We stay in touch until the enquiry is closed." },
];

export const initialEnquiries: Enquiry[] = [];

export const useContact = () => useStored("contact", initialContact);
export const useSite = () => useStored("site", initialSite);
export const useAbout = () => useStored("about", initialAbout);
export const useTeam = () => useStored("team", initialTeam);
export const useServices = () => useStored("services", initialServices);
export const useProducts = () => useStored("products", initialProducts);
export const useActivities = () => useStored("activities", initialActivities);
export const useGallery = () => useStored("gallery", initialGallery);
export const useValues = () => useStored("values", initialValues);
export const useSteps = () => useStored("steps", initialSteps);
export const useEnquiries = () => useStored("enquiries", initialEnquiries);
export const useSession = () => useStored<{ email: string } | null>("session", null);
