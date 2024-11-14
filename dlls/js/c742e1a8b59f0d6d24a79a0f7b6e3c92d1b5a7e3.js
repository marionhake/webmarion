document.addEventListener("DOMContentLoaded", () => {
    const dllContainer = document.getElementById("dll-container");
    const searchInput = document.getElementById("search");
  

    function loadDlls(filter = "") {
      dllContainer.innerHTML = "";
      const filteredDlls = dllData.filter(dll =>
        dll.name.toLowerCase().includes(filter.toLowerCase())
      );
  
      filteredDlls.forEach(dll => {
        const dllItem = document.createElement("div");
        dllItem.classList.add("dll-item");
        dllItem.innerHTML = `
          <h3>${dll.name}</h3>
          <p>${dll.description}</p>
          <a href="${dll.link}" download>Download ${dll.filename}</a>
          <a href="${dll.page}">More Info</a>
        `;
        dllContainer.appendChild(dllItem);
      });
    }
  

    loadDlls();
  

    searchInput.addEventListener("input", (e) => {
      loadDlls(e.target.value);
    });
  });
  