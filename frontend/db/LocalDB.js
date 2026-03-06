import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('crypchat_local.db');

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, sender TEXT, content TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);'
    );
  });
};
