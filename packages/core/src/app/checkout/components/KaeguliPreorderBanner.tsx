import React from 'react';

import { useCheckout } from '@bigcommerce/checkout/contexts';

/**
 * Shows a preorder shipping notice when the cart contains preorder items.
 * Detects preorders by checking the cart line items for availability or
 * name patterns.
 */
const PREORDER_NAME_PATTERN = /pre[\s-]?order/i;

function hasPreorderItems(lineItems: Array<{ name?: string; availability?: string }>): boolean {
  return lineItems.some(
    (item) =>
      item.availability === 'preorder' ||
      (item.name && PREORDER_NAME_PATTERN.test(item.name))
  );
}

export const KaeguliPreorderBanner: React.FC = () => {
  const {
    selectedState: { cart },
  } = useCheckout(({ data }) => ({
    cart: data.getCart(),
  }));

  const physicalItems = cart?.lineItems?.physicalItems ?? [];
  const digitalItems = cart?.lineItems?.digitalItems ?? [];
  const allItems = [...physicalItems, ...digitalItems];

  if (!hasPreorderItems(allItems)) {
    return null;
  }

  return (
    <div className="kaeguli-preorder-banner">
      <p className="kaeguli-preorder-banner__title">
        IMPORTANT PREORDER NOTE:
        <span className="kaeguli-preorder-banner__text">
          {' '}If preordered items are purchased with in-stock items, all will ship together when the preordered product reaches our warehouse.
        </span>
      </p>
      <p className="kaeguli-preorder-banner__text">
        To receive in-stock items before preordered items are available, purchase in a separate order.
      </p>
      <p className="kaeguli-preorder-banner__title">
        PREORDER SHIPPING:
        <span className="kaeguli-preorder-banner__text">
          {' '}Preorder item shipping is estimated and will be recalculated once product is available.
        </span>
      </p>
    </div>
  );
};

export default KaeguliPreorderBanner;
