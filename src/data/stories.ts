// JSON-simulation story data. Stories originate from scene objects and surface
// in the content panel during the guided tour (BRAIN.md → "Storytelling System").

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  /** Scene object this story is anchored to. */
  anchor: string;
}

export const STORIES: Story[] = [
  { id: 'origin', title: 'The Origin', excerpt: 'How a single material became a collection.', anchor: 'ReceptionDesk' },
  { id: 'craft', title: 'Craft & Light', excerpt: 'Form shaped around the way light moves through a room.', anchor: 'DisplayStand_A' },
  { id: 'future', title: 'A Quiet Future', excerpt: 'Designing calm objects for considered spaces.', anchor: 'FeatureCorner' },
];
