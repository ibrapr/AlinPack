import type { Service } from './types';
import servicesJson from './content/services.json';

export const services: Service[] = servicesJson as Service[];
