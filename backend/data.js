import bcrypt from 'bcryptjs';

const data = {
    products: [
        {   
            name: 'Slim Shirt',
            slug: 'nike-slim-shirt',
            category: 'Shirts',
            image:'/images/d1.jpg',
            price: 60,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            countInStock: 6,
            description: 'high quality slim shirt',
        },
        {
            name: 'Fit Shirt',
            slug: 'adidas-fit-shirt',
            category: 'Shirts',
            image:'/images/d1.jpg',
            price: 55,
            brand: 'Adidas',
            rating: 4.7,
            numReviews: 11,
            countInStock: 7,
            description: 'high quality fit shirt'
        },
        {
            name: 'Fit Pants',
            slug: 'nike-fit-pants',
            category: 'Pants',
            image:'/images/d1.jpg',
            price: 45,
            brand: 'Nike',
            rating: 0,
            numReviews: 0,
            countInStock: 5,
            description: 'high quality fit pants',
        },
        {
            name: 'Best Pants',
            slug: 'nike-best-pants',
            category: 'Pants',
            image:'/images/d1.jpg',
            price: 70,
            brand: 'Nike',
            rating: 4.8,
            numReviews: 8,
            countInStock: 50,
            description: 'high quality best pants',
        },
    ],
    users: [
        {
            name: 'Ewelina',
            email: 'admin@example.com',
            password: bcrypt.hashSync('12345678'),
            isAdmin: true,
        },
        {
            name: 'Karol',
            email: 'user@example.com',
            password: bcrypt.hashSync('12345678'),
            isAdmin: false,
        }
    ]
}
export default data;