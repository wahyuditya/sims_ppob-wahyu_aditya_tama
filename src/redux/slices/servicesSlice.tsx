import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GrAction } from "react-icons/gr";

interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

interface ServicesState {
  services: Service[];
}

const initialState: ServicesState = {
  services: [],
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<{ services: Service[] }>) => {
      state.services = action.payload.services;
    },
    clearServices: (state) => {
      state.services = [];
    },
  },
});

export const { setServices, clearServices } = servicesSlice.actions;
export default servicesSlice.reducer;
