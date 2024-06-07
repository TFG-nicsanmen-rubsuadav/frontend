import PropTypes from "prop-types";

export default function ConfigurationModal({ closeModal }) {
  return (
    <div className="bg-gray-label text-center justify-center items-center p-8 flex flex-col rounded-lg">
      <p>
        Lamentamos informar de que actualmente no puede configurar su
        información maualmente.
      </p>
      <p>
        Para realizar cualquier gestión sobre su cuenta o la de su negocio, le
        rogamos que contacte con nosotros mediante <br></br> correo electrónico:
        contacto@goodmenu.com
      </p>
      <p>Muchas gracias :)</p>
      <div>
        <button
          onClick={closeModal}
          className="text-white mt-5 px-3 py-1 bg-green-button hover:bg-hover-button hover:text-white active:bg-active-button rounded-lg"
        >
          ¡De acuerdo!
        </button>
      </div>
    </div>
  );
}

ConfigurationModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
