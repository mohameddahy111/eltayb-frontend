import React from 'react';
import { useParams } from 'react-router-dom';

const ProducteDetials = () => {

  const params = useParams();

  return (
    <div>
      ProducteDetials/{params.id}
    </div>
  );
}

export default ProducteDetials;
