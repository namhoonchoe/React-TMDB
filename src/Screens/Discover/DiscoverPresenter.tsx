import React from 'react'
import { Link } from "react-router-dom";
import CollapseBox from '@components/CollapseBox'
import { Grid, GridItem, Flex, Box, Text, Spacer } from "@chakra-ui/react"

interface IDiscoverProps {
  disiscoverInfo:any,
  loading:boolean,
  error:boolean,
}

const DiscoverPresenter:React.FC<IDiscoverProps> = () => {
  return (
    <>
      <Grid
        h="90vh"
        w="100%"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={3}>
        <GridItem  colSpan={1} rowSpan={2} m={1}>
          <Flex justify="center"align="center" mx={4}>
            <Box  fontSize="xl" fontWeight="semibold">
              <Text> Movies </Text>
            </Box>
            <Spacer/>
            <Link to="/discover/series">
              <Box  fontSize="xl" fontWeight="semibold">
                <Text> Series </Text>
              </Box>
            </Link>
          </Flex>
          <CollapseBox
            title="Genres"/>
          <CollapseBox
            title="SortBy"/>
          <CollapseBox
            title="KeyWords"/>
        </GridItem>
        <GridItem colSpan={4} rowSpan={2} bg="cornsilk">
        </GridItem>
      </Grid>
    </>
  )
}


export default DiscoverPresenter