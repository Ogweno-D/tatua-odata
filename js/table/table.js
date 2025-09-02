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
    constructor(tableId, dataWrapper, tableConfig) {
        this.tableId = tableId;
        this.columns = tableConfig.columns;

        this.data = dataWrapper.data || [];
        this.totalCount = dataWrapper?.totalCount ?? this.data.length;

        // Query state
        this.queryParams = dataWrapper.queryParams || {};
        console.log(this.queryParams)
        // this.queryParams = {
        //     filter: {},
        //     sort: null,
        //     page: 1,
        //     pageSize: 20,
        // };

        this.totalCount = 0;
        this.data = [];
        this.tableElement = document.getElementById(this.tableId);


        // Load saved state
        // const savedState = loadTableState(this.tableId);
        // if (savedState) {
        //     this.queryParams = savedState;
        // }

        if (!this.tableElement) {
            console.warn(
                `[ReusableTableFromApi] Table element with id="${this.tableId}" not found yet. Retrying...`
            );
            this.retryFindTable();
        } else {
            this.initialize();
        }
    }

    retryFindTable(attempt = 1) {
        if (attempt > 10) {
            console.error(
                `[ReusableTableFromApi] Failed to find table with id="${this.tableId}" after 10 attempts.`
            );
            return;
        }

        setTimeout(() => {
            this.tableElement = document.getElementById(this.tableId);
            if (this.tableElement) {
                console.log(`[ReusableTableFromApi] Found table "${this.tableId}" after ${attempt} retries`);
                this.initialize();
            } else {
                this.retryFindTable(attempt + 1);
            }
        }, 100); // retry every 100ms
    }

    initialize() {
        renderTableControls(this);
    }

    renderTable() {
        if (!this.tableElement) {
            console.error(`[ReusableTableFromApi] Cannot render table — tableElement is null`);
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

                        if (column.onRendered) column.onRendered(td, row);

                        if (column.events) {
                            Object.entries(column.events).forEach(([selector, handler]) => {
                                td.querySelectorAll(selector).forEach(element =>
                                    element.addEventListener("click", event => handler(row, event))
                                );
                            });
                        }

                        tableRow.appendChild(td);
                    }
                });

                tbody.appendChild(tableRow);
            });
        } else {
            // Empty state
            const emptyRow = document.createElement("tr");
            const emptyCell = document.createElement("td");
            emptyCell.colSpan = this.columns.filter(c => !c.hide).length;
            emptyCell.textContent = "No records found.";
            emptyCell.style.textAlign = "center";
            emptyRow.appendChild(emptyCell);
            tbody.appendChild(emptyRow);
        }

        this.tableElement.appendChild(tbody);

        // Pagination controls
        if (this.switcher || this.paginationButton) {
            const paginationWrapper = document.createElement("div");
            paginationWrapper.className = "pagination-wrapper";

            if (this.switcher) paginationWrapper.appendChild(this.switcher)
            if (this.paginationButton) paginationWrapper.appendChild(this.paginationButton);
            // if (this.pageInfo) paginationWrapper.appendChild(this.pageInfo);
            // if (this.nextBtn) paginationWrapper.appendChild(this.nextBtn);

            this.tableElement.parentNode.appendChild(paginationWrapper);
        }
    }
}
