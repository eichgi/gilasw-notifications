import {describe, it, expect, vi} from 'vitest'

import {mount} from '@vue/test-utils'
import NotificationForm from "./../NotificationForm.vue"
import PrimeVue from "primevue/config";
import axios from "axios";

describe('Notification Form', () => {
  const form = mount(NotificationForm,
    {
      props: {msg: 'Hello World'},
      global: {
        plugins: [PrimeVue]
      }
    }
  );
  it("should renders properly", () => {
    expect(form.text()).toContain('Hello World')
  });

  it("should send a new notification request", () => {
    const mockData = {text: "Fake message", categories: ["SPORTS", "MOVIES"]};
    vi.mock('axios');
    axios.post.mockResolvedValue({
      data: mockData,
    })
    form.find("#text").setValue("Fake message");
    form.find("#submit-form").trigger("click");
    expect(axios.post).toHaveBeenCalledOnce();
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/notifications/new', mockData)
  });
})
