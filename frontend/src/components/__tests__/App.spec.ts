import {beforeAll, describe, expect, it, test, vi} from "vitest";
import {mount} from "@vue/test-utils";
import PrimeVue from "primevue/config";
import App from "../../App.vue";
import axios from "axios";

const originalConsoleError = console.error;
const jsDomCssError = 'Error: Could not parse CSS stylesheet';
console.error = (...params) => {
  if (!params.find(p => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

describe("App mounted", async () => {
  const component = mount(App, {
    global: {
      plugins: [PrimeVue]
    }
  });

  it("should loads data when mounted", async () => {
    vi.mock('axios');
    axios.get.mockResolvedValue({
      data: {time: 1, message: "Hello World!"},
    })

    await component.vm.$nextTick();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});