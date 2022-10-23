package com.awesomeproject; // replace com.your-app-name with your app’s name
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;


import android.util.Log;

public class CalendarModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

   CalendarModule(ReactApplicationContext context) {
       super(context);
       this.reactContext = context;
   }

    @ReactMethod
    public void createCalendarEvent(String name, String location, Promise promise) {
        Log.d("CalendarModule", "Create event called with name: " + name
        + " and location: " + location);
        promise.resolve("true");
    }

    public static void sendEvent(String event, WritableNativeMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(event, params);
    }

    // add to CalendarModule.java
    @Override
    public String getName() {
        return "CalendarModule";
    }
}