import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { machines } from '../data/machines';
import { products } from '../data/products';
import { clients, successStories } from '../data/clients';
import { services } from '../data/services';

const repoRoot = resolve(__dirname, '..');
mkdirSync(resolve(repoRoot, 'data/content'), { recursive: true });

function write(name: string, value: unknown) {
  writeFileSync(resolve(repoRoot, 'data/content', name), JSON.stringify(value, null, 2) + '\n');
}

write('machines.json', machines);
write('products.json', products);
write('clients.json', clients);
write('success-stories.json', successStories);
write('services.json', services);

// eslint-disable-next-line no-console
console.log('Wrote data/content/*.json');
