import React from "react";
import style from "./cart.module.css";
import Image from "next/image";

interface CartProps {
  src: string;
  header_Text: string;
  cartText: String;
}

const Cart: React.FC<CartProps> = ({ src, header_Text, cartText }) => {
  return (
    <div className={style.container}>
      <div className={style.cartIcon}>
        <Image src={src} alt="Cart Icon" width={80} height={80} />
      </div>
      <div className={style.textWreapper}>
        <div className={style.cartHeader}>
          <h1>{header_Text}</h1>
        </div>
        <div className={style.cartText}>
          <p>{cartText}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
