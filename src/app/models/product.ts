export class Product {
    id?: number;
    categoryId?: number;
    name?: String;
    desc?: String;
    src?: String;
    price?: number;
  
    constructor(product: any) {
      this.id = product.id;
      this.categoryId = product.categoryId;
      this.name = product.name;
      this.desc = product.desc;
      this.src = product.src;
      this.price = product.price;
    }
  }
  