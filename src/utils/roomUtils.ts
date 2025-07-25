/**
 * Utility functions for room management
 */

/**
 * Generates a random room ID with a specified prefix
 * @param prefix - Optional prefix for the room ID
 * @returns A random room ID string
 */
export function generateRandomRoomId(prefix = 'room'): string {
  const randomPart = Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now().toString(36);
  return `${prefix}-${randomPart}-${timestamp}`;
}

/**
 * Generates a random username for anonymous users
 * @returns A random username string
 */
export function generateRandomUsername(): string {
  const adjectives = [
    'Happy', 'Clever', 'Brave', 'Calm', 'Eager',
    'Gentle', 'Jolly', 'Kind', 'Lively', 'Polite'
  ];
  
  const animals = [
    'Dolphin', 'Eagle', 'Fox', 'Koala', 'Lion',
    'Panda', 'Tiger', 'Wolf', 'Zebra', 'Bear'
  ];
  
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  const randomNumber = Math.floor(Math.random() * 1000);
  
  return `${randomAdjective}${randomAnimal}${randomNumber}`;
}