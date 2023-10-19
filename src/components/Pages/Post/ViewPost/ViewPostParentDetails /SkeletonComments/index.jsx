import React from 'react';
import { Stack, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
const SkeletonComments = ({ isLoading, children }) => {
    return (
        <Stack>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
        </Stack>

    );
};

export default SkeletonComments;
