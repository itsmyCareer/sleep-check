package rent.the.soundapplication;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class DataGet {
    @SerializedName("sound")
    @Expose
    private float sound;
    @SerializedName("vibration")
    @Expose
    private float vibration;

    public DataGet(float sound, float vibration) {
        this.setSound(sound);
        this.setVibration(vibration);
    }

    public float getSound() {
        return sound;
    }

    public void setSound(float sound) {
        this.sound = sound;
    }


    public float getVibration() {
        return vibration;
    }

    public void setVibration(float vibration) {
        this.vibration = vibration;
    }
}
