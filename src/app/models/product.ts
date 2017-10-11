export class Product {
    id?: number;
    cat_id?: number;
    name?: String;
    desc?: String;
    src?: String;
    price?: number;
  
    constructor(product: any) {
      this.id = product.id;
      this.cat_id = product.cat_id;
      this.name = product.name;
      this.desc = product.desc;
      this.src = product.src;
      this.price = product.price;
    }
  }
  