export const CONTACT = {
  phone: '0545547733',
  phoneIntl: '+972545547733',
  whatsappNumber: '972545547733',
  email: 'info@alinpack.com',
  addressLine1: '805 Street',
  addressLine2: 'Deir Hanna, Israel',
  mapsQuery: 'Deir Hanna, Israel',
};

export function whatsappUrl(message: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function telUrl(): string {
  return `tel:${CONTACT.phoneIntl}`;
}

export function mailUrl(): string {
  return `mailto:${CONTACT.email}`;
}

export function mapsEmbed(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapsQuery)}&output=embed`;
}

export function mapsLink(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.mapsQuery)}`;
}
