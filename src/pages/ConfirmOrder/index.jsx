import { useState } from "react";
import { api } from "../../api/api";
import { Radio, Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function ConfirmOrder(props) {
  const { product, user } = props;
  const [qty, setQty] = useState(1);

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const navigate = useNavigate();
  const [form, setForm] = useState({
    buyerId: user.name,
    shipppingAdress: `${product.sellerId.street}, ${product.sellerId.houseNumber}/${product.sellerId.apartmentNumber}, ${product.sellerId.neighborhood}.
    ${product.sellerId.city} - ${product.sellerId.state}`,
    receiveAdress: `${user.city} - ${user.state} / ${user.CEP}`,
    payment: "",
    productId: product._id,
    quantity: qty,
    totalPrice: product.price,
  });

  console.log(form);
  function handleQty(e) {
    if (e.target.value < 1) {
      return;
    } else if (e.target.value > product.quantity) {
      return;
    }
    setQty(e.target.value);
    const clone = { ...form };
    clone.totalPrice = e.target.value * product.price;
    setForm({ ...clone, [e.target.name]: e.target.value });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/order", { ...form });
      navigate("/orders");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="overflow-y-auto h-96 desktop:h-full">
      <div className="flex flex-wrap mb-4">
        <i className="w-full">Produto:</i>
        <span className="border-double border-4 border-gray-700 p-2 bg-blue-gray-50">
          {`${product.productName} - ID: ${product._id}`}
        </span>
      </div>
      <div className="mb-4">
        <i>Comprador:</i>
        <Input name="buyerId" value={form.buyerId} disabled />
      </div>
      <div className="mb-10">
        <i>Vendedor:</i>
        <Input name="sellerId" value={product.sellerId.name} disabled />
      </div>
      <div className="flex mb-16">
        <p className="w-1/6">Endereço de envio:</p>
        <span className="border-dashed border-2 border-gray-700 p-3 bg-blue-gray-50 w-3/6 flex justify-center">
          {`${product.sellerId.city} - ${product.sellerId.state} / ${product.sellerId.CEP}`}
        </span>
        <span className="text-5xl">➜</span>
        <p className="w-1/6">Endereço de recebimento:</p>
        <span className="border-dashed border-2 border-gray-700 p-3 bg-blue-gray-50 w-3/6 flex justify-center">
          {form.receiveAdress}
        </span>
      </div>

      <div className="flex place-content-evenly mb-10 w-full">
        <div>
          <u>Valor unitário:</u> {formatter.format(product.price)}
        </div>

        <div>
          <u>Quantidade:</u>{" "}
          <input
            name="quantity"
            type="number"
            value={qty}
            onChange={handleQty}
            className="border w-10"
            min="1"
            max={product.quantity}
            required
          />
        </div>

        <div>
          <u>Valor total:</u>{" "}
          <span className="text-green-600 font-bold">
            {formatter.format(form.totalPrice)}
          </span>
        </div>
      </div>
      <div className="mb-4">
        <u>Metodo de pagamento:</u>
        <Radio
          id="PIX"
          name="payment"
          label="PIX"
          onChange={handleChange}
          value={"PIX"}
        />
        <Radio
          id="CREDIT"
          name="payment"
          label="Crédito"
          onChange={handleChange}
          value={"CREDIT"}
        />
        <Radio
          id="VISA"
          name="payment"
          label="À vista"
          onChange={handleChange}
          value={"VISA"}
        />
        <Radio
          id="CASH PAYMENT"
          name="payment"
          label="Boleto"
          onChange={handleChange}
          value={"CASH PAYMENT"}
        />

        <hr className="w-full"></hr>
        <div className="grid p-2 justify-items-end">
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
