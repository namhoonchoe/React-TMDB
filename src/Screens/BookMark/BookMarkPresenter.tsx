import React from 'react'
import { VStack } from '@chakra-ui/react'
import Section from '@components/Section'

interface IBookMarkProps {
  movieBookMark:bookMarks,
  seriesBookMark:bookMarks,
}

const BookMarkPresenter:React.FC<IBookMarkProps> = ({ movieBookMark, seriesBookMark }) => {

  return (
    <>
      <VStack>
        { movieBookMark.length === 0 && seriesBookMark.length === 0 &&
          <p>book mark whatever you want</p>
        }
        { movieBookMark.length !== 0 &&
          <Section 
            title={"BookMarked Movies"}
            sectionInfoType={"movie"}
            sectionInfos={movieBookMark}
          />
        }
        { seriesBookMark.length !== 0 &&
          <Section 
          title={"BookMarked Series"}
          sectionInfoType={"series"}
          sectionInfos={seriesBookMark}
          />
        }
      </VStack>
    </>
  )
}


export default BookMarkPresenter