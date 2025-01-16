const allItems = [
    { title: 'Bag', description: '' },
    { title: 'Shirt', description: '' },
    { title: 'Scarf', description: '' },
  ];
 
  describe('handleFilter', () => {
    let searchTerm;
    let setFilteredProducts;
    let handleFilter;
 
    beforeEach(() => {
      searchTerm = '';
      setFilteredProducts = jest.fn();
 
      handleFilter = () => {
        if (!searchTerm) {
          setFilteredProducts(allItems);
          return;
        }
        const lowerSearch = searchTerm.toLowerCase();
 
        const filtered = allItems.filter((item) => {
          const titleMatch = item.title?.toLowerCase().includes(lowerSearch);
          return titleMatch;
        });
        setFilteredProducts(filtered);
      };
    });
 
    it('should return all items when searchTerm is empty', () => {
      searchTerm = '';
      handleFilter();
      expect(setFilteredProducts).toHaveBeenCalledWith(allItems);
    });
 
    it('should filter items based on title match', () => {
      searchTerm = 'Bag';
      handleFilter();
      expect(setFilteredProducts).toHaveBeenCalledWith([
        { title: 'Bag', description: '' },
      ]);
    });

 
    it('should be case insensitive', () => {
      searchTerm = 'baG';
      handleFilter();
      expect(setFilteredProducts).toHaveBeenCalledWith([
        { title: 'Bag', description: '' },
      ]);
    });
 
    it('should return an empty array when no match is found', () => {
      searchTerm = 'Pink';
      handleFilter();
      expect(setFilteredProducts).toHaveBeenCalledWith([]);
    });

  it('should not match items based on description', () => {
    searchTerm = 'bag for you';
    handleFilter();
    expect(setFilteredProducts).toHaveBeenCalledWith([]);
  });
});
