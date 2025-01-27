import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

interface BannersState {
  banners: Banner[];
}

const initialState: BannersState = {
  banners: [],
};

const bannersSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    setBanners: (state, action: PayloadAction<{ banners: Banner[] }>) => {
      state.banners = action.payload.banners;
    },
    clearBanners: (state) => {
      state.banners = [];
    },
  },
});

export const { setBanners, clearBanners } = bannersSlice.actions;
export default bannersSlice.reducer;
