import React from 'react';
import Customer from './Customer';
import OrderItem from './OrderItem';
import Address from './Address';
import AppConfiguration from './AppConfiguration';

export type ContextProps = {
   customer: Customer | null;
   shippingAddresses: Address[];
   loadShippingAddresses: () => void;
   working: boolean;
   logout: () => void;
   addItemToOrder: (item: OrderItem) => void;
   removeItemFromOrderByIndeces: (
      itemIndeces: number[],
      callback: () => void,
   ) => void;
   updateOrderItemWithDownloadUrl: (
      orderItemIndex: number,
      photoIndex: number,
      downloadUrl: string,
   ) => void;
   uploadAnyItemsNeeded: () => void;
   overallUploadPercent: number;
   startWorking: (message: string) => void;
   stopWorking: () => void;
   updateCustomer: (customer: Customer) => void;
   appConfiguration?: AppConfiguration;
};

const ApplicationContext = React.createContext<Partial<ContextProps>>({});

export default ApplicationContext;
