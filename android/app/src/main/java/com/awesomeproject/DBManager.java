package com.awesomeproject;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBManager extends SQLiteOpenHelper {

    // Table Name
    public static final String TABLE_NAME = "INBOX";

    // Table columns
    public static final String _ID = "_id";
    public static final String SENDER = "sender";
    public static final String CONTENT = "content";

    // Database Information
    static final String DB_NAME = "AWESOME.DB";

    // database version
    static final int DB_VERSION = 1;

    // Creating table query
    private static final String CREATE_TABLE = "create table " + TABLE_NAME + "(" + _ID
            + " INTEGER PRIMARY KEY AUTOINCREMENT, " + SENDER + " TEXT NOT NULL, " + CONTENT + " TEXT);";

//    private DatabaseHelper dbHelper;

    private Context context;

    private SQLiteDatabase database;

    public DBManager(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
    }

    public DBManager open() throws SQLException {
//        dbHelper = new DatabaseHelper(context);
        database = this.getWritableDatabase();
        return this;
    }

    public void close() {
        this.close();
    }

    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {

    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

    }

    public void insert(String sender, String content) {
        ContentValues contentValue = new ContentValues();
        contentValue.put(this.SENDER, sender);
        contentValue.put(this.CONTENT, content);
        database.insert(this.TABLE_NAME, null, contentValue);
    }

    public Cursor fetch() {
        String[] columns = new String[] { this._ID, this.SENDER, this.CONTENT };
        Cursor cursor = database.query(this.TABLE_NAME, columns, null, null, null, null, null);
        if (cursor != null) {
            cursor.moveToFirst();
        }
        return cursor;
    }

    public int update(long _id, String sender, String content) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(this.SENDER, sender);
        contentValues.put(this.CONTENT, content);
        int i = database.update(this.TABLE_NAME, contentValues, this._ID + " = " + _id, null);
        return i;
    }

    public void delete(long _id) {
        database.delete(this.TABLE_NAME, this._ID + "=" + _id, null);
    }

}