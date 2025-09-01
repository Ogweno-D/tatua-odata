import {showToast} from "../utils/toast.js";

export function createFilterSection(tableInstance) {
    // Create overlay (if it doesn't already exist)
    let overlay = document.getElementById("modal-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "modal-overlay";
        overlay.classList.add("modal-overlay");
        document.body.appendChild(overlay);
    }

    // Modal container
    const modal = document.createElement("div");
    modal.classList.add("modal","filter-modal");

    // Header
    const header = document.createElement("div");
    header.classList.add("modal-header");
    header.textContent = "Filters";

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("modal-close-btn");
    closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    closeBtn.addEventListener("click", () => (overlay.style.display = "none"));
    header.appendChild(closeBtn);

    // Filters container
    const filtersList = document.createElement("div");
    filtersList.classList.add("filters-list");

    const addFilterBtn = document.createElement("button")
    addFilterBtn.classList.add("modal-add-btn");
    addFilterBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Filter`;

    function createFilterRow() {
        const row = document.createElement("div");
        row.classList.add("modal-row");

        const columnSelect = document.createElement("select");
        columnSelect.innerHTML = `<option value="" disabled selected>Select Column</option>`;
        tableInstance.columns.filter(c => c.isFilterable).forEach(column => {
            const option = document.createElement("option");
            option.value = column.id;
            option.textContent = column.caption;
            columnSelect.appendChild(option);
        });

        const operatorSelect = document.createElement("select");
        operatorSelect.innerHTML = `
            <option value="" disabled selected>Relation</option>
            <option value="eq">Equals</option>
            <option value="ne">Not Equal</option>
            <option value="contains">Contains</option>
            <option value="startswith">Starts With</option>
            <option value="endswith">Ends With</option>
        `;

        let valueInput = document.createElement("input");
        valueInput.type = "text";
        valueInput.placeholder = "Enter value";

        columnSelect.addEventListener("change", () => {
            const selectedColumn = tableInstance.columns.find(c => c.id === columnSelect.value);
            if (!selectedColumn) return;

            if (selectedColumn.enumValues) {
                const valueSelect = document.createElement("select");
                valueSelect.innerHTML = `<option value="">Select Value</option>`;
                selectedColumn.enumValues.forEach(val => {
                    const option = document.createElement("option");
                    option.value = val;
                    option.textContent = val;
                    valueSelect.appendChild(option);
                });
                valueInput.replaceWith(valueSelect);
                valueInput = valueSelect;
            } else {
                const newInput = document.createElement("input");
                newInput.type = "text";
                newInput.placeholder = "Enter value";
                valueInput.replaceWith(newInput);
                valueInput = newInput;
            }
        });

        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener("click", () => row.remove());

        row.append(columnSelect, operatorSelect, valueInput, removeBtn);
        return row;
    }

    filtersList.appendChild(createFilterRow());
    addFilterBtn.addEventListener("click", () => filtersList.appendChild(createFilterRow()));

    const footer = document.createElement("div");
    footer.classList.add("modal-footer");

    const applyFilterBtn = document.createElement("button");
    applyFilterBtn.classList.add("modal-footer-btn","apply-btn");
    applyFilterBtn.textContent = "Apply Filters";
    applyFilterBtn.addEventListener("click", () => {
        tableInstance.queryParams.filter = {};
        filtersList.querySelectorAll(".modal-row").forEach(row => {
            const [columnSelect, operatorSelect, valueInput] = row.querySelectorAll("select, input");
            if (columnSelect.value && operatorSelect.value && valueInput.value) {
                tableInstance.queryParams.filter[columnSelect.value] = {
                    operator: operatorSelect.value,
                    value: valueInput.value
                };
            }
                // console.log("Filters being applied:", tableInstance.queryParams.filter);
        });
        tableInstance.queryParams.page = 1;
        tableInstance.loadData();
        overlay.style.display = "none";
        showToast("Filters applied successfully.", "success");

    });

    const resetFilterBtn = document.createElement("button");
    resetFilterBtn.classList.add("modal-footer-btn");
    resetFilterBtn.textContent = "Reset Filters";
    resetFilterBtn.addEventListener("click", () => {
        tableInstance.queryParams.filter = {};
        filtersList.innerHTML = "";
        filtersList.appendChild(createFilterRow());
        tableInstance.queryParams.page = 1;
        tableInstance.loadData();
        showToast("Filters reset successfully.", "success");

    });

    footer.append(resetFilterBtn, applyFilterBtn);

    modal.append(header, filtersList, addFilterBtn, footer);
    overlay.innerHTML = ""; // clear old content
    overlay.appendChild(modal);

    // CLICK-OUTSIDE TO CLOSE
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
        }
    });

    return overlay;
}
