import axios from "axios";

const path = "http://localhost:7070/api/";

export default {
  getCatalogItems: (id, setCatalog, setIsLoading) => {
    return axios
      .get(id === 0 ? `${path}items` : `${path}items?categoryId=${id}`)
      .then((response) => {
        setCatalog(response.data);
        setIsLoading(false);
      });
  },
  getMoreItems: (
    id,
    itemsCounter,
    setButtonVisible,
    setButtonClick,
    setNewItems,
    setItemsCounter
  ) => {
    return axios
      .get(
        id === 0
          ? `${path}items?offset=${itemsCounter}`
          : `${path}items?categoryId=${id}&offset=${itemsCounter}`
      )
      .then((response) => {
        if (response.data.length === 0) {
          //если данных нет, то скрываем кнопку
          setButtonVisible(false);
          setButtonClick(false);
        } else {
          setButtonClick(false);
          setNewItems(response.data);
          setItemsCounter((i) => i + 6);
        }
      });
  },
  getMoreItemsFilter: (
    id,
    itemsCounter,
    setButtonVisible,
    setButtonClick,
    setNewItems,
    setItemsCounter,
    searchText
  ) => {
    return axios
      .get(
        id === 0
          ? `${path}items?offset=${itemsCounter}&q=${searchText}`
          : `${path}items?categoryId=${id}&offset=${itemsCounter}&q=${searchText}`
      )
      .then((response) => {
        console.log(response);
        if (response.data.length === 0) {
          //если данных нет, то скрываем кнопку
          setButtonVisible(false);
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
          ? `${path}items?q=${inputValue}`
          : `${path}items?categoryId=${id}&q=${inputValue}`
      )
      .then((response) => {
        setFindItems(response.data);
      });
  },
  getCatalogCategories: (setCategories, setIsLoading) => {
    return axios.get(`${path}categories`).then((response) => {
      setCategories(response.data);
      setIsLoading(false);
    });
  },
  getTopSales: (setSales, setIsLoading) => {
    return axios.get(`${path}top-sales`).then((response) => {
      setSales(response.data);
      setIsLoading(false);
    });
  },
  getItemAllInfo: (itemId, setItem, setIsLoading) => {
    return axios.get(`${path}items/${itemId}`).then((response) => {
      setItem(response.data);
      setIsLoading(false);
    });
  },
};
