browser.ignoreSynchronization = true;
describe('wiggle pdp & wishlist pages', function() {   
    it('should add product to wishlist', function() {
      browser.get('https://www.wiggle.co.uk/littlelife-toddler-animal-daysack/');

      const colourDropdown = $$('.bem-sku-selector__option-prompt').first();
      const colourOption = $$('.bem-sku-selector__option-group-item').first();
      const addToWishlist = $('.bem-sku-selector__wishlist:not(.hide)');

      colourDropdown.click();
      colourOption.click();
      addToWishlist.click();
      const itemPrice = $('.js-unit-price').getText();

      const savedToWishlistLink = $('.bem-sku-selector__wishlist--added:not(.hide) .bem-sku-selector__btn-inner');
      browser.wait(ExpectedConditions.presenceOf(savedToWishlistLink), 3000);
      expect(savedToWishlistLink.getText()).toEqual('Saved to wishlist');
      
      $('#wishlistLink').click();
      const itemPriceWishlist = $('.qa-wishlist-item-price').getText();
      expect(itemPriceWishlist).toEqual(itemPrice);

      $('a.bem-wishlist__box-delete').click();
      const deleteItemLink = $('.bem-wishlist__box-item-delete');
      browser.wait(ExpectedConditions.presenceOf(deleteItemLink), 3000);
      deleteItemLink.click();
      
      const wishlistHeader = $('.bem-wishlist__box-title');
      expect(wishlistHeader.getText()).toEqual('Wishlist is empty');
    });
  });