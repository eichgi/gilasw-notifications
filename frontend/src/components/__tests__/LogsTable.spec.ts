import {describe, expect, it, vi} from "vitest";
import {mount} from "@vue/test-utils";
import LogsTable from "../LogsTable.vue";
import PrimeVue from "primevue/config";

const logs = [
  {time: 1, message: "Hello World!"}
];

const originalConsoleError = console.error;
const jsDomCssError = 'Error: Could not parse CSS stylesheet';
console.error = (...params) => {
  if (!params.find(p => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

describe("LogsTable", () => {
  const component = mount(LogsTable, {
    props: {logs: logs},
    global: {
      plugins: [PrimeVue]
    }
  });

  it("should renders properly", () => {
    expect(component.exists()).toBeTruthy();
  });

  it("should display a record with text Hello World!", () => {
    expect(
      component.find("#table")
        .find(".p-datatable-tbody")
        .text()
    ).toContain("Hello World!");
  });
})