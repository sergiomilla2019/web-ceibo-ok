import React, { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import baseUrl from "../../utils/baseUrl";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import axios from "axios";

function Subscribe() {
  const { t } = useTranslation("common");
  const suscribiteNews = t("suscribiteNews");
  const suscribirme = t("suscribirme");

  // Form initial state
  const INITIAL_STATE = {
    name: "",
    email: "",
    number: "",
    subject: "",
    text: "",
  };
  const [contact, setContact] = useState(INITIAL_STATE);

  const alertContent = () => {
    MySwal.fire({
      title: "",
      text: "Suscripción realizada con éxito",
      icon: "success",
      timer: 3400,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };
  const alertError = () => {
    MySwal.fire({
      icon: "error",
      timer: 3000,
      text: "Algo salió mal!",
      footer: "Podes intentarlo más tarde, o comunicarte por otro medio",
    });
  };

  const handleChange = (e) => setContact(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/api/contact`;
      const formData = new FormData();
      formData.append("email", contact);
      formData.append(
        "subject",
        "Nuevo suscripto al newsletter desde la web de Ceibo"
      );
      formData.append("type", "newsletter");

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status == 200) {
        alertContent();
      }
      setContact("");
    } catch (error) {
      console.log(error);
      alertError();
    }
  };

  return (
    <div className="col-lg-12  col-sm-12 col-md-6" style={{marginTop: '3%', backgroundColor: '#888888'}}>
      <div className="single-footer-widget ml-4">
        <p style={{paddingLeft: '2%'}}>
          <b style={{color: '#FFF', fontWeight: '400'}}>{suscribiteNews}</b>
        </p>
        <form 
          onSubmit={handleSubmit} 
          style={{display: 'flex', flexDirection: 'row', gap: '3%', alignItems: 'center', justifyContent: 'center'}}
        >
          <div className="form-group col-lg-8 col-sm-12 mb-3">
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="form-control"
              value={contact.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-lg-3 col-sm-12 mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              {suscribirme}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Subscribe;
