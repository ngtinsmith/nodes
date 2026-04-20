import { v4 as uuidv4 } from 'uuid';

export const mapUuid = <T>(p: T) => ({ ...p, id: uuidv4() });
