
import { initHome } from "./pages/home.js";
import { connectedHome } from "./pages/home_connected.js";

document.addEventListener("DOMContentLoaded", () => {
  initHome();

  const token = localStorage.getItem("token")
  if (token){
    connectedHome()
  }
});
