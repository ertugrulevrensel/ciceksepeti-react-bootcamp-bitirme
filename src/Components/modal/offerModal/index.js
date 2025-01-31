import React from "react";
import "../Modal.scss";
import exit from "../../../Assets/x.webp";
import fail from "../../../Assets/fail.webp";
import succes from "../../../Assets/succes.webp";
import { connect } from "react-redux";
import { giveOffer, getGivenOfferList } from "../../../actions";
import { useParams } from "react-router-dom";
function OfferModal(props) {
  let { id } = useParams();
  //close offer modal when click X button
  function toggleModal() {
    document.getElementById("offerModal").classList.toggle("d-none");
    document.getElementById("failSign").classList.add("d-none");
    document.getElementById("succes").classList.add("d-none");
    document.getElementById("failOffer").classList.add("d-none");
  }
  function offerProduct() {
    if (document.getElementById("customOffer").value > 0) {
      //if custom offer value >0, go offer function with custom offer value
      let offerCustom = Number(document.getElementById("customOffer").value);
      goOffer(offerCustom);
    } else {
      //if custom offer value <=0, go offer function with radio input value
      var element = document.getElementsByName("offerPercent");
      for (let i = 0; i < element.length; i++) {
        if (element[i].checked) {
          let offer = element[i].value * props.product.price;
          goOffer(offer);
        }
      }
    }
  }
  function goOffer(price) {
    //call offer function
    giveOffer(id, props.token, price).then((response) => {
      if (response.status === 200 || response.status === 201) {
        //if response is success, show success notification and close modal
        props.getGivenOfferList(props.token);
        props.setStatus("Teklif Verildi.");
        document.getElementById("succesBuys")?.classList.remove("d-none");
        setTimeout(() => {
          document.getElementById("succesBuys")?.classList.add("d-none");
        }, 3000);
        document.getElementById("offerModal")?.classList.add("d-none");
        document.getElementById("failSignBuy")?.classList.add("d-none");
        document.getElementById("offeredValuediv")?.classList.remove("d-none");
      } else if (response.status === 401) {
        //if response is fail, show fail notification
        props.setStatus("Lütfen Giriş Yapınız.");
        document.getElementById("failSignBuy")?.classList.remove("d-none");
        setTimeout(() => {
          document.getElementById("failSignBuy")?.classList.add("d-none");
        }, 3000);
        document.getElementById("succesBuys")?.classList.add("d-none");
      } else {
        //if response is fail, show fail notification
        props.setStatus("Teklif Yapılamadı.");
        document.getElementById("failSignBuy")?.classList.remove("d-none");
        setTimeout(() => {
          document.getElementById("failSignBuy")?.classList.add("d-none");
        }, 3000);
        document.getElementById("succesBuys")?.classList.add("d-none");
      }
    });
  }

  return (
    <div
      id="offerModal"
      className="d-flex d-none p-fixed align-center justify-center bg4b9ce2O7"
    >
      <div className=" flex-d-col modals align-center justify-center whiteBackground border-r-8">
        <div className="d-flex">
          <p>Teklif Ver</p>
          <button onClick={() => toggleModal()} className="exit">
            <img src={exit} alt=""></img>
          </button>
        </div>

        <div className="bgf0f8ff full-w d-flex border-r-8 align-center">
          <img
            className="border-r-8"
            src={props.product?.imageUrl}
            alt=""
          ></img>
          <p className="titleFont">{props.product?.title}</p>
          <p className="buyPrice">{props.product?.price} TL</p>
        </div>
        <div className="offerArea full-w">
          <div className="d-flex full-w align-center border-r-8">
            <input
              id="percent20"
              type="radio"
              name="offerPercent"
              value="0.2"
            ></input>
            <label className="full-w" htmlFor="percent20">
              %20'si Kadar Teklif Ver
            </label>
          </div>
          <div className="d-flex full-w align-center border-r-8">
            <input
              id="percent30"
              type="radio"
              name="offerPercent"
              value="0.3"
            ></input>
            <label className="full-w" htmlFor="percent30">
              %30'u Kadar Teklif Ver
            </label>
          </div>
          <div className="d-flex full-w align-center border-r-8">
            <input
              id="percent40"
              type="radio"
              name="offerPercent"
              value="0.4"
            ></input>
            <label className="full-w" htmlFor="percent40">
              %40'ı Kadar Teklif Ver
            </label>
          </div>
          <div className="d-flex full-w align-center border-r-8 customOfferDiv">
            <input
              id="customOffer"
              className="full-w"
              type="number"
              name="offerPercent"
              placeholder="Teklif Belirle"
            ></input>
          </div>
        </div>
        <div className="d-flex full-w justify-center ">
          <button
            onClick={() => offerProduct()}
            className="confirmButton border-r-8 bg4b9ce2"
          >
            Onayla
          </button>
        </div>
      </div>
      <div
        id="failSign"
        className="d-flex d-none p-fixed failSignModal border-r-8 align-center justify-center"
      >
        <img src={fail} alt=""></img>
        <p>Giriş Yapmadınız.</p>
      </div>
      <div
        id="failOffer"
        className="d-flex d-none p-fixed failSignModal border-r-8 align-center justify-center"
      >
        <img src={fail} alt=""></img>
        <p>Teklif Yapılamadı.</p>
      </div>
      <div
        id="succes"
        className="d-flex d-none p-fixed succesBuyModal border-r-8 align-center justify-center"
      >
        <img src={succes} alt=""></img>
        <p>Teklif Verildi.</p>
      </div>
    </div>
  );
}
const mapStatetoProps = (state) => ({
  token: state.token,
});
export default connect(mapStatetoProps, { getGivenOfferList })(OfferModal);
