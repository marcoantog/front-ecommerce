import { Link } from "react-router-dom";
import githubLogo from "../../assets/github.png";
import linkedinLogo from "../../assets/linkedin.png";
import bernardoImage from "../../assets/bernardo.jpg";
import marcoImage from "../../assets/marco.jpg";

function Footer() {
  return (
    <footer className="mt-9 ">
      Produzido por{" "}
      <Link
        className="font-bold text-blue-gray-300 hover:text-blue-gray-700"
        to="https://www.linkedin.com/in/bernardo-bossi-87433a211/"
      >
        Bernardo
      </Link>{" "}
      <img
        src={bernardoImage}
        alt="Bernardo's profile"
        className="h-9 w-9 inline-block rounded-full "
      />
      e{" "}
      <Link
        className="font-bold text-blue-gray-300 hover:text-blue-gray-700"
        to="https://www.linkedin.com/in/marco-antonio-oliveira-gon%C3%A7alves-314515123/"
      >
        Marco
      </Link>{" "}
      <img
        src={marcoImage}
        alt="Marco's profile"
        className="h-9 w-9 inline-block rounded-full "
      />
      © - Ironhack 2023 - Turma 94 WDFT
      <div className="mt-3 flex  justify-center items-center gap-14 pr-24 ml-4  ">
        <div className="flex flex-col gap-2">
          <Link
            to="https://github.com/bebossi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={githubLogo}
              alt="Github Logo"
              className="h-8 w-8 inline-block rounded-full"
            />
          </Link>
          <Link
            to="https://www.linkedin.com/in/bernardo-bossi-87433a211/"
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <img
              src={linkedinLogo}
              alt="Linkedin Logo"
              className="h-8 w-8 inline-block"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            to="https://github.com/marcoantog"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4"
          >
            <img
              src={githubLogo}
              alt="Github Logo"
              className="h-8 w-8 inline-block rounded-full"
            />
          </Link>
          <Link
            to="https://www.linkedin.com/in/marco-antonio-oliveira-gon%C3%A7alves-314515123/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4"
          >
            <img
              src={linkedinLogo}
              alt="Linkedin Logo"
              className="h-8 w-8 inline-block"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
