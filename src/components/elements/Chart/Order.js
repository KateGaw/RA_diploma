/*eslint-disable array-callback-return*/

import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import { getItemsArray, clearStorage } from "./localStorage";
import Preloader from "../Preloader";

const Order = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [sendOrder, setSendOrder] = useState(false);
  const chartItems = getItemsArray();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [result, setResult] = useState(null);
  const [orderFinish, setOrderFinish] = useState(false);

  useEffect(() => {
    if (chartItems.length > 0 && phone !== "" && address !== "" && agreement) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [chartItems, phone, address, agreement]);

  useEffect(() => {
    if (sendOrder) {
      setIsLoading(true);
      setButtonDisabled(true);
      const output = {
        owner: {
          phone: phone,
          address: address,
        },
        items: [],
      };
      chartItems.map((i) => {
        const currentItem = {
          id: parseInt(i[0]),
          price: parseInt(i[3]),
          count: parseInt(i[4]),
        };
        output.items.push(currentItem);
      });

      api.getOrder(output, setResult);
      setIsLoading(false);
      setOrderFinish(true);
      clearForm();
      result === 204 && clearStorage();
    }
  }, [sendOrder, address, phone, chartItems, result]);

  const clearForm = () => {
    setPhone("");
    setAddress("");
    setAgreement(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSendOrder(true);
  };

  const handleModalClick = (event) => {
    event.target.closest(".orderModal").style.display = "none";
  };

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
          {orderFinish && (
            <div className="orderModal">
              {result === 204 ? (
                <p>Заказ успешно оформлен!</p>
              ) : (
                <p>Что то пошло не так, попробуйте еще раз позднее.</p>
              )}
              <button
                className="btn btn-outline-secondary modalButton"
                onClick={handleModalClick}
              >
                OK
              </button>
            </div>
          )}

          <form className="card-body">
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                className="form-control"
                id="phone"
                placeholder="Ваш телефон"
                maxLength="12"
                pattern="^\+7\d{3}\d{7}$"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input
                className="form-control"
                id="address"
                placeholder="Адрес доставки"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreement"
                checked={agreement}
                onChange={() =>
                  agreement ? setAgreement(false) : setAgreement(true)
                }
              />
              <label className="form-check-label" htmlFor="agreement">
                Согласен с правилами доставки
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-outline-secondary"
              onClick={handleSubmit}
              disabled={buttonDisabled}
            >
              Оформить
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Order;
