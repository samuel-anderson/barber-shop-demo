import { CartHeader } from "./cart-header.component";
import { CartContent } from "./cart-content.component";
import { CartContainer } from "./cart.styles";

export const Cart = ({ cartIndex, handleIconClick }) => {
  return (
    <CartContainer>
      <CartHeader cartIndex={cartIndex} expandHandler={handleIconClick} />
      <CartContent />
    </CartContainer>
  );
};
