import axios from "axios";

export default {
  getCatalogItems: (id, setCatalog, setIsLoading) => {
    return axios
      .get(
        id === 0
          ? "http://localhost:7070/api/items"
          : `http://localhost:7070/api/items?categoryId=${id}`
      )
      .then((response) => {
        setCatalog(response.data);
        setIsLoading(false);
      });
  },
  getMoreItems: (
    id,
    itemsCounter,
    setButtonVisile,
    setButtonClick,
    setNewItems,
    setItemsCounter
  ) => {
    return axios
      .get(
        id === 0
          ? `http://localhost:7070/api/items?offset=${itemsCounter}`
          : `http://localhost:7070/api/items?categoryId=${id}&offset=${itemsCounter}`
      )
      .then((response) => {
        if (response.data.length === 0) {
          //если данных нет, то скрываем кнопку
          setButtonVisile(false);
          setButtonClick(false);
        } else {
          setButtonClick(false);
          setNewItems(response.data);
          setItemsCounter((i) => i + 6);
        }
      });
  },
  getSearchResult: (id, inputValue, setFindItems) => {
    return axios
      .get(
        id === 0
          ? `http://localhost:7070/api/items?q=${inputValue}`
          : `http://localhost:7070/api/items?categoryId=${id}?q=${inputValue}`
      )
      .then((response) => {
        setFindItems(response.data);
      });
  },
  getCatalogCategories: (setCategories, setIsLoading) => {
    return axios
      .get("http://localhost:7070/api/categories")
      .then((response) => {
        setCategories(response.data);
        setIsLoading(false);
      });
  },
  getTopSales: (setSales, setIsLoading) => {
    return axios.get("http://localhost:7070/api/top-sales").then((response) => {
      setSales(response.data);
      setIsLoading(false);
    });
  },
};
