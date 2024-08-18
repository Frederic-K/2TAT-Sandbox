import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  ehs: [{ name: "" }],
  isEHListOpen: false,
}

export const ehListSlice = createSlice({
  name: "ehList",
  initialState,
  reducers: {
    addEH: (state) => {
      state.ehs.push({ name: "" })
    },
    removeEH: (state, action) => {
      state.ehs = state.ehs.filter((_, index) => index !== action.payload)
    },
    resetEH: (state, action) => {
      state.ehs[action.payload] = { name: "" }
    },
    updateEHName: (state, action) => {
      const { index, name } = action.payload
      state.ehs[index] = { name }
    },
    resetAll: (state) => {
      state.ehs = [{ name: "" }]
    },
    setIsEHListOpen: (state, action) => {
      state.isEHListOpen = action.payload
    },
  },
})

export const {
  addEH,
  removeEH,
  resetEH,
  updateEHName,
  resetAll,
  setIsEHListOpen,
} = ehListSlice.actions

export default ehListSlice.reducer
