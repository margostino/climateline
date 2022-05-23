import { useEffect, useState } from "react";

function useOrder() {
  const [order, setOrder] = useState(
    typeof window !== "undefined" ? localStorage.order : "descending"
  );
  const orderProperty = order === "descending" ? "ascending" : "descending";

  // useEffect(() => {
  //   const root = window.document.documentElement;    
  //   root.classList.remove(orderProperty);
  //   root.classList.add(order);

  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("order", order);
  //   }
  // }, [order]);

  return [orderProperty, setOrder];
}

export default useOrder;