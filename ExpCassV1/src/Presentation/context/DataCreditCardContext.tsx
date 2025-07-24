import React, { createContext, useContext, useState, ReactNode } from 'react';
interface CreditCardDetails {
  brand: string;
  lastFourDigits: string;
  // Agrega otras propiedades según sea necesario
}
interface DataCreditCardContextProps {
  cardDetails: CreditCardDetails | null;
  updateCardDetails: (newCardDetails: CreditCardDetails) => void;
}

export const DataCreditCardContext = createContext<DataCreditCardContextProps | undefined>(undefined);

interface DataCreditCardProviderProps {
  children: ReactNode;
}

export const DataCreditCardProvider = ({ children }: DataCreditCardProviderProps) => {
  const [cardDetails, setCardDetails] = useState<any | null>(null);

  const updateCardDetails = (newCardDetails: any) => {
    console.log('Updating card details in context:', newCardDetails);

    setCardDetails(newCardDetails);
  };

  return (
    <DataCreditCardContext.Provider value={{ cardDetails, updateCardDetails }}>
      {children}
    </DataCreditCardContext.Provider>
  );
};