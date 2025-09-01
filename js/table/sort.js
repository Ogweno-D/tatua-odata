import{showToast} from "../utils/toast.js";

export function createSortSection(tableInstance) {
    // Create overlay (if it doesn't already exist)
    let overlay = document.getElementById("sort-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "modal-overlay";
        overlay.classList.add("modal-overlay");
        document.body.appendChild(overlay);
    }

    // Modal container
    const modal = document.createElement("div");
    modal.classList.add("modal","sort-modal");

    // Header
    const header = document.createElement("div");
    header.classList.add("modal-header");
    header.textContent = "Sort Options";

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("modal-close-btn");
    closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    closeBtn.addEventListener("click", () => (overlay.style.display = "none"));
    header.appendChild(closeBtn);

    // Sorts container
    const sortsList = document.createElement("div");
    sortsList.classList.add("sorts-list");

    function createSortRow() {
        const row = document.createElement("div");
        row.classList.add("modal-row");

        const columnSelect = document.createElement("select");
        columnSelect.innerHTML = `<option value="">Select Column</option>`;
        tableInstance.columns.filter(c => c.isSortable).forEach(column => {
            const option = document.createElement("option");
            option.value = column.id;
            option.textContent = column.caption;
            columnSelect.appendChild(option);
        });

        const directionSelect = document.createElement("select");
        directionSelect.innerHTML = `
            <option value="" selected disabled>Select direction</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        `;

        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        removeBtn.classList.add("remove-btn");

        removeBtn.addEventListener("click", () => row.remove());

        row.append(columnSelect, directionSelect, removeBtn);
        return row;
    }

    sortsList.appendChild(createSortRow());

    const addSortBtn = document.createElement("button");
    addSortBtn.classList.add("modal-add-btn");
    addSortBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Sort`;
    addSortBtn.addEventListener("click", () => sortsList.appendChild(createSortRow()));

    const footer = document.createElement("div");
    footer.classList.add("modal-footer");

    const applySortBtn = document.createElement("button");
    applySortBtn.classList.add("modal-footer-btn","apply-btn");
    applySortBtn.textContent = "Apply Sorts";
    applySortBtn.addEventListener("click", () => {
        const sortParts = [];
        sortsList.querySelectorAll(".sort-row").forEach(row => {
            const [colSelect, dirSelect] = row.querySelectorAll("select");
            if (colSelect.value) sortParts.push(`${colSelect.value} ${dirSelect.value}`);
        });

        tableInstance.queryParams.sort = sortParts.join(",");
        tableInstance.queryParams.page = 1;
        tableInstance.loadData();
        overlay.style.display = "none";
        showToast("Sort applied successfully.", "success");

    });

    const resetSortBtn = document.createElement("button");
    resetSortBtn.classList.add("modal-footer-btn");
    resetSortBtn.textContent = "Reset Sort";
    resetSortBtn.addEventListener("click", () => {
        tableInstance.queryParams.sort = null;
        sortsList.innerHTML = "";
        sortsList.appendChild(createSortRow());
        tableInstance.queryParams.page = 1;
        tableInstance.loadData();
        showToast("Sort reset successfully.", "success");
    });

    footer.append(resetSortBtn, applySortBtn);

    modal.append(header, sortsList, addSortBtn, footer);
    overlay.innerHTML = "";
    overlay.appendChild(modal);

    // click outside to close
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
        }
    });

    return overlay;
}
