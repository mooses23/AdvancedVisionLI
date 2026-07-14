/** Reusable organic blob shapes used as decorative backgrounds */

export function BlobTeal({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M420,300Q390,350,350,390Q310,430,260,440Q210,450,160,420Q110,390,80,340Q50,290,55,240Q60,190,90,150Q120,110,165,80Q210,50,265,50Q320,50,365,85Q410,120,430,170Q450,220,420,300Z"
        fill="#7ecac3"
        fillOpacity="0.45"
      />
    </svg>
  );
}

export function BlobSand({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M410,280Q380,360,310,400Q240,440,175,410Q110,380,75,310Q40,240,65,175Q90,110,155,75Q220,40,290,50Q360,60,405,125Q450,190,410,280Z"
        fill="#d4b898"
        fillOpacity="0.50"
      />
    </svg>
  );
}

export function BlobTealSmall({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M240,170Q220,220,175,245Q130,270,90,240Q50,210,45,160Q40,110,75,75Q110,40,160,42Q210,44,240,90Q270,136,240,170Z"
        fill="#7ecac3"
        fillOpacity="0.40"
      />
    </svg>
  );
}

export function WaveDecoration({ className = '' }: { className?: string }) {
  return (
    <svg
      width="72"
      height="14"
      viewBox="0 0 72 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 7 C8 2, 16 12, 24 7 S40 2, 48 7 S64 12, 70 7"
        stroke="#5bbfb8"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
