import React from "react";
import Link from "next/link";
import Cart from "@/components/cart/cart";
import style from "./dashboard.module.css";

interface CartData {
  src: string;
  headerText: string;
  cartText: string;
  Link: string;
}

interface ContinueLearningProps {
  cartData: CartData[];
}

const ContinueLearning: React.FC<ContinueLearningProps> = ({ cartData }) => {
  return (
    <div className={style.ContiueLearningContainer}>
      <h1 className={style.ContiueLearningH1}>Continue your journey of learning</h1>
      <div className={style.subContainer}>
        <div className={style.CartContainer}>
          {cartData.map((cartItem, index) => (
            <div className={style.cart} key={index}>
              <Link href={cartItem.Link} className="link">
                <Cart
                  src={cartItem.src}
                  header_Text={cartItem.headerText}
                  cartText={cartItem.cartText}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinueLearning;
