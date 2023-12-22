import { Skeleton, Stack } from '@chakra-ui/react'

const LoadingIndicator = () => {
  return (
    <div className='pt-10 flex justify-center'>
      <Stack width={'3xl'} spacing={10}>
        <Skeleton height='50px' width={'xl'} />
        <Skeleton height='30px' />
        <Skeleton height='30px' />
        <Skeleton height='30px' />
        <Skeleton height='30px' />
        <Skeleton height='30px' />
      </Stack>
    </div>
  )
}

export default LoadingIndicator
