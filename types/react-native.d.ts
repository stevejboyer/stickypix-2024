export * from 'react-native';

import { ReactNode, ReactText, ReactElement } from 'react';

declare module 'react-native' {
   interface ViewProps {
      // We don't want to use ReactNode
      // because we want to exclude String being a child
      children?:
         | ReactElement<any | null | boolean | undefined>
         | ReactElement<any | null | boolean | undefined>[]
         | boolean
         | null
         | undefined;
   }

   interface TextProps {
      children?: ReactText | ReactElement<TextProps>[];
   }
}
