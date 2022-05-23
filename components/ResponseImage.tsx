import { Box, BoxProps, chakra } from '@chakra-ui/react';
import Image, { ImageProps } from 'next/image';
import { ForwardedRef, forwardRef } from 'react';

const ChakraNextUnwrappedImage = chakra(Image, {
  shouldForwardProp: (prop) =>
      ['width', 'height', 'src', 'alt', 'layout'].includes(prop),
});

export const ResponseImage = forwardRef((props: ImageProps & BoxProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { src, alt, width, height, layout, objectFit, ...rest } = props;
  return (
      <Box pos='relative' cursor='pointer' {...rest}>
        <a ref={ref}>
          <ChakraNextUnwrappedImage
              layout={layout}
              width={width}
              height={height}
              objectFit={objectFit}
              src={src}
              alt={alt}
          />
        </a>
      </Box>
  );
});
ResponseImage.displayName = 'ResponseImage';
