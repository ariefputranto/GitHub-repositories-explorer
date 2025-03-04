"use client";

import SearchForm from "@/components/pages/home/SearchForm";
import SearchResult from "@/components/pages/home/SearchResult";
import { Bounce, ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className="max-w-lg w-full mx-auto py-6 px-3">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <SearchForm />
      <SearchResult />
    </div>
  );
}
