package com.example.nabizahm

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*
import android.content.Intent

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        button5.setOnClickListener {
            val nextIntent = Intent(this, Main2Activity::class.java)
            startActivity(nextIntent)
        }
    }
}
