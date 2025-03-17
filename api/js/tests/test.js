import API from "./api.js";
import assert from "assert";

const testFunction = (api) => {
  if (assert.notStrictEqual(api.success, null)) {
    assert.strictEqual(api.success, true);
    assert.notStrictEqual(api.sdrData, undefined);
  } else {
    console.warn(
      "It looks like the API call hasn't finished yet; I'll wait another minute."
    );
    setTimeout(() => testFunction(api), 60000);
  }
};

async function testApi() {
  const api = new API("thijmens.nl", 12346);
  api.get(0);
  setTimeout(() => testFunction(api), 60000);
}

testApi();
