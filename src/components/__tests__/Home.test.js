import { render, screen, fireEvent } from "@testing-library/vue";
import axios from "axios";
import Home from "../Home.vue";

beforeAll(() => {
  jest.spyOn(axios, "get").mockImplementation((url) => {
    if (url.match(/symbols/)) {
      return Promise.resolve({
        symbols: ["AUD", "BGN", "BRL", "THB", "USD"],
      });
    }
    if (url.match(/rates/)) {
      return Promise.resolve({
        data: {
          rates: {
            AUD: 0.044714628,
            BGN: 0.0532567258,
            BRL: 0.1792615184,
            THB: 1,
            USD: 0.03209263233186368,
          },
        },
      });
    }
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

it("should render exchange rates list when change dropdown", async () => {
  render(Home);

  const baseInput = screen.getByLabelText(/select base/i);
  await fireEvent.update(baseInput, "THB");

  expect(await screen.findAllByText(/thb - 1/i)).toHaveLength(1);
  expect(await screen.findAllByText(/usd/i)).toHaveLength(1);

  expect(axios.get).toHaveBeenCalledTimes(2);
  expect(axios.get).toHaveBeenNthCalledWith(
    1,
    expect.stringMatching(/symbols/i)
  );
  expect(axios.get).toHaveBeenNthCalledWith(2, expect.stringMatching(/rates/i));
});
