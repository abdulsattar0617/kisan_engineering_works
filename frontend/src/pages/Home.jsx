import Hero from '../components/sections/Hero';
import StatsSection from '../components/sections/StatsSection';
import FeaturedServices from '../components/sections/FeaturedServices';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import CTASection from '../components/sections/CTASection';
import CertificationsStrip from '../components/sections/CertificationsStrip';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedServices />
      <WhyChooseUs />
      <CertificationsStrip />
      <Testimonials />
      <CTASection />
    </>
  );
}
