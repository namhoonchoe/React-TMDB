type discoverInfo = null|[]

interface IGenreFunctions {
  addToFilter:(arg:any) => void
  removeFromFilter:(arg:any) => void
  discoverTrigger:(sort:any,genreInclude:any,genreExclude:any) => void
  fetchMore:() => void
}