import { Category } from './model';
import { NotFoundError, ConflictError } from '../../errors';

export class CategoryService {
  async findAll() {
    return Category.query().where('is_active', true).orderBy('name');
  }

  async findById(id: number) {
    const category = await Category.query().findById(id);
    if (!category) throw new NotFoundError('Category not found');
    return category;
  }

  async create(data: { name: string; slug: string }) {
    const existing = await Category.query().findOne({ slug: data.slug });
    if (existing) throw new ConflictError('Category slug already in use');
    return Category.query().insert({ ...data, is_active: true });
  }
}
