type DetailData = []

type detailDispatch = (any) => void;

interface IDetailSlice {
  detailInfo:null|DetailData,
  credits:null|DetailData,
  similars:null|DetailData,
  loading?:boolean,
  error?:boolean
} 