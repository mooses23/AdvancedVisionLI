const doctors = {
  stein: {
    name: "Dr. Marcie Evans Stein",
    credentials: "OD, FABM, OVDRA",
    specialty: "Vision Therapy & Developmental Optometry",
    photo: "dr-stein.jpg",
    profile: "dr-marcie-stein",
  },
  moller: {
    name: "Dr. Esther Moller",
    credentials: "OD, FAAO",
    specialty: "Low Vision Rehabilitation",
    photo: "dr-moller.jpg",
    profile: "dr-esther-moller",
  },
};

export type DoctorKey = keyof typeof doctors;

export function doctorPhotoUrl(siteUrl: string, key: DoctorKey): string {
  return `${siteUrl}/images/${doctors[key].photo}`;
}

export function doctorPortrait(siteUrl: string, key: DoctorKey, hero = false): string {
  return `<img class="${hero ? "doctor-profile-portrait" : "doctor-card-portrait"}" src="${doctorPhotoUrl(siteUrl, key)}" alt="${doctors[key].name}" width="240" height="240" ${hero ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" />`;
}

export function relatedDoctors(siteUrl: string, canonical: string): string {
  const slug = new URL(canonical).pathname.replace(/^\/|\/$/g, "");
  if (slug === "dr-marcie-stein" || slug === "dr-esther-moller") return "";
  const keys: DoctorKey[] = slug.startsWith("low-vision")
    ? ["moller"]
    : ["contact", "faq"].includes(slug) ? ["stein", "moller"] : ["stein"];
  return `<section class="seo-doctors" aria-labelledby="seo-doctors-title">
    <h2 id="seo-doctors-title">Meet ${keys.length === 1 ? "Your Specialist" : "Our Doctors"}</h2>
    <div class="doctor-card-grid">${keys.map(key => {
      const doctor = doctors[key];
      return `<article class="doctor-photo-card">
        ${doctorPortrait(siteUrl, key)}
        <div><h3>${doctor.name}</h3><p>${doctor.credentials}</p><p>${doctor.specialty}</p>
        <a href="${siteUrl}/${doctor.profile}/">View ${key === "stein" ? "Dr. Stein’s" : "Dr. Moller’s"} profile</a></div>
      </article>`;
    }).join("")}</div>
  </section>`;
}
