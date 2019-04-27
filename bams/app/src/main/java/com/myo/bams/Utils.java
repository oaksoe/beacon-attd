package com.myo.bams;

public class Utils {

    public static double getDistance(int rssi, int txPower) {
        return Math.pow(10d, ((double) txPower - rssi) / (10 * 2));
    }
}
