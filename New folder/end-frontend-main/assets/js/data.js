// Данные магазина: книги, категории, статьи
const CATS = ['Роман', 'Классика', 'Драма', 'Поэзия', 'Приключения', "Детские книги", "Искусство и фото"];
const U = 'https://images.unsplash.com/photo-';

const INITIAL_BOOKS = [
  ['Преступление и наказание', 'Ф. Достоевский', '1543002588-bfa74002ed7e', 12.99, 18.99, 'Роман'],
  ['Война и мир', 'Л. Толстой', '1541963463532-d68292c34b19', 15.99, 19.99, 'Роман'],
  ['Вишнёвый сад', 'А. Чехов', '1495446815901-a7297e633e8d', 8.99, 14.99, 'Драма'],
  ['Мастер и Маргарита', 'М. Булгаков', '1476275466078-4007374efbbe', 14.49, 18.99, 'Роман'],
  ['Евгений Онегин', 'А. Пушкин', '1524995997946-a1c2e315a42f', 9.99, 13.99, 'Поэзия'],
  ['Мёртвые души', 'Н. Гоголь', '1512820790803-83ca734da794', 11.99, 14.99, 'Классика'],
  ['Отцы и дети', 'И. Тургенев', '1497633762265-9d179a990aa6', 10.49, 13.99, 'Роман'],
  ['Доктор Живаго', 'Б. Пастернак', '1550399105-c4db5fb85c18', 10.99, 16.99, 'Роман'],
  ['Приключения Тома Сойера', 'М. Твен', '1532012197267-da84d127e765', 13.99, 17.99, 'Приключения'],
  ['Гордость и предубеждение', 'Дж. Остин', '1544716278-ca5e3f4abd8c', 11.49, 14.99, 'Роман'],
  ['Старик и море', 'Э. Хемингуэй', '1553729459-afe8f2e2ed65', 9.99, 12.99, 'Классика'],
  ['Анна Каренина', 'Л. Толстой', '1589998059171-988d887df646', 9.99, 24.99, 'Роман']
].map((b, i) => ({
  id: i + 1, name: b[0], author: b[1], img: U + b[2], price: b[3], old: b[4], cat: b[5],
  rating: 4 + (i % 2), reviews: 24 + i * 13,
  desc: `«${b[0]}» — книга автора ${b[1]} в категории «${b[5]}». Твёрдая обложка, качественная печать, аккуратная упаковка.`
}));

// Дополнительные книги из официального шаблона Pustok для новых секций
const EXTRA_BOOKS = [
  // Best Sellers (John Parker)
  { id: 13, name: 'Do You Really Need It? This Will Help You', author: 'Rpple', img: 'assets/image/products/product-6.jpg', price: 51.20, old: 64.00, cat: 'Бестселлеры', rating: 5, reviews: 42, desc: 'Популярный бестселлер от Джона Паркера.' },
  { id: 14, name: 'Do You Really Need It? This Will Help You', author: 'Wpple', img: 'assets/image/products/product-2.jpg', price: 51.20, old: 64.00, cat: 'Бестселлеры', rating: 4, reviews: 38, desc: 'Эффективные советы и методики от ведущих авторов.' },
  { id: 15, name: 'Here Is Quick Cure BOOK This Will Help', author: 'Epple', img: 'assets/image/products/product-1.jpg', price: 51.20, old: 64.00, cat: 'Бестселлеры', rating: 5, reviews: 55, desc: 'Быстрое решение и практическое руководство.' },
  { id: 16, name: 'Very Simple Things You Can Save BOOK', author: 'Ypple', img: 'assets/image/products/product-3.jpg', price: 51.20, old: 64.00, cat: 'Бестселлеры', rating: 4, reviews: 29, desc: 'Простые вещи, меняющие привычный подход.' },
  { id: 17, name: 'What You Can Learn From Bill Gates', author: 'Mople', img: 'assets/image/products/product-5.jpg', price: 51.20, old: 64.00, cat: 'Бестселлеры', rating: 5, reviews: 63, desc: 'Уроки лидерства и мышления Билла Гейтса.' },
  { id: 18, name: '3 Ways Create Better BOOK With Help', author: 'Cpple', img: 'assets/image/products/product-4.jpg', price: 51.20, old: 64.00, cat: 'Бестселлеры', rating: 4, reviews: 19, desc: 'Три ключевых правила создания качественных проектов.' },
  { id: 19, name: 'Turn Your BOOK Into High Machine', author: 'Tpple', img: 'assets/image/products/product-8.jpg', price: 51.20, old: 64.00, cat: 'Бестселлеры', rating: 5, reviews: 34, desc: 'Как повысить продуктивность и достичь максимума.' },
  { id: 20, name: 'Revolutionize Your BOOK With These Easy', author: 'Mpple', img: 'assets/image/products/product-13.jpg', price: 51.20, old: 64.00, cat: 'Бестселлеры', rating: 4, reviews: 47, desc: 'Инновационные идеи и свежий взгляд.' },

  // Children's Books
  { id: 21, name: 'Revolutionize Your BOOK With', author: 'Rpple', img: 'assets/image/products/product-2.jpg', price: 51.20, old: 64.00, cat: 'Детские книги', rating: 5, reviews: 52, desc: 'Увлекательная и красочная книга для детей и подростков.' },
  { id: 22, name: 'BOOK: Do You Really Need It? This', author: 'Epple', img: 'assets/image/products/product-4.jpg', price: 51.20, old: 64.00, cat: 'Детские книги', rating: 4, reviews: 31, desc: 'Интересные развивающие истории с иллюстрациями.' },
  { id: 23, name: 'What You Can Learn From Bill Gates', author: 'Ypple', img: 'assets/image/products/product-5.jpg', price: 51.20, old: 64.00, cat: 'Детские книги', rating: 5, reviews: 44, desc: 'Вдохновляющие биографии для юных читателей.' },
  { id: 24, name: 'Turn Your BOOK Into High Machine', author: 'Dpple', img: 'assets/image/products/product-1.jpg', price: 51.20, old: 64.00, cat: 'Детские книги', rating: 4, reviews: 26, desc: 'Детская научно-популярная литература.' },
  { id: 25, name: 'Here Is A Quick Cure For Book', author: 'Ppple', img: 'assets/image/products/product-7.jpg', price: 51.20, old: 64.00, cat: 'Детские книги', rating: 5, reviews: 39, desc: 'Книга с весёлыми заданиями и яркими картинками.' },
  { id: 26, name: '3 Ways Create Better BOOK With', author: 'Wpple', img: 'assets/image/products/product-6.jpg', price: 51.20, old: 64.00, cat: 'Детские книги', rating: 4, reviews: 18, desc: 'Сказки и рассказы, развивающие творческое мышление.' },

  // Arts & Photography
  { id: 27, name: 'Create Better BOOK With The Help Of Your', author: 'Wpple', img: 'assets/image/products/product-4.jpg', price: 51.20, old: 64.00, cat: 'Искусство и фото', rating: 5, reviews: 48, desc: 'Альбом с шедеврами современного визуального искусства.' },
  { id: 28, name: 'What You Can Learn From Bill Gates', author: 'Epple', img: 'assets/image/products/product-5.jpg', price: 51.20, old: 64.00, cat: 'Искусство и фото', rating: 4, reviews: 35, desc: 'Фотографии и эссе о великих мыслителях эпохи.' },
  { id: 29, name: 'A Half Very Simple Things You To Save', author: 'Hpple', img: 'assets/image/products/product-6.jpg', price: 51.20, old: 64.00, cat: 'Искусство и фото', rating: 5, reviews: 62, desc: 'Искусство минимализма и композиции в фотографии.' },
  { id: 30, name: 'Here Is A Quick Cure For Book', author: 'Bpple', img: 'assets/image/products/product-8.jpg', price: 51.20, old: 64.00, cat: 'Искусство и фото', rating: 4, reviews: 27, desc: 'Учебник по экспозиции, цвету и ретуши.' },
  { id: 31, name: 'Do You Really Need It? This Will Help You', author: 'Zpple', img: 'assets/image/products/product-3.jpg', price: 51.20, old: 64.00, cat: 'Искусство и фото', rating: 5, reviews: 59, desc: 'Коллекционное издание с премиальной печатью.' }
];

const BOOKS = [...INITIAL_BOOKS, ...EXTRA_BOOKS];

// Статьи блога из шаблона Pustok
const POSTS = [
  {
    img: 'assets/image/others/blog-grid-1.jpg',
    day: '13',
    month: 'AUG',
    author: 'Hastech',
    title: 'How to Water and Care for Mounted',
    desc: 'Virtual reality and 3-D technology are already well-established in the entertainment and design industries...'
  },
  {
    img: 'assets/image/others/blog-grid-2.jpg',
    day: '19',
    month: 'JAN',
    author: 'Hastech',
    title: 'Why You Never See BLOG TITLE That',
    desc: 'Virtual reality and 3-D technology are already well-established in the entertainment and publishing worlds...'
  },
  {
    img: 'assets/image/others/blog-grid-3.jpg',
    day: '31',
    month: 'AUG',
    author: 'Hastech',
    title: 'What Everyone Must Know About Books',
    desc: 'Explore the fascinating evolution of modern reading and typography trends in today’s digital era...'
  }
];

// Бренды
const BRANDS = [
  'assets/image/others/brand-1.jpg',
  'assets/image/others/brand-2.jpg',
  'assets/image/others/brand-3.jpg',
  'assets/image/others/brand-4.jpg',
  'assets/image/others/brand-5.jpg',
  'assets/image/others/brand-6.jpg'
];
