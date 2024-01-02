import billReducer from "./modules/billStore"
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        billList: billReducer
    }
})

export default store