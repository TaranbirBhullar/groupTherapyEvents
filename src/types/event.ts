export type EventStatus = 'upcoming' | 'past' | 'cancelled';

export interface Event {
  id: string;
  slug: string;
  title: string;
  datetime: string;
  timezone: string;
  location: string;
  lineup: string[];
  description: string;
  partifulUrl: string;
  image: string;
  status: EventStatus;
}
