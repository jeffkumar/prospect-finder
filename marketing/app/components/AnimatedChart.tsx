export default function AnimatedChart() {
  return (
    <div className="w-full h-6 md:h-12 lg:h-16 overflow-hidden relative">
      <svg className="absolute top-0 left-0 w-[200%] h-full" viewBox="0 0 2400 200" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0,100 C300,200 900,0 1200,100 L1200,200 L0,200 Z" fill="rgba(255, 255, 255, 0.1)">
          <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0,0" to="-1200,0" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M1200,100 C1500,200 2100,0 2400,100 L2400,200 L1200,200 Z" fill="rgba(255, 255, 255, 0.1)">
          <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0,0" to="-1200,0" dur="2s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
}


