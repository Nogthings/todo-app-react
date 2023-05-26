import { useState, createRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Alert from "../components/Alert";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();

  const [errores, setErrores] = useState([]);
  const { login } = useAuth({
    middleware: "guest",
    url: "/",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    login(datos, setErrores);
  };

  return (
    <div className=" h-screen">
      <div className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
        <div className="w-full max-w-md mx-auto p-6">
          <img src="./vite.svg" className="mx-auto h-24" />
          <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Login
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Don&apost have account?
                  <Link
                    className="text-blue-600 decoration-2 hover:underline font-medium"
                    to="/auth/register"
                  >
                    {" "}
                    Signup Now
                  </Link>
                </p>
              </div>

              <div className="mt-5">

                {/* <!-- Form --> */}
                <form 
                  noValidate
                  onSubmit={handleSubmit}>
                  <div className="grid gap-y-4">
                  <div className="space-y-1">
                    {errores ? errores.map((error, i) => <Alert key={i}>{error}</Alert>) : null}
                    </div>
                    {/* <!-- Form Group --> */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <input
                          ref={emailRef}
                          type="email"
                          id="email"
                          name="email"
                          className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                          required
                          aria-describedby="email-error"
                        />
                      </div>
                    </div>
                    {/* <!-- End Form Group --> */}

                    {/* <!-- Form Group --> */}
                    <div>
                      <div className="flex justify-between items-center">
                        <label
                          htmlFor="password"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Password
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          ref={passwordRef}
                          type="password"
                          id="password"
                          name="password"
                          className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                          required
                          aria-describedby="password-error"
                        />
                      </div>
                    </div>
                    {/* <!-- End Form Group --> */}

                    <button
                      type="submit"
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    >
                      Login Now
                    </button>
                  </div>
                </form>
                {/* <!-- End Form --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
