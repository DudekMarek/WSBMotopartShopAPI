import { ModelStatic, Model } from 'sequelize';
import { RelationNotFoundError, EntityNotFoundError } from '../helpers/validation';

// checks if the entity exists in the database - use it to check relations
export async function ensureExists(model: ModelStatic<Model>, id: number) {
  const record = await model.findByPk(id);
  if (!record) {
    throw new RelationNotFoundError(model.name);
  }
}

export async function getEntityById(model: ModelStatic<Model>, id: number) {
    const entity = await model.findByPk(id);
    if (!entity) {
      throw new EntityNotFoundError(model.name);
    }
    return entity;
  }