import React from 'react'
import SQLite from 'react-native-sqlite-storage'

var database_name = 'AWESOME.DB'
var database_version = '1.0'
// SQLite.enablePromise(true);

export default class DB extends React.Component {
  TABLE_NAME = 'INBOX'

  // Table columns
  _ID = '_id'
  SENDER = 'sender'
  CONTENT = 'content'

  // Creating table query
  CREATE_TABLE =
    'create table  IF NOT EXISTS ' +
    this.TABLE_NAME +
    '(' +
    this._ID +
    ' INTEGER PRIMARY KEY AUTOINCREMENT, ' +
    this.SENDER +
    ' TEXT NOT NULL, ' +
    this.CONTENT +
    ' TEXT);'

  constructor() {
    super()
    SQLite.DEBUG = true
    this.conn = SQLite.openDatabase(database_name, database_version)

    this.CreateTable()
  }
  /**
   * Execute sql queries
   *
   * @param sql
   * @param params
   *
   * @returns {resolve} results
   */
  ExecuteQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
      this.conn.transaction(trans => {
        trans.executeSql(
          sql,
          params,
          (trans, results) => {
            resolve(results)
          },
          error => {
            reject(error)
          },
        )
      })
    })
  }

  /**
   * Select Query
   */
  async fetchMessages({ params = [], page = 0, limit = 10 }) {
    const query = `SELECT SENDER as sender, CONTENT as content, _ID as id FROM INBOX limit ${limit} offset ${
      limit * page
    }`
    const selectQuery = await this.ExecuteQuery(query, params)
    const rows = selectQuery.rows
    const records = []
    for (let i = 0; i < rows.length; i++) {
      records.push(rows.item(i))
    }
    return records
  }

  // Create Table
  async CreateTable(conn) {
    await this.ExecuteQuery(this.CREATE_TABLE, [], conn)
  }
}
