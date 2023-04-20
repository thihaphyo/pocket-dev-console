import logo from "./logo.svg";
import "./App.css";
import {
  AxiosProvider,
  Request,
  Get,
  Delete,
  Head,
  Post,
  Put,
  Patch,
  withAxios,
} from "react-axios";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = async () => {
    // 👇 "message" stores input field value
    //setUpdated(message);
    setIsLoading(true);
    var ph = message.replace("0", "95");
    const url =
      "https://api.perxtech.io/v4/merchant_admin/user_accounts/search?";

    const response = await fetch(
      url +
        new URLSearchParams({
          phone: ph,
        }),
      {
        method: "GET",
        headers: new Headers({
          Authorization:
            "Bearer fc28be1c4e9d5427e2cec49784152013dd4a2283259164b0ad7ffcdf12d3e9cc",
        }),
      }
    );

    var data = await response.json();
    if (data.code == 40) {
      alert("User not found");
      setIsLoading(false);
      return;
    }

    var identifier = data.data.identifier;

    console.log(Date.now());

    const updateurl =
      "https://api.perxtech.io/v4/pos/user_accounts/update_user";

    var deleteReq = {
      identifier: identifier,
      state: "inactive",
      personal_properties: {
        phone: Date.now().toString(),
      },
    };

    const responseUpdate = await fetch(updateurl, {
      method: "PUT",
      body: JSON.stringify(deleteReq),
      headers: new Headers({
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization:
          "Bearer 940435ee551fbb0b213f3c2fe1add375c422dc173f3f780718c9d8dce29dde88",
      }),
    });

    console.log(responseUpdate.status);
    var data = await responseUpdate.json();
    if (data.code == 44 || responseUpdate.status != 200) {
      alert(data.message);
      setIsLoading(false);
      return;
    }

    alert("Success");
    setIsLoading(false);

    //console.log(deleteReq);
  };

  return (
    <div className="App">
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <label>
        Text input:{" "}
        <input
          type="text"
          id="message"
          name="message"
          onChange={handleChange}
          value={message}
        />
      </label>
      <hr />
      <button onClick={handleClick}>Delete From Pocket</button> */}
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Phonenumber
              </label>
              {/* <div class="text-sm">
                  <a
                    href="#"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
            </div>
            <div class="mt-2">
              <input
                type="number"
                id="message"
                name="message"
                onChange={handleChange}
                value={message}
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>

          <div>
            <button
              onClick={handleClick}
              disabled = {isLoading}
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
               {isLoading ? "Deleteting...." : "Delete From Pocket"}
               
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
