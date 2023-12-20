import { StaticImageData } from "next/image";

import ansh from "../../public/ansh.jpg";
import mike from "../../public/mike.jpg";

export const studentAthletes = new Map<
  string,
  {
    name: string;
    year: number;
    image: StaticImageData;
    resume: string[];
    slug: string;
  }
>();

studentAthletes.set("anshuman-parulekar", {
  name: "Anshuman Parulekar",
  year: 2024,
  image: ansh,
  resume: [
    "Current Co-Owner and CEO of Wayland Student Athlete",
    "High School Senior ('24)",
    "Enrolled in all Advanced Placement / Honors classes",
    "High Honor roll student (all four years)",
    "National Mandarin Honor Society member",
    "Varsity Basketball Captain",
    "Varsity Track Athlete",
    "Volunteer at Next Pitch Baseball facility",
    "Lifeguard at Sandy Island Family Camp (Certified professional rescuer in CPR)",
    "Worked at Nashawtuc Country Club on grounds-crew (experienced landscaper)",
    "FBLA Wayland Club President",
    "WHS T-Tones Director",
  ],
  slug: "anshuman-parulekar",
});
studentAthletes.set("michael-lavelle", {
  name: "Michael Lavelle",
  year: 2024,
  image: mike,
  resume: [
    "Current Co-Owner and CEO of Wayland Student Athlete",
    "High School Senior (24')",
    "Enrolled in all Advanced Placement / Honors classes",
    "High Honor roll student (all four years)",
    "National Mandarin Honor Society member",
    "Varsity Basketball Captain",
    "Varsity Track Athlete",
    "Volunteer at Next Pitch Baseball facility",
    "Lifeguard at Sandy Island Family Camp (Certified professional rescuer in CPR)",
    "Worked at Nashawtuc Country Club on grounds-crew (experienced landscaper)",
    "FBLA Wayland Club President",
    "WHS T-Tones Director",
  ],
  slug: "michael-lavelle",
});
studentAthletes.set("anshuman-parulekar-2", {
  name: "Anshuman Parulekar",
  year: 2025,
  image: ansh,
  resume: [
    "Current Co-Owner and CEO of Wayland Student Athlete",
    "High School Senior ('24)",
    "Enrolled in all Advanced Placement / Honors classes",
    "High Honor roll student (all four years)",
    "National Mandarin Honor Society member",
    "Varsity Basketball Captain",
    "Varsity Track Athlete",
    "Volunteer at Next Pitch Baseball facility",
    "Lifeguard at Sandy Island Family Camp (Certified professional rescuer in CPR)",
    "Worked at Nashawtuc Country Club on grounds-crew (experienced landscaper)",
    "FBLA Wayland Club President",
    "WHS T-Tones Director",
  ],
  slug: "anshuman-parulekar-2",
});
studentAthletes.set("michael-lavelle-2", {
  name: "Michael Lavelle",
  year: 2025,
  image: mike,
  resume: [
    "Current Co-Owner and CEO of Wayland Student Athlete",
    "High School Senior ('24)",
    "Enrolled in all Advanced Placement / Honors classes",
    "High Honor roll student (all four years)",
    "National Mandarin Honor Society member",
    "Varsity Basketball Captain",
    "Varsity Track Athlete",
    "Volunteer at Next Pitch Baseball facility",
    "Lifeguard at Sandy Island Family Camp (Certified professional rescuer in CPR)",
    "Worked at Nashawtuc Country Club on grounds-crew (experienced landscaper)",
    "FBLA Wayland Club President",
    "WHS T-Tones Director",
  ],
  slug: "michael-lavelle-2",
});
