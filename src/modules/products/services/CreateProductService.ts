import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/appError';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('A product with this name already exists.');
    }

    // Esse método somente cria o objeto, por isso é síncrono
    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
