import Book from '../models/book.js';
import User from '../models/user.js';
import Genre from '../models/genre.js';

import { connectDb, disconnectDb } from './helpers.js';

// ! function to seed data starts at line 316

// users

const ADMIN_USER = {
  username: 'admin',
  password: 'Password!1',
  email: 'admin@admin.com',
  isAdmin: true
};

const NON_ADMIN_USER_ONE = {
  username: 'nonadmin1',
  password: 'Password!1',
  email: 'nonadmin1@nonadmin.com'
};

const NON_ADMIN_USER_TWO = {
  username: 'nonadmin2',
  password: 'Password!1',
  email: 'nonadmin2@nonadmin.com'
};

// seeding data

const ADVENTURE = [
  {
    title:
      'Empire of Ice and Stone: The Disastrous and Heroic Voyage of the Karluk',
    author: 'Buddy Levy',
    genre: 'Adventure',
    image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1644887746i/59808184.jpg',
    timeRead: '3 weeks',
    rating: 3,
    diaryEntry: `In the summer of 1913, the wooden-hulled brigantine Karluk departed Canada for the Arctic Ocean. At the helm was Captain Bob Bartlett, considered the world's greatest living ice navigator. The expedition's visionary leader was a flamboyant impresario named Vilhjalmur Stefansson hungry for fame.`
  }
];

const BIOGRAPHY = [
  {
    title: 'Spare: by Prince Harry, The Duke of Sussex',
    author: 'Prince Harry',
    genre: 'Biography',
    image:
      'https://m.media-amazon.com/images/I/41umz-XIQSL._SX327_BO1,204,203,200_.jpg',
    timeRead: '5 days',
    rating: 4,
    diaryEntry:
      'Prince Harry wishes to support British charities with donations from his proceeds from Spare. The Duke of Sussex has donated $1,500,000 to Sentebale, an organisation he founded with Prince Seeiso in their mothers legacies, which supports vulnerable children and young people in Lesotho and Botswana affected by HIV/AIDS. '
  }
];

const FANTASY = [
  {
    title: 'The Lord Of The Rings',
    author: 'J.J.R. Tolkien',
    genre: 'Fantasy',
    image:
      'https://upload.wikimedia.org/wikipedia/en/e/e9/First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif',
    timeRead: '2 weeks',
    rating: 4,
    diaryEntry:
      'The Lord of the Rings is an epic[1] high-fantasy novel[a] by English author and scholar J. R. R. Tolkien. Set in Middle-earth, intended to be Earth at some time in the distant past, the story began as a sequel to Tolkiens 1937 childrens book The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling books ever written, with over 150 million copies sold'
  }
];

const MYSTERY = [
  {
    title: 'The Adventures of Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    genre: 'Mystery',
    image: 'https://m.media-amazon.com/images/I/61jpNItTHnL._AC_UY218_.jpg',
    timeRead: '2 weeks',
    rating: 4,
    diaryEntry: `The Adventures of Sherlock Holmes is Arthur Conan Doyles third book in his Sherlock series. It is comprised of a collection of journal entries written by Dr. John Watson.The book describes some of Sherlock's greatest exploits. A Scandal in Bohemia, The Red Headed League, the Five Orange Pips, and the Boscombe Valley Mystery are only a few of the challenges faced in this book by the worlds most famous detective."Life is seldom about the destination, Sherlock," smiled Irene`
  }
];

const FICTION = [
  {
    title: 'Little Wing',
    author: 'Freya North',
    genre: 'Fiction',
    image: 'https://m.media-amazon.com/images/I/818MUKGSXRL._AC_UY218_.jpg',
    timeRead: '1 week',
    rating: 2,
    diaryEntry:
      'Between the sprawl of London, suburban Essex, and the wild, unpredictable Outer Hebrides, three lives collide and interweave as questions are asked and secrets surface. What happened to Florence? Why is Dougie now so reluctant to return home? How can Nell make peace with the lies shes been told?'
  }
];

const HISTORY = [
  {
    title: 'The Anglo-Saxons: A History of the Beginnings of England',
    author: 'Marc Morris',
    genre: 'History',
    image: 'https://m.media-amazon.com/images/I/910cRnpjV3L._AC_UY218_.jpg',
    timeRead: '2 months',
    rating: 5,
    diaryEntry: 'My favourite history book'
  }
];

const HORROR = [
  {
    title: 'Woman in Black',
    author: 'Susan Hill',
    genre: 'Horror',
    image:
      'https://m.media-amazon.com/images/I/61FkGjgw09L._SX324_BO1,204,203,200_.jpg',
    timeRead: '8 hours',
    rating: 4,
    diaryEntry:
      'Lorem ipsum dolor sit amet. Nam quasi molestiae ut exercitationem Quis vel dolores doloribus sit ipsam veniam et magni laborum et sint cupiditate ut nemo voluptatem. Sit itaque nobis non repudiandae minus qui animi accusamus aut autem ipsam. A illo minima sed quod voluptatum qui labore doloribus.'
  },

  {
    title: 'The Haunting of Hill House',
    author: 'Shirley Jackson',
    genre: 'Horror',
    image:
      'https://m.media-amazon.com/images/I/51r8kP1kpBL._SX324_BO1,204,203,200_.jpg',
    timeRead: '20 hours',
    rating: 4,
    diaryEntry:
      'Lorem ipsum dolor sit amet. Nam quasi molestiae ut exercitationem Quis vel dolores doloribus sit ipsam veniam et magni laborum et sint cupiditate ut nemo voluptatem. Sit itaque nobis non repudiandae minus qui animi accusamus aut autem ipsam. A illo minima sed quod voluptatum qui labore doloribus.'
  }
];

const MOTIVATIONAL = [
  {
    title: 'Motivation & Personality',
    author: 'A.H Maslow',
    genre: 'Motivational',
    image: 'https://m.media-amazon.com/images/I/51ICUS2LjdL._SY346_.jpg',
    timeRead: '',
    rating: 4,
    diaryEntry:
      'Lorem ipsum dolor sit amet. Nam quasi molestiae ut exercitationem Quis vel dolores doloribus sit ipsam veniam et magni laborum et sint cupiditate ut nemo voluptatem. Sit itaque nobis non repudiandae minus qui animi accusamus aut autem ipsam. A illo minima sed quod voluptatum qui labore doloribus.'
  },

  {
    title: `Man's Search For Meaning`,
    author: 'Viktor E. Frankl',
    genre: 'Motivational',
    image:
      'https://cdn.lifehack.org/wp-content/uploads/2019/07/mans-search-for-meaning.jpg',
    timeRead: '18 hours',
    rating: 3,
    diaryEntry:
      'Lorem ipsum dolor sit amet. Nam quasi molestiae ut exercitationem Quis vel dolores doloribus sit ipsam veniam et magni laborum et sint cupiditate ut nemo voluptatem. Sit itaque nobis non repudiandae minus qui animi accusamus aut autem ipsam. A illo minima sed quod voluptatum qui labore doloribus.'
  }
];

const POLITICS = [
  {
    title: 'Politically Homeless',
    author: 'Matt Forde',
    genre: 'Politics',
    image: 'https://m.media-amazon.com/images/I/4100zlc4c4S.jpg',
    timeRead: '25 hours',
    rating: 2,
    diaryEntry:
      'Lorem ipsum dolor sit amet. Nam quasi molestiae ut exercitationem Quis vel dolores doloribus sit ipsam veniam et magni laborum et sint cupiditate ut nemo voluptatem. Sit itaque nobis non repudiandae minus qui animi accusamus aut autem ipsam. A illo minima sed quod voluptatum qui labore doloribus.'
  },

  {
    title: 'Why Nations Fail',
    author: 'Daron Acemoglu & James A. Robinson',
    genre: 'Politics',
    image: 'https://m.media-amazon.com/images/I/61-ytaG7QmL._SL500_.jpg',
    timeRead: '30 hours',
    rating: 4,
    diaryEntry:
      'Lorem ipsum dolor sit amet. Nam quasi molestiae ut exercitationem Quis vel dolores doloribus sit ipsam veniam et magni laborum et sint cupiditate ut nemo voluptatem. Sit itaque nobis non repudiandae minus qui animi accusamus aut autem ipsam. A illo minima sed quod voluptatum qui labore doloribus.'
  }
];

const RELIGION = [
  {
    title: 'The Seven Spiritual Laws of Success',
    author: 'Deepak Chopra',
    genre: 'Religion',
    image:
      'https://images.squarespace-cdn.com/content/v1/543d370ee4b0dc74d0f2af1f/1486715357902-U71NJ9TVEIXJIB3EQ11E/image-asset.jpeg',
    timeRead: '8 hours',
    rating: 5,
    diaryEntry:
      'Lorem ipsum dolor sit amet. Nam quasi molestiae ut exercitationem Quis vel dolores doloribus sit ipsam veniam et magni laborum et sint cupiditate ut nemo voluptatem. Sit itaque nobis non repudiandae minus qui animi accusamus aut autem ipsam. A illo minima sed quod voluptatum qui labore doloribus.'
  },

  {
    title: 'Faith Still Moves Mountains',
    author: 'Harris Faulkner',
    genre: 'Religion',
    image:
      'https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%[…]30_p0_v2%5D&call=url%5Bfile:common/decodeProduct.chain%5D',
    timeRead: '18 hours',
    rating: 1,
    diaryEntry:
      'Lorem ipsum dolor sit amet. Nam quasi molestiae ut exercitationem Quis vel dolores doloribus sit ipsam veniam et magni laborum et sint cupiditate ut nemo voluptatem. Sit itaque nobis non repudiandae minus qui animi accusamus aut autem ipsam. A illo minima sed quod voluptatum qui labore doloribus.'
  }
];

const ROMANCE = [
  {
    title: 'The Love Hypothesis',
    author: 'Ali Hazelwood',
    genre: 'Romance',
    image:
      'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1611937942l/56732449.jpg',
    timeRead: '12 hours',
    rating: 5,
    diaryEntry:
      'Lorem ipsum dolor sit amet. Nam quasi molestiae ut exercitationem Quis vel dolores doloribus sit ipsam veniam et magni laborum et sint cupiditate ut nemo voluptatem. Sit itaque nobis non repudiandae minus qui animi accusamus aut autem ipsam. A illo minima sed quod voluptatum qui labore doloribus.'
  },

  {
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    genre: 'Romance',
    image:
      'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1611937942l/56732449.jpg',
    timeRead: '12 hours',
    rating: 4,
    diaryEntry:
      'Lorem ipsum dolor sit amet. Nam quasi molestiae ut exercitationem Quis vel dolores doloribus sit ipsam veniam et magni laborum et sint cupiditate ut nemo voluptatem. Sit itaque nobis non repudiandae minus qui animi accusamus aut autem ipsam. A illo minima sed quod voluptatum qui labore doloribus.'
  }
];

const SCIENCE_FICTION = [
  {
    title: 'The Vanished Birds',
    author: 'Simon Jimenez',
    genre: 'Science Fiction',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUDJs8sAN5GYbN8WbYXp9G-zt6oXfW4mAH0w&usqp=CAU',
    timeRead: '25 hours',
    rating: 3,
    diaryEntry:
      'Lorem ipsum dolor sit amet. Nam quasi molestiae ut exercitationem Quis vel dolores doloribus sit ipsam veniam et magni laborum et sint cupiditate ut nemo voluptatem. Sit itaque nobis non repudiandae minus qui animi accusamus aut autem ipsam. A illo minima sed quod voluptatum qui labore doloribus.'
  },

  {
    title: 'Defy The Worlds',
    author: 'Claudia Gray',
    genre: 'Science Fiction',
    image: 'https://i.ebayimg.com/images/g/wNkAAOSwsJJhRoG-/s-l500.jpg',
    timeRead: '10 hours',
    rating: 5,
    diaryEntry:
      'Lorem ipsum dolor sit amet. Nam quasi molestiae ut exercitationem Quis vel dolores doloribus sit ipsam veniam et magni laborum et sint cupiditate ut nemo voluptatem. Sit itaque nobis non repudiandae minus qui animi accusamus aut autem ipsam. A illo minima sed quod voluptatum qui labore doloribus.'
  }
];

const THRILLER = [
  {
    title: 'The Girl Upstairs',
    author: 'Georgina Lees',
    genre: 'Thriller',
    image:
      'https://m.media-amazon.com/images/I/41W2Im61ztL._SY291_BO1,204,203,200_QL40_ML2_.jpg',
    timeRead: '14 hours',
    rating: 2,
    diaryEntry:
      'Lorem ipsum dolor sit amet. Nam quasi molestiae ut exercitationem Quis vel dolores doloribus sit ipsam veniam et magni laborum et sint cupiditate ut nemo voluptatem. Sit itaque nobis non repudiandae minus qui animi accusamus aut autem ipsam. A illo minima sed quod voluptatum qui labore doloribus.'
  },

  {
    title: 'English Crime',
    author: 'Roger Harrington',
    genre: 'Thriller',
    image: 'https://m.media-amazon.com/images/I/51UVKi9abKL.jpg',
    timeRead: '10 hours',
    rating: 1,
    diaryEntry:
      'Lorem ipsum dolor sit amet. Nam quasi molestiae ut exercitationem Quis vel dolores doloribus sit ipsam veniam et magni laborum et sint cupiditate ut nemo voluptatem. Sit itaque nobis non repudiandae minus qui animi accusamus aut autem ipsam. A illo minima sed quod voluptatum qui labore doloribus.'
  }
];

const OTHER = [
  {
    title: 'Contemporary Monologues for Women',
    author: 'n/a',
    genre: 'Other',
    image:
      'https://m.media-amazon.com/images/I/416hm9SnvhL._SY291_BO1,204,203,200_QL40_ML2_.jpg',
    timeRead: '',
    rating: 4,
    diaryEntry:
      'Lorem ipsum dolor sit amet. Nam quasi molestiae ut exercitationem Quis vel dolores doloribus sit ipsam veniam et magni laborum et sint cupiditate ut nemo voluptatem. Sit itaque nobis non repudiandae minus qui animi accusamus aut autem ipsam. A illo minima sed quod voluptatum qui labore doloribus.'
  },

  {
    title: 'Sew it Up',
    author: 'Ruth Singer',
    genre: 'Other',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqdaFLFUGHwiSrUM66aXb1DbwgNdckJEjxGw&usqp=CAU',
    timeRead: '7 hours',
    rating: 3,
    diaryEntry:
      'Lorem ipsum dolor sit amet. Nam quasi molestiae ut exercitationem Quis vel dolores doloribus sit ipsam veniam et magni laborum et sint cupiditate ut nemo voluptatem. Sit itaque nobis non repudiandae minus qui animi accusamus aut autem ipsam. A illo minima sed quod voluptatum qui labore doloribus.'
  }
];

// seed function

const seedDb = async () => {
  await connectDb();

  await Book.deleteMany({});
  await User.deleteMany({});
  await Genre.deleteMany({});

  const [userOne, userTwo, adminUser] = await User.create([
    NON_ADMIN_USER_ONE,
    NON_ADMIN_USER_TWO,
    ADMIN_USER
  ]);

  const adventure = await Genre.create({ name: 'Adventure' });
  const biography = await Genre.create({ name: 'Biography' });
  const mystery = await Genre.create({ name: 'Mystery' });
  const fantasy = await Genre.create({ name: 'Fantasy' });
  const fiction = await Genre.create({ name: 'Fiction' });
  const history = await Genre.create({ name: 'History' });
  const horror = await Genre.create({ name: 'Horror' });
  const motivational = await Genre.create({ name: 'Motivational' });
  const politics = await Genre.create({ name: 'Politics' });
  const religion = await Genre.create({ name: 'Religion' });
  const romance = await Genre.create({ name: 'Romance' });
  const scienceFiction = await Genre.create({ name: 'Science Fiction' });
  const thriller = await Genre.create({ name: 'Thriller' });
  const other = await Genre.create({ name: 'Other' });

  const adventureBooks = ADVENTURE.map((book) => ({
    ...book,
    genres: adventure.name,
    addedBy: userOne._id
  }));

  const biographyBooks = BIOGRAPHY.map((book) => ({
    ...book,
    genres: biography.name,
    addedBy: userOne._id
  }));

  const mysteryBooks = MYSTERY.map((book) => ({
    ...book,
    genres: mystery.name,
    addedBy: userOne._id
  }));

  const fantasyBooks = FANTASY.map((book) => ({
    ...book,
    genres: fantasy.name,
    addedBy: userOne._id
  }));

  const fictionBooks = FICTION.map((book) => ({
    ...book,
    genres: fiction.name,
    addedBy: userOne._id
  }));

  const historyBooks = HISTORY.map((book) => ({
    ...book,
    genres: history.name,
    addedBy: userOne._id
  }));

  const horrorBooks = HORROR.map((book) => ({
    ...book,
    genres: horror.name,
    addedBy: userOne._id
  }));

  const motivationalBooks = MOTIVATIONAL.map((book) => ({
    ...book,
    genres: motivational.name,
    addedBy: userOne._id
  }));

  const politicsBooks = POLITICS.map((book) => ({
    ...book,
    genres: politics.name,
    addedBy: userTwo._id
  }));

  const religionBooks = RELIGION.map((book) => ({
    ...book,
    genres: religion.name,
    addedBy: userTwo._id
  }));

  const romanceBooks = ROMANCE.map((book) => ({
    ...book,
    genres: romance.name,
    addedBy: userTwo._id
  }));

  const scienceFictionBooks = SCIENCE_FICTION.map((book) => ({
    ...book,
    genres: scienceFiction.name,
    addedBy: userTwo._id
  }));

  const thrillerBooks = THRILLER.map((book) => ({
    ...book,
    genres: thriller.name,
    addedBy: userTwo._id
  }));

  const otherBooks = OTHER.map((book) => ({
    ...book,
    genres: other.name,
    addedBy: userTwo._id
  }));

  const adventureBooksInDb = await Book.create(adventureBooks);
  const biographyBooksInDb = await Book.create(biographyBooks);
  const mysteryBooksInDd = await Book.create(mysteryBooks);
  const fantasyBooksInDb = await Book.create(fantasyBooks);
  const fictionBooksInDb = await Book.create(fictionBooks);
  const historyBooksInDb = await Book.create(historyBooks);
  const horrorBooksInDb = await Book.create(horrorBooks);
  const motivationalBooksInDb = await Book.create(motivationalBooks);
  const politicsBooksInDb = await Book.create(politicsBooks);
  const religionBooksInDb = await Book.create(religionBooks);
  const romanceBooksInDb = await Book.create(romanceBooks);
  const scienceFictionBooksInDb = await Book.create(scienceFictionBooks);
  const thrillerBooksInDb = await Book.create(thrillerBooks);
  const otherBooksInDb = await Book.create(otherBooks);

  await Genre.findOneAndUpdate(
    { _id: adventure._id },
    { $push: { books: { $each: adventureBooksInDb } } }
  );

  await Genre.findOneAndUpdate(
    { _id: biography._id },
    { $push: { books: { $each: biographyBooksInDb } } }
  );

  await Genre.findOneAndUpdate(
    { _id: mystery._id },
    { $push: { books: { $each: mysteryBooksInDd } } }
  );

  await Genre.findOneAndUpdate(
    { _id: fantasy._id },
    { $push: { books: { $each: fantasyBooksInDb } } }
  );

  await Genre.findOneAndUpdate(
    { _id: fiction._id },
    { $push: { books: { $each: fictionBooksInDb } } }
  );

  await Genre.findOneAndUpdate(
    { _id: history._id },
    { $push: { books: { $each: historyBooksInDb } } }
  );

  await Genre.findOneAndUpdate(
    { _id: horror._id },
    { $push: { books: { $each: horrorBooksInDb } } }
  );

  await Genre.findOneAndUpdate(
    { _id: motivational._id },
    { $push: { books: { $each: motivationalBooksInDb } } }
  );

  await Genre.findOneAndUpdate(
    { _id: politics._id },
    { $push: { books: { $each: politicsBooksInDb } } }
  );

  await Genre.findOneAndUpdate(
    { _id: religion._id },
    { $push: { books: { $each: religionBooksInDb } } }
  );

  await Genre.findOneAndUpdate(
    { _id: romance._id },
    { $push: { books: { $each: romanceBooksInDb } } }
  );

  await Genre.findOneAndUpdate(
    { _id: scienceFiction._id },
    { $push: { books: { $each: scienceFictionBooksInDb } } }
  );

  await Genre.findOneAndUpdate(
    { _id: thriller._id },
    { $push: { books: { $each: thrillerBooksInDb } } }
  );

  await Genre.findOneAndUpdate(
    { _id: other._id },
    { $push: { books: { $each: otherBooksInDb } } }
  );

  const userOneBooks = await Book.find({ addedBy: userOne._id });
  const userTwoBooks = await Book.find({ addedBy: userTwo._id });

  await User.updateOne(
    { _id: userOne._id },
    { $push: { myBooks: { $each: userOneBooks } } }
  );

  await User.updateOne(
    { _id: userTwo._id },
    { $push: { myBooks: { $each: userTwoBooks } } }
  );

  await disconnectDb();
};

seedDb();
