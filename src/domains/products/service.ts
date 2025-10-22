import { Product } from './model';
import { NotFoundError } from '../../errors';

export class ProductService {
  async create(data: { name: string; description?: string; price: number; stock: number }) {
    const product = await Product.query().insert(data);
    return product;
  }

  async findById(id: number) {
    const product = await Product.query().findById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  async findAll() {
    const products = await Product.query();
    return products;
  }

  async update(id: number, data: Partial<{ name: string; description?: string; price: number; stock: number }>) {
    const product = await Product.query().findById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const updatedProduct = await Product.query().patchAndFetchById(id, data);
    return updatedProduct;
  }

  async delete(id: number) {
    const product = await Product.query().findById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    await Product.query().deleteById(id);
  }
}
