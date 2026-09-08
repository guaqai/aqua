import React from 'react';
import Hero from '@/components/Hero';
import DeliveryZonesBanner from '@/components/DeliveryZonesBanner';
import ProductCatalog from '@/components/ProductCatalog';
import TourBookingSection from '@/components/TourBookingSection';
import AboutSection from '@/components/AboutSection';
import B2BEnquirySection from '@/components/B2BEnquirySection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <DeliveryZonesBanner />
      <ProductCatalog />
      <TourBookingSection />
      <AboutSection />
      <B2BEnquirySection />
    </div>
  );
}
