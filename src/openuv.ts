import {
    RealTimeUVResponse,
    OpenUVParams,
    ForecastResponse,
    DailyProtectionTimeResponse,
    DailyProtectionTimeParams,
} from "./types";

/**
 * Get real-time UV Index by location. Optional altitude, ozone level and datetime could be provided as query parameters.
 * @param apiKey API key from [OpenUV.io](https://www.openuv.io)
 */
export async function getRealTimeUV(apiKey: string, options?: OpenUVParams): Promise<RealTimeUVResponse> {
    return standardOpenUVRequest("https://api.openuv.io/api/v1/uv", apiKey, options);
}

/**
 * Get hourly UV Index Forecast by location and date. Optional altitude, ozone level and datetime could be provided.
 * @param apiKey Your API key from [OpenUV.io](https://www.openuv.io)
 */
export function getForecast(apiKey: string, options?: OpenUVParams): Promise<ForecastResponse> {
    return standardOpenUVRequest("https://api.openuv.io/api/v1/forecast", apiKey, options);
}

/**
 * Get protection time by location, UV "from" and UV "to" values with 10 minutes accuracy. Optional altitude and ozone level could be provided.
 * @param apiKey Your API key from [OpenUV.io](https://www.openuv.io)
 */
export async function getDailyProtectionTime(
    apiKey: string,
    options?: DailyProtectionTimeParams
): Promise<DailyProtectionTimeResponse> {
    const regularOptions = await getOptions(options);
    const cleanOptions = { from: options?.from, to: options?.to, ...regularOptions } as DailyProtectionTimeParams;
    const url = createUrlWithParams("https://api.openuv.io/api/v1/protection", cleanOptions);

    const response = await fetch(url, {
        method: "GET",
        headers: new Headers({
            "x-access-token": apiKey,
        }),
    });

    return handleJSONResponse(response);
}

/**
 * Client that will callthrough to function with original API Key. Just to avoid passing around the API key.
 * If you're going to use a single function, I would just recommend using the functions.
 */
export class OpenUVClient {
    constructor(private apiKey: string) {}
    /** {@inheritDoc getRealTimeUV} */
    getRealTimeUV(options?: OpenUVParams) {
        return getRealTimeUV(this.apiKey, options);
    }
    /** {@inheritDoc getForecast} */
    getForecast(options?: OpenUVParams) {
        return getForecast(this.apiKey, options);
    }
    /** {@inheritDoc getDailyProtectionTime} */
    getDailyProtectionTime(options?: DailyProtectionTimeParams) {
        return getDailyProtectionTime(this.apiKey, options);
    }
}

async function standardOpenUVRequest<T>(endpoint: string, apiKey: string, options?: OpenUVParams): Promise<T> {
    const cleanOptions = await getOptions(options);
    const url = createUrlWithParams(endpoint, cleanOptions);

    const response = await fetch(url, {
        method: "GET",
        headers: new Headers({
            "x-access-token": apiKey,
        }),
    });

    return handleJSONResponse(response);
}

async function getOptions(options?: OpenUVParams): Promise<OpenUVParams> {
    let { lat, lng, alt, ozone, dt } = options ?? {};
    // If lat or lng not provided, attempt to use Geolocation API
    if (!lat || !lng) {
        if (!navigator?.geolocation?.getCurrentPosition) {
            throw new Error("Geolocation API is not availible, provide lat and lng in parameters");
        }
        let {
            coords: { latitude: lat, longitude: lng, altitude: alt },
        } = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
    if (lat && lng) {
        return { lat, lng, alt, ozone, dt };
    }

    throw new Error("lat or lng not set");
}

function createUrlWithParams(endpoint: string, options: { [key: string]: unknown }): string {
    let { lat, lng, alt, ozone, dt } = options;

    const url = new URL(endpoint);
    for (const key in options) {
        url.searchParams.set(key, String(options[key]));
    }

    return url.toString();
}

async function handleJSONResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
        return await response.json();
    }

    throw new Error(`${response.status} ${response.statusText} - ${(await response.json()).error}`);
}
