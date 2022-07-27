import fetchMock from "jest-fetch-mock";
import { getRealTimeUV } from "./openuv";
fetchMock.enableMocks();

describe("getRealTimeUV", () => {
    it("should send lat and long when provided", async () => {
        const mockUV = { result: { uv: 10 }};
        fetchMock.doMock(JSON.stringify(mockUV));
        const response = await getRealTimeUV("fakeapikey", { lat: 10, lng: 20 });
        expect(fetchMock.mock.calls[0]![0]!).toBe("https://api.openuv.io/api/v1/uv?lat=10&lng=20");
        expect((fetchMock.mock.calls[0]![1]!.headers as Headers).get("x-access-token")).toBe("fakeapikey");
        expect(response.result.uv).toBe(10);
    });

    it("should send all provided params", async () => {
        const mockUV = { result: { uv: 10 }};
        fetchMock.doMock(JSON.stringify(mockUV));
        const response = await getRealTimeUV("fakeapikey", { lat: 10, lng: 20, alt: 5000, dt: "2022-01-01", ozone: 5});
        expect(fetchMock.mock.calls[0]![0]!).toBe("https://api.openuv.io/api/v1/uv?lat=10&lng=20");
        expect((fetchMock.mock.calls[0]![1]!.headers as Headers).get("x-access-token")).toBe("fakeapikey");
        expect(response.result.uv).toBe(10);
    });
});

describe("getForecast", () => {
    it("should send lat and long when provided", async () => {
        const mockUV = { result: { uv: 10 }};
        fetchMock.doMock(JSON.stringify(mockUV));
        const response = await getRealTimeUV("fakeapikey", { lat: 10, lng: 20 });
        expect(fetchMock.mock.calls[0]![0]!).toBe("https://api.openuv.io/api/v1/forecast?lat=10&lng=20");
        expect((fetchMock.mock.calls[0]![1]!.headers as Headers).get("x-access-token")).toBe("fakeapikey");
        expect(response.result.uv).toBe(10);
    });
});