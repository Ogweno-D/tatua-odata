// ReusableTable.js
import {renderTableControls} from "./query.js";

/**
 * TableColumn factory function
 * Allows easy definition of table columns with default values.
 */
export function TableColumn(config) {
    const {
        id,
        caption = null,
        size = 100,
        align = "left",
        type = "text",
        isFilterable = false,
        isSortable = false,
        hide = false,
        render = null,
        onRendered = null,
        events = null,
        enumValues = null,
    } = config;

    return {
        id,
        caption: caption ?? id
            .toLowerCase()
            .split("_")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        size,
        align,
        type,
        isFilterable,
        isSortable,
        hide,
        render,
        onRendered,
        events,
        enumValues
    };
}

/**
 * ReusableTableFromApi
 * Dynamically renders a table and handles pagination, filtering, and sorting
 */
export class ReusableTableFromApi {
    constructor(tableId, fetchDataFn, tableConfig) {
        this.tableElement = document.getElementById(tableId);
        this.columns = tableConfig.columns;
        this.fetchDataFn = fetchDataFn;

        // Query state
        this.queryParams = {
            filter: {},
            sort: null,
            page: 1,
            pageSize: 5,
        };

        this.totalCount = 0;
        this.data = [];

        renderTableControls(this)
        // Load initial data
        this.loadData();
    }

    async loadData() {
        // Spinner
        const overlay = document.createElement("div");
        overlay.classList.add("table-loader-overlay");

        const spinner = document.createElement("div");
        spinner.classList.add("table-loader-spinner");

        overlay.appendChild(spinner);

        //Position overlay relative to the table container
        const parent = this.tableElement.parentNode;
        parent.style.position = "relative";
        parent.appendChild(overlay);

        try {
            const {data, totalCount} = await this.fetchDataFn(this.queryParams,this.columns);
            this.data = data;
            this.totalCount = totalCount;
            this.renderTable();

            // Pagination controls
            const maxPage = Math.ceil(this.totalCount / this.queryParams.pageSize);
            if (this.pageInfo) {
                this.pageInfo.textContent = `Page ${this.queryParams.page} of ${maxPage}`;
            }
            if (this.prevBtn) {
                this.prevBtn.disabled = this.queryParams.page === 1;
            }
            if (this.nextBtn) {
                this.nextBtn.disabled = this.queryParams.page >= maxPage;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            this.tableElement.innerHTML = `
              <tbody>
                <tr><td colspan="${this.columns.filter(c => !c.hide).length}" style="text-align:center; color:red;">
                    Failed to load data
                </td></tr>
            </tbody>
           `;
        } finally {
            overlay.remove();
        }
    }


    renderTable() {
        if (!this.tableElement) {
            console.error("No table element found");
            return;
        }

        this.tableElement.innerHTML = "";

        // Header
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        this.columns.forEach(column => {
            if (!column.hide) {
                const th = document.createElement("th");
                th.textContent = column.caption;
                th.style.width = column.size + "px";
                th.style.textAlign = column.align;
                headerRow.appendChild(th);
            }
        });

        thead.appendChild(headerRow);
        this.tableElement.appendChild(thead);

        // Body
        const tbody = document.createElement("tbody");

        if (this.data.length > 0) {
            this.data.forEach(row => {
                const tableRow = document.createElement("tr");

                this.columns.forEach(column => {
                    if (!column.hide) {
                        const td = document.createElement("td");
                        td.style.textAlign = column.align;

                        if (column.render) {
                            td.innerHTML = column.render(row);
                        } else {
                            const key = column.id ?? column.field;
                            td.textContent = row[key] ?? "-";
                        }

                        if (column.onRendered) {
                            column.onRendered(td, row);
                        }

                        if (column.events) {
                            Object.entries(column.events).forEach(([selector, handler]) => {
                                td.querySelectorAll(selector).forEach(element => {
                                    element.addEventListener("click", (event) => handler(row, event));
                                });
                            });
                        }

                        tableRow.appendChild(td);
                    }
                });

                tbody.appendChild(tableRow);
            });
        } else {
            // Empty state row
            const emptyRow = document.createElement("tr");
            const emptyCell = document.createElement("td");
            emptyCell.colSpan = this.columns.filter(c => !c.hide).length;
            emptyCell.textContent = "No records found.";
            emptyCell.style.textAlign = "center";
            emptyRow.appendChild(emptyCell);
            tbody.appendChild(emptyRow);
        }

        this.tableElement.appendChild(tbody);

        // Pagination wrapper and controls
        if(this.pageInfo || this.prevBtn || this.nextBtn){
            const paginationWrapper = document.createElement("div");
            paginationWrapper.className = "pagination-wrapper";

            if (this.prevBtn) paginationWrapper.appendChild(this.prevBtn);
            if (this.pageInfo) paginationWrapper.appendChild(this.pageInfo);
            if (this.nextBtn) paginationWrapper.appendChild(this.nextBtn);

            this.tableElement.parentNode.appendChild(paginationWrapper);
        }

    }

}
