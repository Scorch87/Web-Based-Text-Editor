import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Put to the database');
  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({text: content});
  const result = await request;
  console.log('🚀 - data saved to the database', result);
  // console.error('putDb not implemented');
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the databse');
  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = await store.getAll();

  
  return request[request.length-1].text;
  // console.error('getDb not implemented');
}

initdb();
