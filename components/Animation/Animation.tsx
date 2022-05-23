import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';

export function Animation() {
  useEffect(() => {
    const fadingHeading = document.querySelectorAll('.fading');
    for (let a = 0; a < fadingHeading.length; a++) {
      const letters = fadingHeading[a].textContent?.split('');
      const content =
          letters &&
          letters.map((val) => {
            const delay = Math.floor(Math.random()*30000 + 1);
            return '<span style="animation-delay: ' + delay + 'ms">' + val + '</span>';
          });
      fadingHeading[a].innerHTML = ' ';
      if (content)
        for (let i = 0; i < content.length; i++) {
          fadingHeading[a].innerHTML += content[i];
        }
    }
  }, []);

  return (
      <Box pos={{ xl: 'absolute', lg: 'absolute', md: 'absolute' }} display={{ md: 'block', sm: 'none' }} w={{ xl: '50%', lg: '50%', md: '50%' }} zIndex='9' top='0' right='0'>
        <Box className='fading'>M M M M M M M M M M M</Box>
        <Box className='fading'>M M M M M M M M M M M M M M M M M M M M M M</Box>
        <Box className='fading'>M M M M M M M M M M M M M M</Box>
        <Box className='fading'>M M M M M M M M M M M</Box>
        <Box className='fading'>M M M M M M M</Box>
        <Box className='fading'>M M M M M M M M M M M M M M</Box>
        <Box className='fading'>M M M M M</Box>
        <Box className='fading'>M M M M</Box>
        <Box className='fading'>M M M M</Box>
        <Box className='fading'>M M M M M M M M M M M M</Box>
        <Box className='fading'>M M M M M M M M M M M M M M M M M M</Box>
        <Box className='fading'>M M M M M M M M M M M M</Box>
        <Box className='fading'>M M M M M M M M M M M M M M M M M</Box>
        <Box className='fading'>M M M M M M M M M M M M</Box>
      </Box>
  );
}