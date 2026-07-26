export const guests = [
  // `plural: true` when the invite addresses more than one guest (couple/family) —
  // controls verb/pronoun agreement in the invite text ("celebrarem"/"vocês" vs "celebrar"/"você").
  { slug: "sandro-e-carina", displayName: "Sandro & Carina", plural: true },
  { slug: "nelson-e-indira", displayName: "Nelson & Indira", plural: true },
  { slug: "emanuel-silva", displayName: "Emanuel Silva", plural: false },
  // TODO: add all guests here
] as const;
