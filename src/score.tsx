import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "./store/store";

export const Score: React.FC = () => {

  const userState = useSelector(
    (state: RootState) => state.balance
  );

  return (
      <div className="scorePanel">
        <div>
        {userState.balance}
        </div>        
        
      </div>
  );
}
  
  