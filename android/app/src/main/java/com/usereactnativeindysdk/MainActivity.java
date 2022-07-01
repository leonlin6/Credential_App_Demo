package com.usereactnativeindysdk;

import android.os.Bundle;
import android.system.ErrnoException;
import android.system.Os;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import java.io.File;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "UseReactNativeIndySdk";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    File externalFilesDir = getExternalFilesDir(null);
    String path = externalFilesDir.getAbsolutePath();
    System.out.println("externalFilesDir=" + path);

    try {
      Os.setenv("EXTERNAL_STORAGE", getExternalFilesDir(null).getAbsolutePath(), true);
      System.loadLibrary("indy");
    } catch (ErrnoException e) {
      e.printStackTrace();
    }
  }
}