export default function DeviceMockup({ src, alt = 'Book preview' }: { src: string; alt?: string }) {
  return (
    <div className="device-mockup" data-aos="fade-left">
      <div className="device-notch" aria-hidden="true" />
      <img src={src} alt={alt} loading="lazy" width="520" height="760" className="device-screen" />
    </div>
  );
}
