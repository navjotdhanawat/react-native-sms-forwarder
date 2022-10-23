package com.awesomeproject;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.telephony.SmsMessage;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class SMSReceiver extends BroadcastReceiver {

    private DBManager dbManager;


    @Override
    public void onReceive(Context context, Intent intent) {
        Bundle bundle = intent.getExtras();
        Object[] smsObj = (Object[]) bundle.get("pdus");


        dbManager = new DBManager(context);
        dbManager.open();

        for (Object obj : smsObj) {
            SmsMessage message = SmsMessage.createFromPdu((byte[]) obj);

            String sender = message.getDisplayOriginatingAddress();
            String content = message.getDisplayMessageBody();

            Log.d("MsgDetails", "Mobile: "+ sender + ", SMS: " + content);
            Toast.makeText(context.getApplicationContext(),"Message Sent",Toast.LENGTH_LONG).show();
           


            // SharedPreferences sharedPreferences = context.getSharedPreferences("sharedPreference", context.MODE_PRIVATE);
            
            // SharedPreferences.Editor myEdit = sharedPreferences.edit(); 
            // myEdit.putString("SMS", msg);
            // myEdit.putString("Mobile", mobNum);
            // myEdit.apply();


            // DB Insert


            dbManager.insert(sender, content);

            WritableNativeMap params = new WritableNativeMap();
            params.putString("tickerText", "abc");
            params.putString("packageName", "asdf");

            CalendarModule.sendEvent("notificationReceived", params);

        }
    }
}
