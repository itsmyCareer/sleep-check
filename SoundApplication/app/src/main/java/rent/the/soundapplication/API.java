package rent.the.soundapplication;

import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;
import retrofit2.http.QueryMap;

public interface API {

    @GET("data/{date}")
    Call<RetrofitRepo> getData(@Path("date") String date);

    @GET("time/{date}")
    Call<TimeData> getTime(@Path("date") String date);

}


