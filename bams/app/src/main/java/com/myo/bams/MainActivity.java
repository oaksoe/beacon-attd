package com.myo.bams;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.bluetooth.BluetoothAdapter;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.os.RemoteException;
import android.util.Log;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.myo.bams.Models.DailyLecture;

import org.altbeacon.beacon.Beacon;
import org.altbeacon.beacon.BeaconConsumer;
import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.BeaconParser;
import org.altbeacon.beacon.MonitorNotifier;
import org.altbeacon.beacon.RangeNotifier;
import org.altbeacon.beacon.Region;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends Activity implements BeaconConsumer {
    protected static final String TAG = "MonitoringActivity";
    protected static final String TAG1 = "Beacon";
    private BeaconManager beaconManager;
    private static final int PERMISSION_REQUEST_COARSE_LOCATION = 1;

    private DailyLecture[] dailyLectures;
    private Boolean startAttendance = false;
    private Boolean beaconSignalDetected = false;
    private int selectedLectureIndex = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        mBluetoothAdapter.disable();

        beaconManager = BeaconManager.getInstanceForApplication(this);
        beaconManager.getBeaconParsers().add(new BeaconParser().setBeaconLayout("m:2-3=beac,i:4-19,i:20-21,i:22-23,p:24-24,d:25-25"));
        beaconManager.getBeaconParsers().add(new BeaconParser().setBeaconLayout("x,s:0-1=feaa,m:2-2=20,d:3-3,d:4-5,d:6-7,d:8-11,d:12-15"));
        beaconManager.getBeaconParsers().add(new BeaconParser().setBeaconLayout("s:0-1=feaa,m:2-2=00,p:3-3:-41,i:4-13,i:14-19"));
        beaconManager.getBeaconParsers().add(new BeaconParser().setBeaconLayout("s:0-1=feaa,m:2-2=10,p:3-3:-41,i:4-20v"));
        beaconManager.getBeaconParsers().add(new BeaconParser().setBeaconLayout("m:2-3=0215,i:4-19,i:20-21,i:22-23,p:24-24"));
        beaconManager.bind(this);

        //region Request For Loacation Permission
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && this.checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            final AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setTitle("This app needs location access");
            builder.setMessage("Please grant location access so this app can detect beacons.");
            builder.setPositiveButton(android.R.string.ok, null);
            builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
                @Override
                public void onDismiss(DialogInterface dialogInterface) {
                    requestPermissions(new String[]{Manifest.permission.ACCESS_COARSE_LOCATION}, PERMISSION_REQUEST_COARSE_LOCATION);
                }
            });
            builder.show();
        }
        //endregion

        try {
            if (mBluetoothAdapter == null) {
                Toast.makeText(getApplicationContext(), "This device doesn't have a bluetooth adapter", Toast.LENGTH_SHORT).show();
                finish();
            }

            if (!mBluetoothAdapter.isEnabled()) {
                Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
                startActivityForResult(enableBtIntent, 99); // any positive integer will work 1 -99
            }
        } catch (Exception e) {
            Log.e(TAG, e.toString());
        }

        getDailyLectures(Config.studentID, Config.studentIntake);
    }

    @Override
    public void onBeaconServiceConnect() {
        final Region region = new Region("myBeacons", null, null, null);
        try {
            beaconManager.startMonitoringBeaconsInRegion(region);
        } catch (RemoteException e) {
            e.printStackTrace();
            Log.e(TAG, "e1 " + e.toString());
        }
        beaconManager.setMonitorNotifier(new MonitorNotifier() {
            @Override
            public void didEnterRegion(Region region) {
                try {
                    beaconManager.startRangingBeaconsInRegion(region);
                } catch (RemoteException e) {
                    e.printStackTrace();
                    Log.e(TAG, "e2 " + e.toString());
                }
            }

            @Override
            public void didExitRegion(Region region) {
            }

            @Override
            public void didDetermineStateForRegion(int i, Region region) {
            }
        });

        beaconManager.setRangeNotifier(new RangeNotifier() {
                    @Override
                    public void didRangeBeaconsInRegion(Collection<Beacon> beacons, Region region) {
                        for (Beacon oneBeacon : beacons) {
                            Log.d(TAG1, "Major *=> " + oneBeacon.getId2() + " Distance *=> " + Double.toString(oneBeacon.getDistance()) );
                            if(oneBeacon.getId2().toString().equalsIgnoreCase(Config.BeaconMajor) && oneBeacon.getDistance() < Config.classRadius){
                                if (!beaconSignalDetected) {
                                    beaconSignalDetected = true;
                                }

                                if (dailyLectures != null && dailyLectures.length > 0) {
                                    startAttendance = true;
                                }

                                if (beaconSignalDetected && startAttendance) {
                                    updateAttendance();
                                    startAttendance = false;
                                }
                            }
                        }
                    }
                });
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
        switch (requestCode) {
            case PERMISSION_REQUEST_COARSE_LOCATION: {
                if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    Log.d(TAG, "coarse location permission granted");
                } else {
                    final AlertDialog.Builder builder = new AlertDialog.Builder(this);
                    builder.setTitle("Functionality limited");
                    builder.setMessage("Since location access has not been granted, this app will not be able to discover beacons when in the background.");
                    builder.setPositiveButton(android.R.string.ok, null);
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
                        builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
                            @Override
                            public void onDismiss(DialogInterface dialog) {
                            }
                        });
                    }
                    builder.show();
                }
                return;
            }
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        beaconManager.unbind(this);
    }

    private void updateAttendance(){
        DailyLecture lecture = dailyLectures[selectedLectureIndex];
        Log.d(TAG, "update attendance ");
        RequestQueue queue = Volley.newRequestQueue(this);
        Map<String, String> params = new HashMap<String, String>();
        params.put("id", lecture.id);
        params.put("studentID", Config.studentID);

        JsonObjectRequest myRequest = new JsonObjectRequest(
                Request.Method.POST,
                Config.BASE_PROTOCOL + Config.API_IP + ":" + Config.API_PORT+ "/v1/api/attendance/updateFromBeacon",
                new JSONObject(params),

                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        verificationSuccess(response);
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        verificationFailed(error);
                    }
                }) {

            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap<String, String> headers = new HashMap<String, String>();
                headers.put("Content-Type", "application/json; charset=utf-8");
                return headers;
            }
        };
        queue.add(myRequest);
    }

    private void getDailyLectures(String studentID, String intake){
        Log.d(TAG, "get daily lectures " + studentID);
        RequestQueue queue = Volley.newRequestQueue(this);

        JsonObjectRequest myRequest = new JsonObjectRequest(
                Request.Method.GET,
                Config.BASE_PROTOCOL + Config.API_IP + ":" + Config.API_PORT+ "/v1/api/attendance/daily/lectures/" + studentID + "/" + intake,
                null,

                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONArray lectures = response.getJSONArray("data");
                            dailyLectures = new DailyLecture[lectures.length()];
                            for (int i = 0; i < lectures.length(); i++) {
                                dailyLectures[i] = new DailyLecture();
                                dailyLectures[i].id = lectures.getJSONObject(i).getString("id");
                                dailyLectures[i].module = lectures.getJSONObject(i).getString("module");
                                dailyLectures[i].studentAttendanceStatus = lectures.getJSONObject(i).getString("studentAttendanceStatus");
                                dailyLectures[i].studentPresencePercent = lectures.getJSONObject(i).getInt("studentPresencePercent");
                            }

                            verificationSuccess(response);
                        } catch (JSONException e) {
                            Log.e(TAG,"e " +e.toString());
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        verificationFailed(error);
                    }
                }) {

            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap<String, String> headers = new HashMap<String, String>();
                headers.put("Content-Type", "application/json; charset=utf-8");
                return headers;
            }
        };
        queue.add(myRequest);
    }

    private void verificationSuccess(JSONObject response) {
        try {
            Log.d(TAG,response.getString("status"));
        } catch (JSONException e) {
            Log.e(TAG,"e " +e.toString());
        }
    }

    private void verificationFailed(VolleyError error) {
        Log.e(TAG,error.toString());
    }
}
