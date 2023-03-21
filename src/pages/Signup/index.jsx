import { useState } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { Card, Input, Button, Typography, Checkbox } from "@material-tailwind/react";
import { toast } from "react-hot-toast";

export function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    CEP: "",
    state: "",
    city: "",
    street: "",
    houseNumber: "",
    apartmentNumber: "",
    neighborhood: "",
  });

  const [img, setImg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/uploadImage", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if(form.password === form.confirmPassword) {
        const imgURL = await handleUpload();
        await api.post("/user/signup", { ...form, image: imgURL });
  
        navigate("/login");
      }
      

      toast.error("Passwords don't match.")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card color="transparent" shadow={false} className="mt-7">
        <Typography variant="h4" color="blue-gray">
          Register
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <div className="flex justify-center">
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <div className="flex items-center justify-center w-full">
                {/* aqui começa o input da imagem --------------------------------------------------- */}
                <label
                  htmlFor="formImg"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click here to upload</span>{" "}
                      your image.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF
                    </p>
                  </div>
                  <input
                    type="file"
                    className="file:hidden text-sm w-48"
                    size="lg"
                    id="formImg"
                    onChange={handleImage}
                  />
                </label>
              </div>

              {/* aqui termina o input da imagem --------------------------------------------------- */}

              <Input
                size="lg"
                label="User"
                id="formUser"
                name="userName"
                value={form.userName}
                required
                onChange={handleChange}
              />
              <Input
                size="lg"
                label="Complete name"
                name="name"
                value={form.name}
                required
                onChange={handleChange}
              />
              <Input
                size="lg"
                label="Street"
                name="street"
                value={form.street}
                type="text"
                required
                onChange={handleChange}
              />
              <Input
                size="lg"
                label="Number"
                name="houseNumber"
                value={form.houseNumber}
                type="number"
                required
                onChange={handleChange}
              />
              <Input
                size="lg"
                label="Adress Line 1"
                name="apartmentNumber"
                value={form.apartmentNumber}
                type="text"
                onChange={handleChange}
              />
              <Input
                size="lg"
                label="City"
                name="city"
                value={form.city}
                type="text"
                onChange={handleChange}
              />

              <Input
                size="lg"
                label="neighborhood"
                name="neighborhood"
                value={form.neighborhood}
                type="text"
                onChange={handleChange}
              />

              <Input
                size="lg"
                label="State/Province"
                name="state"
                value={form.state}
                type="text"
                maxLength="2"
                onChange={handleChange}
              />

              <Input
                size="lg"
                label="Zip/Postal Code"
                name="CEP"
                value={form.CEP}
                type="text"
                required
                maxLength="9"
                onChange={handleChange}
              />

              <Input
                size="lg"
                label="Email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
              />
              <Input
                id="formPassword"
                label="Password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                size="lg"
              />
              <Input
                size="lg"
                label="Confirm Password"
                id="formConfirmPassword"
                type="password"
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
              />
           <Checkbox
          label={
            (
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <Link className="font-medium transition-colors hover:text-blue-500">
                  &nbsp;Terms and Conditions
                </Link>
              </Typography>
            )
          }
          containerProps={{ className: "-ml-2.5" }}
        />
            </div>

            <Button className="mt-6" fullWidth type="submit">
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign In
              </Link>
            </Typography>
          </form>
        </div>
      </Card>

      
    </>
  );
}
