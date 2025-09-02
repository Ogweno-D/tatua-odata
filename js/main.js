import { fetchPeopleFromApi } from "./api.js";
import { TableColumn, ReusableTableFromApi } from "./table/table.js";
import {loadTableState, saveTableState} from "./utils/state.js";
import {loadData} from "./utils/loadData.js";
import {mockProductsData, peopleTestData} from "./utils/testData.js";
import {createPaginationControls, updatePaginationControls} from "./table/pagination.js";
import {showToast} from "./utils/toast.js";

document.addEventListener("DOMContentLoaded", () => {

    // TableConfig
    const peopleTableConfig = {
        columns: [
            TableColumn({ id: "UserName", caption: "Username", isFilterable: true, isSortable: true }),
            TableColumn({ id: "FirstName", caption: "First Name", isFilterable: true, isSortable: true }),
            TableColumn({ id: "LastName", caption: "Last Name", isFilterable: true, isSortable: true }),
            TableColumn({ id: "MiddleName", caption: "Middle Name", isFilterable: true }),
            TableColumn({ id: "Gender", caption: "Gender", isFilterable: true, enumValues: ["Male", "Female"] }),
            TableColumn({ id: "Age", caption: "Age", isFilterable: true, isSortable: false })
        ]
    };
    const tableId ="peopleTable";

    async function initPeopleTable() {
        let queryParams = loadTableState(tableId) || {
            page: 1,
            pageSize: 5,
            sort: null,
            filter: {}
        };

        const peopleTable = new ReusableTableFromApi(
            tableId,
            { data: [], totalCount: 0, queryParams },
            peopleTableConfig
        );
        peopleTable.tableElement.classList.add("table-default","people-theme");

        peopleTable.queryParams = queryParams;

        async function reloadTable() {
            const result = await loadData(queryParams, fetchPeopleFromApi   , peopleTable.columns,peopleTable);

            peopleTable.data = result.data;
            peopleTable.totalCount = result.totalCount;
            // console.log(result);

            peopleTable.renderTable();

            updatePaginationControls(peopleTable);

            saveTableState(tableId, queryParams);
        }
        peopleTable.reloadTable = reloadTable;

        const paginationControls = createPaginationControls(peopleTable);
        peopleTable.tableElement.parentNode.appendChild(paginationControls);
        await reloadTable();
    }
    initPeopleTable().then(event => {
        showToast("Showing people table", "info");
    });


    // const peopleTable = new ReusableTableFromApi(
    //     "peopleTable", fetchPeopleFromApi, peopleTableConfig
    // );

    // const people2TableConfig = {
    //     columns: [
    //         TableColumn({ id: "UserName", caption: "Username", isFilterable: true, isSortable: true }),
    //         TableColumn({ id: "FirstName", caption: "First Name", isFilterable: true, isSortable: true }),
    //         TableColumn({ id: "LastName", caption: "Last Name", isFilterable: true, isSortable: true }),
    //         TableColumn({ id: "Gender", caption: "Gender", isFilterable: true, enumValues: ["Male", "Female"] }),
    //         TableColumn({ id: "Emails", caption: "Email", isFilterable: true, isSortable: true, hide: true })
    //     ]
    // };
    //
    // const peopleTable2 = new ReusableTableFromApi(
    //     "people2Table", fetchPeopleFromApi, people2TableConfig
    // );

    const productsTableConfig = {
        columns: [
            {
                id: "name",
                caption: "Product Name",
                isSortable: true,
                isFilterable: true
            },
            {
                id: "price",
                caption: "Price",
                isSortable: true,
                isFilterable: false
            },
            {
                id: "stock",
                caption: "Stock",
                isSortable: true,
                isFilterable: false
            }
        ],
        tableClass: "products-table",
        rowClass: "product-row"
    };

    async function initProductsTable() {
        const tableId = "products-table"; // unique ID
        let queryParams = loadTableState(tableId) || {
            page: 1,
            pageSize: 10,
            sort: null,
            filter: {}
        };

        const productsTable = new ReusableTableFromApi(
            tableId,
            { data: [], totalCount: 0, queryParams },
            productsTableConfig
        );

        productsTable.tableElement.classList.add("table-default","products-theme");
        productsTable.queryParams = queryParams;

        async function reloadTable() {
            const result = await loadData(queryParams, mockProductsData, productsTable.columns, productsTable);
            productsTable.data = result.data;
            productsTable.totalCount = result.totalCount;
            productsTable.renderTable();
            updatePaginationControls(productsTable);
            saveTableState(tableId, queryParams);
        }

        productsTable.reloadTable = reloadTable;
        const paginationControls = createPaginationControls(productsTable);
        productsTable.tableElement.parentNode.appendChild(paginationControls);
        await reloadTable();
    }

    initProductsTable();


});
