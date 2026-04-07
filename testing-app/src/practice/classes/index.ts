
// import { Counter } from './Counter';
// const counter = new Counter();
// console.log('counter.value:');
// console.log(counter.value); 

// console.log('counter.increment()');
// counter.increment();
// console.log('counter.value:', counter.value); 
// // 0+1=1

// console.log('counter.increment()');
// counter.increment();
// console.log('counter.value:', counter.value); 
// // 1+1 = 2

// console.log('counter.decrement()');
// counter.decrement();
// console.log('counter.value:', counter.value); 
// // 2-1=1

// console.log('counter.reset()');
// counter.reset();
// console.log('counter.value:', counter.value); 
// // 0

// const a = new Counter();
// const b = new Counter();

// console.log('два экземпляра: a и b');
// console.log('a.value:', a.value);
// console.log('b.value:', b.value);

// console.log('a.increment() - 3 раза и a.decrement() - 1 раз');
// a.increment();
// a.increment();
// a.decrement();
// a.increment();
// console.log('a.value:', a.value); 

// console.log('b.increment() - 1 раз');
// b.increment();
// console.log('b.value:', b.value); 

// console.log('a.value:', a.value);
// console.log('b.value:', b.value);

// import { Book } from './Book';

// const book = new Book('Dune', 500);
// console.log('Добавлена книга:', book.getInfo());

// console.log('Читаем 50 страниц:');
// console.log(book.read(50));
// console.log('Текущее состояние:', book.getInfo());

// console.log('Читаем ещё 30 страниц:');
// console.log(book.read(30));
// console.log('Текущее состояние:', book.getInfo());

// console.log('Читаем ещё 480 страниц:');
// console.log(book.read(480));
// console.log('Количество прочитанных страниц не превышает общего количества:', book.isFinished());


// const book2 = new Book('1984', 90);
// console.log('Книга:', book2.getInfo());
// console.log('Читаем 95 страниц:');
// console.log(book2.read(95));
// console.log('Читаем ещё 10 страниц :');
// console.log(book2.read(10));
// console.log('Количество прочитанных страниц не превышает общего количества:', book2.isFinished());

// const book3 = new Book('War and Peace', 1000);

// console.log('Пытаемся прочитать 0 страниц:');
// console.log(book3.read(0));

// console.log('Пытаемся прочитать -5 страниц:');
// console.log(book3.read(-5));

// console.log('Пытаемся прочитать двадцать:');
// // @ts-ignore 
// console.log(book3.read('двадцать'));

// console.log('Общее состояние остаётся неизменённым:');
// console.log(book3.getInfo());

// const book4 = new Book('Timeless', 300);

// console.log('Начальный прогресс:', book4.getProgress() + '%');

// console.log('Читаем 100 страниц:');
// book4.read(100);
// console.log('Прогресс:', book4.getProgress() + '%');

// console.log('Читаем ещё 99 страниц:');
// book4.read(99);
// console.log('Прогресс:', book4.getProgress() + '%');

// const book5 = new Book('Harry Potter', 487);
// console.log('Книга создана:', book5.getInfo());
// console.log('Книга завершена?', book5.isFinished());

// console.log('Читаем 487 страниц:');
// book5.read(487);
// console.log('Книга завершена?', book5.isFinished());

// const book6 = new Book('Silent reading', 544);

// console.log('Читаем 210 страниц:');
// book6.read(210);
// console.log('Состояние:', book6.getInfo());

// console.log('Начать заново:');
// console.log(book6.restart());

// console.log('После перезагрузки:', book6.getInfo());

// const myBooks = [
//   new Book('See you in Paris', 400),
//   new Book('Blessing of the celestials', 600),
//   new Book('Sunwon', 350),
// ];

// console.log('Прочитаны книги:');
// myBooks[0].read(100);
// myBooks[1].read(250);
// myBooks[2].read(350);

// myBooks.forEach((book, index) => {
//   console.log(
//     `Книга ${index + 1}: ${book.getInfo()} | Прогресс: ${book.getProgress()}%`
//   );
// });




