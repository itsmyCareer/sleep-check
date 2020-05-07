package rent.the.soundapplication;

import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.github.mikephil.charting.animation.Easing;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.components.Description;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;
import com.github.mikephil.charting.utils.ColorTemplate;

import java.sql.Time;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ChartActivity extends AppCompatActivity {
    static final String URL = "http://13.209.70.41:5000/";
    ArrayList<DataGet> list;
    String date, yearS, monthS, dayS;
    ArrayList<Float> sound = new ArrayList<Float>();
    ArrayList<Float> vibration = new ArrayList<Float>();
    PieChart pieChartS, pieChartV;
    float a, b, c, d, e, sum, sum2;
    float a1, b1, c1, d1, e1, f1, f2, f3, f4, f5, g1, g2, g3, g4, g5;
    Button set;
    Spinner year, month, day;
    TextView t1, t2, t3, t4, finalTime;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chart);

        set = findViewById(R.id.date_set);
        year = findViewById(R.id.spinner_year);
        month = findViewById(R.id.spinner_month);
        day = findViewById(R.id.spinner_day);
        t1 = findViewById(R.id.a1);
        t2 = findViewById(R.id.b1);
        t3 = findViewById(R.id.c1);
        t4 = findViewById(R.id.d1);
        finalTime = findViewById(R.id.final_tv);

        set.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (!yearS.isEmpty() && !monthS.isEmpty() && !dayS.isEmpty()) {

                    date = yearS + monthS + dayS;

                    Retrofit retrofit = new Retrofit.Builder()
                            .baseUrl(URL)
                            .addConverterFactory(GsonConverterFactory.create())
                            .build();

                    API retrofitService = retrofit.create(API.class);
                    Call<TimeData> call = retrofitService.getTime(date);
                    call.enqueue(new Callback<TimeData>() {
                        @Override
                        public void onResponse(Call<TimeData> call, Response<TimeData> response) {
                            if (response.isSuccessful()) {
                                TimeData repo = response.body();
                                finalTime.setText("총 수면시간: "+repo.getTime());
                                Log.e("asdfㅁㄴㅇㄻㄴㅇㄹ", repo.getTime());
                            }else{
                                Log.e("연결", "안됌");
                            }
                        }

                        @Override
                        public void onFailure (Call < TimeData > call, Throwable t){
                            Log.e("연결", t.getMessage());
                        }
                    });

                    Retrofit retrofit2 = new Retrofit.Builder()
                            .baseUrl(URL)
                            .addConverterFactory(GsonConverterFactory.create())
                            .build();

                    API retrofitService2 = retrofit2.create(API.class);
                    Call<RetrofitRepo> call2 = retrofitService2.getData(date);
                    call2.enqueue(new Callback<RetrofitRepo>() {
                        @Override
                        public void onResponse(Call<RetrofitRepo> call, Response<RetrofitRepo> response) {
                            if (response.isSuccessful()) {
                                RetrofitRepo repo = response.body();
                                for (int i = 0; i < repo.getSponsors().size(); i++) {
                                    sound.add(repo.getSponsors().get(i).getSound());
                                    if (repo.getSponsors().get(i).getSound() >= 0 && repo.getSponsors().get(i).getSound() < 10) {
                                        a++;
                                    } else if (repo.getSponsors().get(i).getSound() >= 10 && repo.getSponsors().get(i).getSound() < 20) {
                                        b++;
                                    } else if (repo.getSponsors().get(i).getSound() >= 20 && repo.getSponsors().get(i).getSound() < 30) {
                                        c++;
                                    } else if (repo.getSponsors().get(i).getSound() >= 30 && repo.getSponsors().get(i).getSound() < 40) {
                                        d++;
                                    } else {
                                        e++;
                                    }
                                    if (repo.getSponsors().get(i).getVibration() >= 0 && repo.getSponsors().get(i).getVibration() < 10) {
                                        a++;
                                    } else if (repo.getSponsors().get(i).getVibration() >= 10 && repo.getSponsors().get(i).getVibration() < 20) {
                                        b++;
                                    } else if (repo.getSponsors().get(i).getVibration() >= 20 && repo.getSponsors().get(i).getVibration() < 30) {
                                        c++;
                                    } else if (repo.getSponsors().get(i).getVibration() >= 30 && repo.getSponsors().get(i).getVibration() < 40) {
                                        c++;
                                    } else {
                                        e++;
                                    }
                                    sum = a + b + c + d + e;
                                    a1 = a / sum * 100;
                                    b1 = b / sum * 100;
                                    c1 = c / sum * 100;
                                    e1 = e / sum * 100;
                                    t1.setText(String.valueOf(e));
                                    t2.setText(String.valueOf(c));
                                    t3.setText(String.valueOf(b));
                                    t4.setText(String.valueOf(a));

                                    vibration.add(repo.getSponsors().get(i).getVibration());

                                    pieChartS = findViewById(R.id.piechart_sound);

                                    pieChartS.setUsePercentValues(true);
                                    pieChartS.getDescription().setEnabled(false);
                                    pieChartS.setExtraOffsets(5, 10, 5, 5);

                                    pieChartS.setDragDecelerationFrictionCoef(0.95f);

                                    pieChartS.setDrawHoleEnabled(false);
                                    pieChartS.setHoleColor(Color.WHITE);
                                    pieChartS.setTransparentCircleRadius(61f);

                                    ArrayList<PieEntry> yValues = new ArrayList<PieEntry>();
                                    yValues.add(new PieEntry(c1, "REM 수면"));
                                    Log.e("asdf", String.valueOf(a1));
                                    yValues.add(new PieEntry(a1, "깊은 수면"));
                                    yValues.add(new PieEntry(b1, "얕은 수면"));
                                    yValues.add(new PieEntry(e1, "깨어있음"));


                                    pieChartS.animateY(1000, Easing.EasingOption.EaseInOutCubic); //애니메이션

                                    Description description3 = new Description();
                                    description3.setText("Sound"); //라벨
                                    description3.setTextSize(15);
                                    pieChartS.setDescription(description3);

                                    PieDataSet dataSet = new PieDataSet(yValues, "Countries");
                                    dataSet.setSelectionShift(5f);
                                    dataSet.setColors(ColorTemplate.JOYFUL_COLORS);

                                    PieData data = new PieData((dataSet));

                                    pieChartS.setData(data);
                                }

                            }
                        }

                        @Override
                        public void onFailure(Call<RetrofitRepo> call, Throwable t) {
                            Log.e("연결", t.getMessage());
                        }
                    });

                } else {
                    Toast.makeText(getBaseContext(), "날짜를 입력해주세요", Toast.LENGTH_SHORT).show();
                }
            }
        });
        year.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view,
                                       int position, long id) {
                yearS = (String) parent.getItemAtPosition(position);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });
        month.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view,
                                       int position, long id) {
                monthS = (String) parent.getItemAtPosition(position);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });
        day.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view,
                                       int position, long id) {
                dayS = (String) parent.getItemAtPosition(position);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });




}
}
/*
소음,진동 측정값에 기반한 4단계 분석 그래프
 */