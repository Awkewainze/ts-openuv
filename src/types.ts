export type OpenUVParams = {
    /** latitude, from `-90.00` to `90.00` */
    lat: number;
    /** longitude, from `-180.00` to `180.00` */
    lng: number;
    /** altitude in meters, from `0` to `10000m`, `0` by default. If provided, the altitude correction factor will be applied to a clear sky sea level UV Index. */
    alt?: number;
    /** ozone in [du (Dobson Units)](https://en.wikipedia.org/wiki/Dobson_unit), from `100` to `550du`, latest value from OMI dataset by default. */
    ozone?: number;
    /** UTC datetime in [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) format `yyyy-MM-ddTHH:mm:ss.SSSZ`, now by default. */
    dt?: string;
};

export type RealTimeUVResponse = {
    result: {
        /** UV Index (real-time or forecasted depending on parameter) */
        uv: number;
        /** UV Index datetime in UTC `yyyy-MM-ddTHH:mm:ss.SSSZ` [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) */
        uv_time: string;
        /** max UV Index for the day (at solar noon) */
        uv_max: number;
        /** max UV Index datetime (solar noon) in UTC `yyyy-MM-ddTHH:mm:ss.SSSZ` [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) */
        uv_max_time: string;
        /** ozone level in [du (Dobson Units)](https://en.wikipedia.org/wiki/Dobson_unit) from OMI data or request (if provided)  */
        ozone: number;
        /** Latest OMI ozone update datetime in UTC `yyyy-MM-ddTHH:mm:ss.SSSZ` [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) */
        ozone_time: string;
        /** safe exposure time for [Fitzpatrick Skin Types](https://www.openuv.io/kb/skin-types-safe-exposure-time-calculation) in minutes */
        safe_exposure_time: {
            /** safe exposure time (mins) till burn for [Skin Type 1](https://www.openuv.io/kb/skin-types-safe-exposure-time-calculation) */
            st1: number;
            /** safe exposure time (mins) till burn for [Skin Type 2](https://www.openuv.io/kb/skin-types-safe-exposure-time-calculation) */
            st2: number;
            /** safe exposure time (mins) till burn for [Skin Type 3](https://www.openuv.io/kb/skin-types-safe-exposure-time-calculation) */
            st3: number;
            /** safe exposure time (mins) till burn for [Skin Type 4](https://www.openuv.io/kb/skin-types-safe-exposure-time-calculation) */
            st4: number;
            /** safe exposure time (mins) till burn for [Skin Type 5](https://www.openuv.io/kb/skin-types-safe-exposure-time-calculation) */
            st5: number;
            /** safe exposure time (mins) till burn for [Skin Type 6](https://www.openuv.io/kb/skin-types-safe-exposure-time-calculation) */
            st6: number;
        };
        sun_info: {
            /**
             * Important times where the sun is at various positions, organized chronologically. All in UTC [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html)
             *
             * Calculated from [SunCalc Library](https://github.com/mourner/suncalc)
             */
            sun_times: {
                /** sunrise (top edge of the sun appears on the horizon) */
                sunrise: string;
                /** sunrise ends (bottom edge of the sun touches the horizon) */
                sunriseEnd: string;
                /** morning golden hour (soft light, best time for photography) ends */
                goldenHourEnd: string;
                /** solar noon (sun is in the highest position) */
                solarNoon: string;
                /** evening golden hour starts */
                goldenHour: string;
                /** sunset starts (bottom edge of the sun touches the horizon) */
                sunsetStart: string;
                /** sunset (sun disappears below the horizon, evening civil twilight starts) */
                sunset: string;
                /** dusk (evening nautical twilight starts) */
                dusk: string;
                /** nautical dusk (evening astronomical twilight starts) */
                nauticalDusk: string;
                /** night starts (dark enough for astronomical observations) */
                night: string;
                /** nadir (darkest moment of the night, sun is in the lowest position) */
                nadir: string;
                /** night ends (morning astronomical twilight starts) */
                nightEnd: string;
                /** nautical dawn (morning nautical twilight starts) */
                nauticalDawn: string;
                /** dawn (morning nautical twilight ends, morning civil twilight starts) */
                dawn: string;
            };
            sun_position: {
                /**
                 * sun azimuth in radians (direction along the horizon, measured from south to west)
                 * @example
                 * `0` is south and `Math.PI * 3/4` is northwest
                 */
                azimuth: number;
                /**
                 * sun altitude above the horizon in radians
                 * @example
                 * `0` at the horizon and `PI/2` at the zenith (straight over your head)
                 */
                altitude: number;
            };
        };
    };
};

export type Forecast = {
    /** forecasted UV Index */
    uv: number;
    /** forecasted UV Index datetime in UTC `yyyy-MM-ddTHH:mm:ss.SSSZ` [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) */
    uv_time: string;
    /**
     * sun azimuth in radians (direction along the horizon, measured from south to west)
     * @example
     * `0` is south and `Math.PI * 3/4` is northwest
     */
    azimuth: number;
    /**
     * sun altitude above the horizon in radians
     * @example
     * `0` at the horizon and `PI/2` at the zenith (straight over your head)
     */
    altitude: number;
};

export type ForecastResponse = {
    result: Array<Forecast>;
};

export type DailyProtectionTimeParams = {
    /** UV Index "from" value for protection datetime lookup. `3.5` by default. */
    from?: number;
    /** UV Index "to" value for protection datetime lookup. `3.5` by default. */
    to?: number;
} & OpenUVParams;

export type DailyProtectionTimeResponse = {
    /** "protection from" datetime, UTC `yyyy-MM-ddTHH:mm:ss.SSSZ` [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html). `null` if no datetime found */
    from_time: string;
    /** estimated UV Index at "protection from" datetime */
    from_uv: number;
    /** "protection to" datetime, UTC `yyyy-MM-ddTHH:mm:ss.SSSZ` [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html). `null` if no datetime found */
    to_time: string;
    /** estimated UV Index at "protection to" datetime */
    to_uv: number;
};
