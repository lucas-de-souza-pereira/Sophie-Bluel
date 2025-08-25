
import { initHome } from "./pages/home.js"
import { getToken } from "./utils/storage.js"

document.addEventListener("DOMContentLoaded", () => {
  
  const connected = !!getToken()

  initHome( connected);
});
