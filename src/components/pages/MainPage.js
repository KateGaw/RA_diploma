import React from "react";
import TopSales from "../elements/TopSales";
import CatalogMenu from "../elements/Catalog/CatalogMenu";

const MainPage = () => {
  return (
    <>
      <TopSales />
      <CatalogMenu page="main" />
    </>
  );
};

export default MainPage;
