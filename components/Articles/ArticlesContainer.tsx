import { TabList, TabPanel, Tabs } from '@chakra-ui/tabs';
import { Flex, Tab, TabPanels } from '@chakra-ui/react';

import { Articles } from './index';
import { MyArticles } from './MyArticles';


export function ArticlesContainer() {
  return (
      <Flex direction='column' alignItems='center' w={{ xl: '67%', lg: '85%', md: '100%', sm: '100%' }}>
        <Tabs w='100%'>
          <TabList>
            <Tab _focus={{ boxShadow: 'none' }}>All</Tab>
            <Tab _focus={{ boxShadow: 'none' }}>My publications</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p='0'>
              <Articles/>
            </TabPanel>
            <TabPanel p='0'>
              <MyArticles/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
  );
}
