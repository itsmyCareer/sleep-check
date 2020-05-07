package rent.the.soundapplication;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

class RetrofitRepo {

    @SerializedName("data")
     List<DataGet> sponsors;

    public List<DataGet> getSponsors() {
        return sponsors;
    }
}