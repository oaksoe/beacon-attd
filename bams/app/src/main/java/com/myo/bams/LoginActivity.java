package com.myo.bams;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class LoginActivity extends AppCompatActivity {
    protected String TAG = "login";
    EditText email, password;
    Button login;

    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        email = findViewById(R.id.email);
        password = findViewById(R.id.password);
        login = findViewById(R.id.login_button);

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                postLogin(email.getText().toString(), password.getText().toString());
            }
        });
    }

    private void postLogin(String userEmail, String userPassword){
        RequestQueue queue = Volley.newRequestQueue(this);
        Map<String, String> params = new HashMap<String, String>();
        params.put("username", userEmail);
        params.put("password", userPassword);

        JsonObjectRequest myRequest = new JsonObjectRequest(
                Request.Method.POST,
                Config.BASE_PROTOCOL + Config.API_IP + ":" + Config.API_PORT+ "/v1/api/auth/login",
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

    private void verificationSuccess(JSONObject response) {
        try {
            Log.d(TAG,response.getString("status"));
            String status = response.getString("status");
            if(status.equalsIgnoreCase("success")){
                Config.userName = response.getJSONObject("data").getString("_name");
                Toast.makeText(this, "Successfully login : " + Config.userName,Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(this, MainActivity.class);
                startActivity(intent);
            }
            else{
                password.setText("");
                Toast.makeText(this, "Login Failed",Toast.LENGTH_SHORT).show();
            }
        } catch (JSONException e) {
            Log.e(TAG,"e " +e.toString());
        }
    }

    private void verificationFailed(VolleyError error) {
        email.setText("");
        password.setText("");
        Log.e(TAG,error.toString());
    }
}
