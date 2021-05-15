import { model, Schema } from 'mongoose';
import type { ModifierDocument } from '../typings/models';

const modifierSchema = new Schema<ModifierDocument>({
  name: String,
  material: String,
  description: [String],
  enabled: Boolean,
});

export default model<ModifierDocument>('Modifier', modifierSchema, 'modifiers');
