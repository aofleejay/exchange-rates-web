import { render, screen, fireEvent } from "@testing-library/vue";
import axios from "axios";
import Home from "../Home.vue";

beforeAll(() => {
  jest.spyOn(axios, "get").mockResolvedValue({
    data: {
      rates: {
        AUD: 0.044714628,
        BGN: 0.0532567258,
        BRL: 0.1792615184,
        USD: 2312312,
      },
    },
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

it("should render exchange rates list when completed submit form", async () => {
  render(Home);

  const baseInput = screen.getByPlaceholderText(/base rate/i);
  fireEvent.update(baseInput, "THB");

  const submitButton = screen.getByText(/view rates/i);
  fireEvent.click(submitButton);

  expect(await screen.findAllByText(/usd/i)).toHaveLength(1);
  expect(await screen.findAllByText(/aud/i)).toHaveLength(1);
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/base=thb/i));
});
