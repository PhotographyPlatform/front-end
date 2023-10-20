import React from 'react';
import { Stack, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import './skeltonComments.scss'
const SkeletonComments = ({ isLoading, children }) => {
    return (
        <Stack spacing={4} py={2}>
            <div className='sekelton-comments'>
                <SkeletonCircle size="12" />
                <Skeleton height="50px" w="80%" />
            </div>
            <div className='sekelton-comments'>
                <SkeletonCircle size="12" />
                <Skeleton height="50px" w="80%" />
            </div>
            <div className='sekelton-comments'>
                <SkeletonCircle size="12" />
                <Skeleton height="50px" w="80%" />
            </div>
            <div className='sekelton-comments'>
                <SkeletonCircle size="12" />
                <Skeleton height="50px" w="80%" />
            </div>
        </Stack>
    );
};

export default SkeletonComments;
