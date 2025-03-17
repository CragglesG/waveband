import API from "../src/api.js";
import { expect, test } from "bun:test";

const testFunction = async (api) => {
  if (api.success != null) {
    expect(api.success).toBe(true);
    expect(api.sdrData).not.toBeUndefined();
  } else {
    console.warn(
      "It looks like the API call hasn't finished yet; I'll wait another minute."
    );
    await Bun.sleep(60000);
    await testFunction(api);
  }
};

async function testApi() {
  const api = new API("thijmens.nl", 12346, "test token");
  api.get(0);
  await Bun.sleep(60000);
  await testFunction(api);
}

test("API test", async () => {
  await testApi();
});
