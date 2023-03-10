import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-9">
      Produzido por{" "}
      <Link
        className="font-bold text-blue-gray-300 hover:text-blue-gray-700"
        to="https://www.linkedin.com/in/bernardo-bossi-87433a211/"
      >
        Bernardo
      </Link>{" "}
      e{" "}
      <Link
        className="font-bold text-blue-gray-300 hover:text-blue-gray-700"
        to="https://www.linkedin.com/in/marco-antonio-oliveira-gon%C3%A7alves-314515123/"
      >
        Marco
      </Link>{" "}
      © - Ironhack 2023 - Turma 94 WDFT
    </footer>
  );
}

export default Footer;
