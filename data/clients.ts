import type { Client, SuccessStory } from './types';
import clientsJson from './content/clients.json';
import successStoriesJson from './content/success-stories.json';

export const clients: Client[] = clientsJson as Client[];
export const successStories: SuccessStory[] = successStoriesJson as SuccessStory[];
