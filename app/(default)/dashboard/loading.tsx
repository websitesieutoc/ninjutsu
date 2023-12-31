import { Skeleton, SkeletonText, Stack } from '@/components/chakra';

export default function DashboardLoading() {
  return (
    <Stack>
      <Skeleton startColor="red.500" height="36px" width="200px" />
      <SkeletonText mt="4" noOfLines={4} skeletonHeight={4} />
    </Stack>
  );
}
