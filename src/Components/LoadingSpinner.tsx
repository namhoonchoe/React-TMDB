import { Spinner } from "@chakra-ui/react"
import { CenteredBox } from "./Display/BasicLayouts"


export default function LoadingSpinner() {
  return (
  <CenteredBox my={32}>
    <Spinner size="xl" color="blue.500" />
  </CenteredBox>
  )
}
