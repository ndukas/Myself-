import { ClientsSection, Stat, Testimonial } from "@/components/ui/testimonial-card";
import { useNavigate } from "react-router-dom";

// Define the data for the section
const statsData: Stat[] = [
  { value: "25+", label: "Happy clients" },
  { value: "$150k", label: "revenue added" },
  { value: "4.8", label: "Average Rating" },
];

const testimonialsData: Testimonial[] = [
  {
    name: "Daniel Bittner",
    title: "Education",
    quote: "Collaborating with Samuel on this project was seamless. The vision was clearly understood, and the designs genuinely reflect my brand identity.",
    avatarSrc: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/client-1.webp",
    rating: 5.0,
  },
  {
    name: "Mark Williams",
    title: "Technology",
    quote: "Working with this process was effortless. I absolutely recommend him to anyone looking for a talented and reliable web developer.",
    avatarSrc: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/client-2.webp",
    rating: 4.7,
  },
  {
    name: "Sarah S. Clair",
    title: "Creative Director",
    quote: "He completely transformed our website. It’s faster, cleaner, and converting better than ever. Highly recommend.",
    avatarSrc: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/client-3.webp",
    rating: 4.9,
  },
  {
    name: "Roman Kašák",
    title: "Mobile App",
    quote: "He built our mobile app exactly how we envisioned it, even better. Communication was excellent throughout the entire project, and deadlines were always met. We’re already planning phase two with him.",
    avatarSrc: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/client-4.webp",
    rating: 5.0,
  },
  {
    name: "P & J Macháč",
    title: "Real Estate Developers",
    quote: "We’re so happy with the website he created for us. There were a couple of small tweaks along the way, but he handled them quickly and professionally.",
    avatarSrc: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/client-5.webp",
    rating: 4.5,
  },
];

// The demo component that renders the entire section
export default function ClientsSectionDemo() {
  const navigate = useNavigate();

  return (
    <ClientsSection
      tagLabel="Happy Clients"
      title="Results That Speak"
      description="Helping businesses grow with purpose and confidence."
      stats={statsData}
      testimonials={testimonialsData}
      primaryActionLabel="Contact Now"
      onPrimaryAction={() => navigate("/contact")}
    />
  );
}
