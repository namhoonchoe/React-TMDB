import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { movieApi, tvApi , personApi } from "../Api";

const initialState:IDetailSlice = {
  detailInfo:null,
  credits:null,
  similars:null,
  loading:true,
  error:false
}

const detailSlice = createSlice({
  name:"detail",
  initialState,
  reducers:{

  getDetails(state,action:PayloadAction<IDetailSlice>){
    state.detailInfo = action.payload.detailInfo
    state.credits = action.payload.credits
    state.similars = action.payload.similars
  },

  setError(state){
    state.error = true
  },

  setLoading(state){
    state.loading = false 
  },

  }

})

export const { getDetails, setError, setLoading } = detailSlice.actions;

export const getMovieDetail = (id:number) => async(dispatch:detailDispatch) => {
  try {
    const { data:movieDetail } = await movieApi.movieDetail(id)
    const { data:casting } = await movieApi.credits(id)
    const { data:similar } = await movieApi.similar(id)
    const payload = { detailInfo:movieDetail,
                      credits:casting,
                      similars:similar } 
    dispatch(getDetails(payload))
  } catch {
    dispatch(setError)
  } finally {
    dispatch(setLoading)
  }
}

export const getSeriesDetail = (id:number) => async(dispatch:detailDispatch) => {
  try {
    const { data:seriesDetail } = await tvApi.tvDetail(id)
    const { data:casting } = await tvApi.credits(id)
    const { data:similar } = await tvApi.similar(id)
    const payload = { detailInfo:seriesDetail,
                      credits:casting,
                      similars:similar } 
    dispatch(getDetails(payload))
  } catch {
    dispatch(setError)
  } finally {
    dispatch(setLoading)
  }
}


export const getPersonDetail = (id:number) => async(dispatch:detailDispatch) => {
  try {
    const { data:personDetail } = await personApi.peopleDetail(id)
    const { data:casting } = await personApi.credits(id)
    const payload = { detailInfo:personDetail,
                      credits:casting,
                      similars:null } 
    dispatch(getDetails(payload))
  } catch {
    dispatch(setError)
  } finally {
    dispatch(setLoading)
  }
}

export default detailSlice.reducer