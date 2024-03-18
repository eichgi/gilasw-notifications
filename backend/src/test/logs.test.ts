import {describe, expect, test} from '@jest/globals';

const expectedResponse = {
  "level": 30,
  "time": 1710597031371,
  "pid": 25684,
  "hostname": "MacBook-Pro-de-Hiram.local",
  "msg": "Email notification to Hiram Guerrero under category sports,movies: This is a new message"
};

const readLogsFileTest = jest.fn(() =>
  Promise.resolve(expectedResponse)
);

describe("test service functions", () => {
  test("read logs returns an array of logs", async () => {
    const data = await readLogsFileTest();

    expect(data).toBe(expectedResponse);
  })
})