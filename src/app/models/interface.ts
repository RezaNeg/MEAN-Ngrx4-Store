interface IUser {
        id?: number;
        admin?: boolean;
        firstname?: string;
        lastname?: string;
        displayName?: string;
        email?: string;
        password?: string;
        f_id?: string;
        f_name?: string;
        g_id?: string;
        g_name?: string;
        l_id?: string;
        l_name?: string;
        t_id?: string;
        t_name?: string;
        imageURL?: string;
        loading?: boolean;
        error?: string;
        ip?: string;
    }
    
class User implements IUser {
    constructor(
        public id?: number,
        public admin?: boolean,
        public firstname?: string,
        public lastname?: string,
        public displayName?: string,
        public email?: string,
        public password?: string,
        public f_id?: string,
        public f_name?: string,
        public g_id?: string,
        public g_name?: string,
        public l_id?: string,
        public l_name?: string,
        public t_id?: string,
        public t_name?: string,
        public imageURL?: string,
        public loading?: boolean,
        public error?: string,
        public ip?: string
        ){}
}

interface IAddress {
    id?: number;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
    phone?: string;
    user?: User;
}

class Address implements IAddress {
    constructor(
        public id?: number,
        public street?: string,
        public city?: string,
        public state?: string,
        public country?: string,
        public zip?: string,
        public phone?: string,
        public user?: User
        ){}
}

class Category {
    id?: number;
    name?: string;
    image?: string;
    
    constructor(category: any) {
        this.id = category.id;
        this.name = category.name;
        this.image = category.image;
    }
}

interface OrderLine {
    id?: number;
    product?: Product;
    quantity?: number;
    // unitPrice?: number;
    subTotal?: number;
}

class Cart {
    product: Product;
    quantity: number;
  
    constructor(product: Product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
    }
}
  
class Message {
    constructor(public type: string, public message: string, public title?: string) {
        this.type = type;
        this.message = message;
        this.title = title;
    }
}
 

interface ErrorResponse {
    status: number;
    message: string;
    data: any;
}
  
interface SuccessResponse {
    status: number;
    message: string;
    data: any;
}
  
class ContactMessage {
    constructor(public name: string, public email: string, public message: string) {
        this.name = name;
        this.email = email;
        this.message = message;
    }
}
  
class DropdownValue {  
    constructor(public value: string, public label: string) {
        this.value = value;
        this.label = label;
    }
}
  
enum ShippingStatus {
    Pending = 0,
    AwaitingShipment = 1,
    Shipped = 2,
    Completed = 4,
}
  
interface IOrder {
    id: string;
    updatedAt: string;
    createdAt: string;
    total: number;
    status?: ShippingStatus;
    items: OrderLine[];
    user?: User;
    shippingMethod?: ShippingMethod;
  }
  
class Order implements IOrder {
    id: string;
    updatedAt: string;
    createdAt: string;
    total: number;
    status?: ShippingStatus;
    items: OrderLine[];
    user?: User;
    shippingMethod?: ShippingMethod;
  
    constructor(order: IOrder) {
        this.id = order.id;
        this.updatedAt = order.updatedAt;
        this.createdAt = order.createdAt;
        this.total = order.total;
        this.status = order.status ? order.status : null;
        this.items = order.items ? order.items : [];
        this.user = order.user ? order.user : null;
        this.shippingMethod = order.shippingMethod ? order.shippingMethod : null;
    }
  
    public calculateSubTotal(): number {
        return this.items.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity);
        }, 0);
    }
}
  
class Product {
    id: number;
    category?: Category;
    category_id?: number;
    name: string;
    description: string;
    image: string;
    price: number;
  }
  
  class ShippingMethod {
    _id: string;
    name: string;
    price: Number;
    description?: string;
  }
  
export {
    Category,
    Cart,
    ContactMessage,
    Message,
    ErrorResponse,
    SuccessResponse,
    OrderLine,
    IOrder,
    Order,
    User,
    ShippingMethod,
    Product,
}
  