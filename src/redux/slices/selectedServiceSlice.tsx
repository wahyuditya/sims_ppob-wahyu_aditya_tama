import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedServiceState {
  service_code: string | null;
  service_name: string | null;
  service_icon: string | null;
  service_tariff: number | null;
}

const initialState: SelectedServiceState = {
  service_code: null,
  service_name: null,
  service_icon: null,
  service_tariff: null,
};

const selectedServiceSlice = createSlice({
  name: "selectedService",
  initialState,
  reducers: {
    setSelectedService: (
      state,
      action: PayloadAction<SelectedServiceState>
    ) => {
      state.service_code = action.payload.service_code;
      state.service_name = action.payload.service_name;
      state.service_icon = action.payload.service_icon;
      state.service_tariff = action.payload.service_tariff;
    },
    clearSelectedService: (state) => {
      state.service_code = null;
      state.service_name = null;
      state.service_icon = null;
      state.service_tariff = null;
    },
  },
});

export const { setSelectedService, clearSelectedService } =
  selectedServiceSlice.actions;
export default selectedServiceSlice.reducer;
