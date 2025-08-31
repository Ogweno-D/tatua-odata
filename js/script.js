// async function fetchDataFromApi({filter,sort,page,pageSize}){
//     // let url =
//     //     `http://services.odata.org/TripPinRESTierService/People?$count=true&$top=${pageSize}&$skip=${(page - 1) * pageSize}`;
//     //
//     // if(sort){
//     //     url += `&$top=${sort}`;
//     // }
//     //
//     // // Filtering
//     // const filterParams = [];
//     // Object.entries(filter).forEach(([key,value]) => {
//     //     if(value) {
//     //         filterParams.push(`contains(${key},'${value}')`);
//     //     }
//     // })
//     // if(filterParams.length > 0){
//     //     url += `&$filter=${filterParams.join(" and ")}`;
//     // }
//     let url = `http://services.odata.org/TripPinRESTierService/People?$top=10`;
//
//     const response = await fetch(url);
//     const data = await response.json();
//     //console.log(data)
//     return {
//         data: data,
//         totalCount: data["@odata.count"]
//     }
// }
//
// const tickets = [
//     {
//         ticket_id: 101,
//         fullName: "Alice Johnson",
//         email: "alice@example.com",
//         subject: "Unable to log in",
//         message: "Hi, I'm having trouble logging into my account since yesterday.",
//         contact: "email",
//         date: "2025-08-15",
//         status: "Open"
//     },
//     {
//         ticket_id: 102,
//         fullName: "Bob Smith",
//         email: "bob@example.com",
//         subject: "Billing issue",
//         message: "I was charged twice for the same invoice. Please help.",
//         contact: "phone",
//         date: "2025-08-20",
//         status: "Pending"
//     },
//     {
//         ticket_id: 103,
//         fullName: "Charlie Davis",
//         email: "charlie@example.com",
//         subject: "Feature request",
//         message: "Could you add dark mode support to the app?",
//         contact: "email",
//         date: "2025-08-28",
//         status: "Closed"
//     },
//     {
//         ticket_id: 104,
//         fullName: "Diana Miller",
//         email: "diana@example.com",
//         subject: "Bug report",
//         message: "When I click 'Save', nothing happens.",
//         contact: "phone",
//         date: "2025-08-30",
//         status: "Open"
//     }
// ];
// const submissions = [
//     { fullName:"Alice", email:"alice@mail.com", phone:"123", subject:"Web Development", message:"Hi", contact:"Email", attachment:"-" },
//     { fullName:"Bob", email:"bob@mail.com", phone:"456", subject:"App Development", message:"Hello", contact:"Phone", attachment:"-" },
//     { fullName:"Charlie", email:"charlie@mail.com", phone:"789", subject:"Other", message:"Hey", contact:"Email", attachment:"-" }
// ];
// const data1 = [
//     {
//         name : "Alice",
//         age: 25,
//         country: "USA"
//     },
//     {
//         name : "Alice",
//         age: 25,
//         country: "USA"
//     },
//     {
//         name : "Alice",
//         age: 25,
//         country: "USA"
//     }
// ];
// const data2 = [
//     {
//         position : "Head",
//         department: "HR",
//         country: "USA"
//     },
//     {
//         position : "Head",
//         department: "HR",
//         country: "USA"
//     },
//     {
//         position : "Head",
//         department: "HR",
//         country: "USA"
//     }
// ];
//
//
// const table1Config ={
//     columns: [
//         {
//             caption: "Name",
//             field: "name"
//         },
//         {
//             caption: "Age",
//             field: "age"
//         },
//         {
//             caption: "Country",
//             field: "country"
//         }
//     ],
// }
// const table2Config ={
//     columns: [
//         {
//             caption: "Position",
//             field: "position"
//         },
//         {
//             caption: "Department",
//             field: "department"
//         },
//         {
//             caption: "Country",
//             field: "country"
//         }
//     ],
// }
//
// // Column Definition
// const TableColumn = ({
//     id,
//     caption = null,
//     size = 100,
//     align = "left",
//     type = "text",
//     isFilterable = false,
//     isSortable = false,
//     hide = false,
//     render = null,
//     onRendered = null,
//     events = null,
//
// }) =>({
//     id,
//     caption : caption ?? id
//         .toLowerCase()
//         .split("_")
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" "),
//     size,
//     align,
//     type,
//     isFilterable,
//     isSortable,
//     hide,
//     render,
//     onRendered,
//     events,
// })
//
// const table3Columns = [
//     TableColumn({
//         id: "fullName",
//         caption: "Full Name"
//     }),
//     TableColumn({
//         id: "email",
//         caption: "Email"
//     }),
//     TableColumn({
//         id: "phone",
//         caption: "Phone"
//     }),
//     TableColumn({
//         id: "subject",
//         caption: "Subject"
//     }),
//     TableColumn({
//         id: "message",
//         caption: "Message"
//     }),
//     TableColumn({
//         id: "contact",
//         caption: "Preferred Contact",
//         hide: true
//     }),
//     TableColumn({
//         id: "attachment",
//         caption: "Attachment",
//         hide: true
//     })
// ];
// const table3Config = {
//     columns: table3Columns,
// };
//
// const table4Columns = [
//     TableColumn({
//         id: "ticket_id",
//         field:"id",
//         type: "number",
//         isFilterable: false,
//         size: 70,
//     }),
//     TableColumn({
//         id: "raised_by",
//         isFilterable: true,
//         type: "string",
//         size: 250,
//         filterBy: "email",
//         render: (data) => `
//         <div class="">
//             <div class="user-name">${data?.fullName}</div>
//             <div class="user-email">${data?.email}</div>
//         </div>
//     `
//     }),
//     TableColumn({
//         id: "ticket_details",
//         isFilterable: true,
//         type: "string",
//         size: 250,
//         filterBy: "subject",
//         render: (data) => `
//         <div class="">
//             <div class="message-title">${data?.subject}</div>
//             <div class="user-message">${data?.message}</div>
//         </div>
//     `
//     }),
//     TableColumn({
//         id: "date",
//         caption: "Date Created",
//         isFilterable: false,
//         type: "date",
//         size: 150,
//     }),
//     TableColumn({
//         id: "status",
//         isSortable: true,
//         type: "date",
//         size: 80,
//         render: (data) => `
//         <span class="status ${data.status.toLowerCase()}">${data.status}</span>
//     `
//     }),
//     TableColumn({
//         id: "actions",
//         caption: "Actions",
//         isSortable: false,
//         isFilterable: false,
//         size: 150,
//         render: (row) => `
//         <div class="actions">
//           <i class="fa-solid fa-info-circle info" data-id="${row.id}"></i>
//           <i class="fa-solid fa-download download" data-id="${row.id}"></i>
//           <i class="fa-solid fa-phone call" data-id="${row.id}"></i>
//           <i class="fa-regular fa-envelope message" data-id="${row.id}"></i>
//           <i class="fa-regular fa-pen-to-square edit" data-id="${row.id}"></i>
//           <i class="fa-solid fa-trash-alt delete" data-id="${row.id}"></i>
//         </div>
//     `,
//         onRendered: (td, row) => {
//             const phoneIcon = td.querySelector(".call");
//             const emailIcon = td.querySelector(".message");
//
//             if (row.contact === "phone") {
//                 emailIcon.classList.add("disabled", "tooltip");
//                 emailIcon.setAttribute("data-tooltip", "Preferred contact is phone, email disabled");
//             } else if (row.contact === "email") {
//                 phoneIcon.classList.add("disabled", "tooltip");
//                 phoneIcon.setAttribute("data-tooltip", "Preferred contact is email, phone disabled");
//             }
//         },
//         events: {
//             ".info": (row, event) => console.log("View info for", row.id),
//             ".call": (row, event) => console.log("Calling", row.phone),
//             ".message": (row, event) => console.log("Send message to", row.email)
//         }
//     })
// ];
// const table4Config = {
//     columns: table4Columns,
// }
//
// const peopleTableConfig = {
//     columns: [
//         TableColumn({
//             id: "UserName",
//             caption: "Username",
//             isFilterable: true,
//             isSortable: true
//         }),
//         TableColumn({
//             id: "FirstName",
//             caption: "First Name",
//             isFilterable: true,
//             isSortable: true
//         }),
//         TableColumn({
//             id: "LastName",
//             caption: "Last Name",
//             isFilterable: true,
//             isSortable: true
//         }),
//         TableColumn({
//             id: "MiddleName",
//             caption: "Middle Name",
//             isFilterable: true,
//         }),
//         TableColumn({
//             id: "Gender",
//             caption: "Gender",
//             isFilterable: true,
//             enumValues: ["Male", "Female", ]
//         }),
//         TableColumn({
//             id: "Age",
//             caption: "Age",
//             isFilterable: true,
//             isSortable: true
//         })
//     ]
// };
//
// class ReusableTable {
//     constructor(tableId, data, tableConfig) {
//         this.tableElement = document.getElementById(tableId);
//         this.columns = tableConfig.columns;
//         this.originalData = data;
//         this.filteredData = [...data];
//         this.sortedColumn = null;
//         this.sortDirection = "asc";
//         this.currentPage = 1;
//         this.pageSize = 5; // Default rows per page
//
//         this.renderControls();
//         this.render();
//     }
//
//     renderControls() {
//         if (!this.tableElement) return;
//
//         const controlsContainer = document.createElement("div");
//         controlsContainer.classList.add("table-controls");
//
//         // Filter inputs
//         this.columns.forEach(column => {
//             if (column.isFilterable) {
//                 const input = document.createElement("input");
//                 input.type = "text";
//                 input.placeholder = `Filter by ${column.caption}`;
//                 input.addEventListener("input", (e) => {
//                     this.applyFilters();
//                 });
//                 column.filterInput = input;
//                 controlsContainer.appendChild(input);
//             }
//             if (column.isSortable) {
//                 const button = document.createElement("button");
//                 button.textContent = `Sort ${column.caption}`;
//                 button.addEventListener("click", () => {
//                     if (this.sortedColumn === column.id) {
//                         this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
//                     } else {
//                         this.sortedColumn = column.id;
//                         this.sortDirection = "asc";
//                     }
//                     this.applySorting();
//                 });
//                 controlsContainer.appendChild(button);
//             }
//         });
//
//         // Pagination controls
//         const pagination = document.createElement("div");
//         pagination.classList.add("pagination-controls");
//         this.prevBtn = document.createElement("button");
//         this.nextBtn = document.createElement("button");
//         this.pageInfo = document.createElement("span");
//
//         this.prevBtn.textContent = "Prev";
//         this.nextBtn.textContent = "Next";
//
//         this.prevBtn.addEventListener("click", () => {
//             if (this.currentPage > 1) {
//                 this.currentPage--;
//                 this.render();
//             }
//         });
//         this.nextBtn.addEventListener("click", () => {
//             if (this.currentPage < Math.ceil(this.filteredData.length / this.pageSize)) {
//                 this.currentPage++;
//                 this.render();
//             }
//         });
//
//         pagination.appendChild(this.prevBtn);
//         pagination.appendChild(this.pageInfo);
//         pagination.appendChild(this.nextBtn);
//         controlsContainer.appendChild(pagination);
//
//         // Insert controls above table
//         this.tableElement.parentNode.insertBefore(controlsContainer, this.tableElement);
//     }
//
//     applyFilters() {
//         this.filteredData = this.originalData.filter(row => {
//             return this.columns.every(column => {
//                 if (column.isFilterable && column.filterInput) {
//                     const filterValue = column.filterInput.value.toLowerCase();
//                     const key = column.field ?? column.id;
//                     return String(row[key] ?? "").toLowerCase().includes(filterValue);
//                 }
//                 return true;
//             });
//         });
//         this.currentPage = 1;
//         this.render();
//     }
//
//     applySorting() {
//         if (!this.sortedColumn) return;
//         this.filteredData.sort((a, b) => {
//             const key = this.sortedColumn;
//             const valA = String(a[key] ?? "").toLowerCase();
//             const valB = String(b[key] ?? "").toLowerCase();
//
//             if (valA < valB) return this.sortDirection === "asc" ? -1 : 1;
//             if (valA > valB) return this.sortDirection === "asc" ? 1 : -1;
//             return 0;
//         });
//         this.render();
//     }
//
//     render() {
//         if (!this.tableElement) {
//             console.error("No table element found");
//             return;
//         }
//
//         this.tableElement.innerHTML = "";
//
//         // Header
//         const thead = document.createElement("thead");
//         const headerRow = document.createElement("tr");
//         this.columns.forEach(column => {
//             if (!column.hide) {
//                 const th = document.createElement("th");
//                 th.textContent = column.caption;
//                 headerRow.appendChild(th);
//             }
//         });
//         thead.appendChild(headerRow);
//         this.tableElement.appendChild(thead);
//
//         // Body (with pagination)
//         const tbody = document.createElement("tbody");
//         const start = (this.currentPage - 1) * this.pageSize;
//         const paginatedData = this.filteredData.slice(start, start + this.pageSize);
//
//         paginatedData.forEach(row => {
//             const tableRow = document.createElement("tr");
//
//             this.columns.forEach(column => {
//                 if (!column.hide) {
//                     const td = document.createElement("td");
//
//                     if (column.render) {
//                         td.innerHTML = column.render(row);
//                     } else {
//                         const key = column.field ?? column.id;
//                         td.textContent = row[key] ?? "-";
//                     }
//
//                     if (column.onRendered) {
//                         column.onRendered(td, row);
//                     }
//
//                     if (column.events) {
//                         Object.entries(column.events).forEach(([selector, handler]) => {
//                             td.querySelectorAll(selector).forEach(element => {
//                                 element.addEventListener("click", (event) => handler(row, event));
//                             });
//                         });
//                     }
//                     tableRow.appendChild(td);
//                 }
//             });
//
//             tbody.appendChild(tableRow);
//         });
//
//         this.tableElement.appendChild(tbody);
//
//         // Update pagination info
//         this.pageInfo.textContent = `Page ${this.currentPage} of ${Math.ceil(this.filteredData.length / this.pageSize)}`;
//     }
// }
//
// const proxy = "https://api.allorigins.win/raw?url=";
// const baseUrl = "https://services.odata.org/TripPinRESTierService/People";
//
// async function fetchPeopleFromApi(queryParams) {
//     const { filter, sort, page, pageSize } = queryParams;
//
//     let url = baseUrl + `?$count=true`;
//     url += `&$top=${pageSize}`;
//     url += `&$skip=${(page - 1) * pageSize}`;
//
//     // ---------- Build $filter ----------
//     if (filter && Object.keys(filter).length > 0) {
//         const filterParts = [];
//
//         for (const [field, { operator, value }] of Object.entries(filter)) {
//             if (value === undefined || value === null || value === "") continue;
//
//             let formattedValue = value;
//
//             // TYPE AWARE FORMATTING:
//             const column = table4Columns.find(c => c.id === field);
//             if (column) {
//                 if (column.enumValues) {
//                     // Enums are NOT quoted in OData
//                     formattedValue = `${column.enumValues.includes(value) ? value : value}`;
//                 } else if (column.type === "number") {
//                     formattedValue = Number(value);
//                 } else if (column.type === "boolean") {
//                     formattedValue = value === true || value === "true";
//                 } else if (column.type === "date") {
//                     formattedValue = `${value}`; // ensure ISO format
//                     formattedValue = `cast(${field}, Edm.DateTimeOffset) eq ${formattedValue}`;
//                 } else {
//                     // Default = string => wrap with quotes
//                     formattedValue = `'${value}'`;
//                 }
//             } else {
//                 // No column info, treat as string
//                 formattedValue = `'${value}'`;
//             }
//
//             if (["contains", "startswith", "endswith"].includes(operator)) {
//                 filterParts.push(`${operator}(${field},${formattedValue})`);
//             } else {
//                 filterParts.push(`${field} ${operator} ${formattedValue}`);
//             }
//         }
//
//         if (filterParts.length > 0) {
//             url += `&$filter=${encodeURIComponent(filterParts.join(" and "))}`;
//         }
//     }
//
//     // ---------- Build $orderby ----------
//     if (sort) {
//         url += `&$orderby=${encodeURIComponent(sort)}`;
//     }
//
//     console.log("Fetching:", url);
//
//     const response = await fetch( proxy+ encodeURIComponent(url));
//     if (!response.ok) throw new Error(`HTTP error ${response.status}`);
//
//     const json = await response.json();
//     return {
//         data: json.value,
//         totalCount: json["@odata.count"]
//     };
// }
//
// function renderTableControls(tableInstance) {
//     if (!tableInstance.tableElement) return;
//
//     const controlsContainer = document.createElement("div");
//     controlsContainer.classList.add("table-controls");
//
//     // 🔹 Create sections with smaller helper functions
//     const filterContainer = createFilterSection(tableInstance);
//     const sortContainer = createSortSection(tableInstance);
//     const paginationContainer = createPaginationControls(tableInstance);
//
//     controlsContainer.append(filterContainer, sortContainer, paginationContainer);
//
//     // Attach to DOM
//     tableInstance.tableElement.parentNode.insertBefore(controlsContainer, tableInstance.tableElement);
// }
// function createFilterSection(tableInstance) {
//     const filterContainer = document.createElement("div");
//     filterContainer.classList.add("filter-container");
//
//     const filtersList = document.createElement("div");
//     filtersList.classList.add("filters-list");
//
//     const addFilterBtn = document.createElement("button");
//     addFilterBtn.textContent = "➕ Add Filter";
//
//     function createFilterRow() {
//         const row = document.createElement("div");
//         row.classList.add("filter-row");
//
//         // Column Select
//         const columnSelect = document.createElement("select");
//         columnSelect.innerHTML = `<option value="" disabled selected>Select Column</option>`;
//         tableInstance.columns.filter(c => c.isFilterable).forEach(column => {
//             const option = document.createElement("option");
//             option.value = column.id;
//             option.textContent = column.caption;
//             columnSelect.appendChild(option);
//         });
//
//         // Operator Select
//         const operatorSelect = document.createElement("select");
//         operatorSelect.innerHTML = `
//         <option value="" disabled selected>Relation</option>
//         <option value="eq">Equals</option>
//         <option value="ne">Not Equal</option>
//         <option value="contains">Contains</option>
//         <option value="startswith">Starts With</option>
//         <option value="endswith">Ends With</option>
//     `;
//
//         let valueInput = document.createElement("input");
//         valueInput.type = "text";
//         valueInput.placeholder = "Enter value";
//
//         columnSelect.addEventListener("change", () => {
//             const selectedColumn = tableInstance.columns.find(c => c.id === columnSelect.value);
//             if (!selectedColumn) return;
//
//             if (selectedColumn.enumValues) {
//                 const valueSelect = document.createElement("select");
//                 valueSelect.innerHTML = `<option value="">Select Value</option>`;
//                 selectedColumn.enumValues.forEach(val => {
//                     const option = document.createElement("option");
//                     option.value = val;
//                     option.textContent = val;
//                     valueSelect.appendChild(option);
//                 });
//                 valueInput.replaceWith(valueSelect);
//                 valueInput = valueSelect;
//             } else {
//                 const newInput = document.createElement("input");
//                 newInput.type = "text";
//                 newInput.placeholder = "Enter value";
//                 valueInput.replaceWith(newInput);
//                 valueInput = newInput;
//             }
//         });
//
//         // Remove filter button
//         const removeBtn = document.createElement("button");
//         removeBtn.textContent = "❌";
//         removeBtn.addEventListener("click", () => row.remove());
//
//         row.append(columnSelect, operatorSelect, valueInput, removeBtn);
//         return row;
//     }
//
//     // Start with one filter row
//     filtersList.appendChild(createFilterRow());
//     addFilterBtn.addEventListener("click", () => filtersList.appendChild(createFilterRow()));
//
//     // Apply filters
//     const applyFilterBtn = document.createElement("button");
//     applyFilterBtn.textContent = "Apply Filters";
//     applyFilterBtn.addEventListener("click", () => {
//         tableInstance.queryParams.filter = {}; // reset
//         filtersList.querySelectorAll(".filter-row").forEach(row => {
//             const [columnSelect, operatorSelect, valueInput] = row.querySelectorAll("select, input");
//             if (columnSelect.value && operatorSelect.value && valueInput.value) {
//                 tableInstance.queryParams.filter[columnSelect.value] = {
//                     operator: operatorSelect.value,
//                     value: valueInput.value
//                 };
//             }
//         });
//         tableInstance.queryParams.page = 1;
//         tableInstance.loadData();
//     });
//     const resetFilterBtn = document.createElement("button");
//     resetFilterBtn.textContent = "🧹 Reset Filters";
//     resetFilterBtn.addEventListener("click", () => {
//         tableInstance.queryParams.filter = {};
//         filtersList.innerHTML = "";
//         filtersList.appendChild(createFilterRow());
//         tableInstance.queryParams.page = 1;
//         tableInstance.loadData();
//     });
//
//     filterContainer.append(filtersList, addFilterBtn, applyFilterBtn);
//     return filterContainer;
// }
// function createSortSection(tableInstance) {
//     const sortContainer = document.createElement("div");
//     sortContainer.classList.add("sort-container");
//
//     const sortsList = document.createElement("div");
//     sortsList.classList.add("sorts-list");
//
//     function createSortRow() {
//         const row = document.createElement("div");
//         row.classList.add("sort-row");
//
//         const columnSelect = document.createElement("select");
//         columnSelect.innerHTML = `<option value="">Select Column</option>`;
//         tableInstance.columns.filter(c => c.isSortable).forEach(column => {
//             const option = document.createElement("option");
//             option.value = column.id;
//             option.textContent = column.caption;
//             columnSelect.appendChild(option);
//         });
//
//         const directionSelect = document.createElement("select");
//         directionSelect.innerHTML = `
//         <option value="asc">Ascending</option>
//         <option value="desc">Descending</option>
//     `;
//
//         const removeBtn = document.createElement("button");
//         removeBtn.textContent = "❌";
//         removeBtn.addEventListener("click", () => row.remove());
//
//         row.append(columnSelect, directionSelect, removeBtn);
//         return row;
//     }
//
//     // Start with one sort row
//     sortsList.appendChild(createSortRow());
//
//     const addSortBtn = document.createElement("button");
//     addSortBtn.textContent = "➕ Add Sort";
//     addSortBtn.addEventListener("click", () => sortsList.appendChild(createSortRow()));
//
//     const applySortBtn = document.createElement("button");
//     applySortBtn.textContent = "Apply Sorts";
//     applySortBtn.addEventListener("click", () => {
//         const sortParts = [];
//         sortsList.querySelectorAll(".sort-row").forEach(row => {
//             const [colSelect, dirSelect] = row.querySelectorAll("select");
//             if (colSelect.value) sortParts.push(`${colSelect.value} ${dirSelect.value}`);
//         });
//
//         tableInstance.queryParams.sort = sortParts.join(",");
//         tableInstance.queryParams.page = 1;
//         tableInstance.loadData();
//     });
//     const resetSortBtn = document.createElement("button");
//     resetSortBtn.textContent = "🧹 Reset Sort";
//     resetSortBtn.addEventListener("click", () => {
//         tableInstance.queryParams.sort = null;
//         sortColumnSelect.value = "";
//         sortDirectionSelect.value = "asc";
//         tableInstance.queryParams.page = 1;
//         tableInstance.loadData();
//     });
//
//     sortContainer.append(sortsList, addSortBtn, applySortBtn);
//     return sortContainer;
// }
// function createPaginationControls(tableInstance) {
//     const pagination = document.createElement("div");
//     pagination.classList.add("pagination-controls");
//
//     const prevBtn = document.createElement("button");
//     prevBtn.textContent = "Previous";
//
//     const pageInfo = document.createElement("span");
//
//     const nextBtn = document.createElement("button");
//     nextBtn.textContent = "Next";
//
//     prevBtn.addEventListener("click", () => {
//         if (tableInstance.queryParams.page > 1) {
//             tableInstance.queryParams.page--;
//             tableInstance.loadData();
//         }
//     });
//
//     nextBtn.addEventListener("click", () => {
//         const maxPage = Math.ceil(tableInstance.totalCount / tableInstance.queryParams.pageSize);
//         if (tableInstance.queryParams.page < maxPage) {
//             tableInstance.queryParams.page++;
//             tableInstance.loadData();
//         }
//     });
//
//     pagination.append(prevBtn, pageInfo, nextBtn);
//
//     // Attach to instance for later updates
//     tableInstance.pageInfo = pageInfo;
//     tableInstance.prevBtn = prevBtn;
//     tableInstance.nextBtn = nextBtn;
//
//     return pagination;
// }
//
// // function renderTableControls(tableInstance) {
// //     if (!tableInstance.tableElement) return;
// //
// //     const controlsContainer = document.createElement("div");
// //     controlsContainer.classList.add("table-controls");
// //
// //     // ---------- FILTER SECTION ----------
// //     const filterContainer = document.createElement("div");
// //     filterContainer.classList.add("filter-container");
// //
// //     const filtersList = document.createElement("div");
// //     filtersList.classList.add("filters-list");
// //
// //     const addFilterBtn = document.createElement("button");
// //     addFilterBtn.textContent = "➕ Add Filter";
// //
// //     function createFilterRow() {
// //         const row = document.createElement("div");
// //         row.classList.add("filter-row");
// //
// //         const columnSelect = document.createElement("select");
// //         columnSelect.innerHTML = `<option value="" disabled selected>Select Column</option>`;
// //         tableInstance.columns.filter(c => c.isFilterable).forEach(column => {
// //             const option = document.createElement("option");
// //             option.value = column.id;
// //             option.textContent = column.caption;
// //             columnSelect.appendChild(option);
// //         });
// //
// //         const operatorSelect = document.createElement("select");
// //         operatorSelect.innerHTML = `
// //         <option value="" disabled selected>Relation</option>
// //         <option value="eq">Equals</option>
// //         <option value="ne">Not Equal</option>
// //         <option value="contains">Contains</option>
// //         <option value="startswith">Starts With</option>
// //         <option value="endswith">Ends With</option>
// //     `;
// //
// //         let valueInput = document.createElement("input");
// //         valueInput.type = "text";
// //         valueInput.placeholder = "Enter value";
// //
// //         columnSelect.addEventListener("change", () => {
// //             const selectedColumn = tableInstance.columns.find(c => c.id === columnSelect.value);
// //             if (!selectedColumn) return;
// //
// //             if (selectedColumn.enumValues) {
// //                 const valueSelect = document.createElement("select");
// //                 valueSelect.innerHTML = `<option value="">Select Value</option>`;
// //                 selectedColumn.enumValues.forEach(val => {
// //                     const option = document.createElement("option");
// //                     option.value = val;
// //                     option.textContent = val;
// //                     valueSelect.appendChild(option);
// //                 });
// //                 valueInput.replaceWith(valueSelect);
// //                 valueInput = valueSelect;
// //             } else {
// //                 const newInput = document.createElement("input");
// //                 newInput.type = "text";
// //                 newInput.placeholder = "Enter value";
// //                 valueInput.replaceWith(newInput);
// //                 valueInput = newInput;
// //             }
// //         });
// //
// //         const removeBtn = document.createElement("button");
// //         removeBtn.textContent = "❌";
// //         removeBtn.addEventListener("click", () => row.remove());
// //
// //         row.append(columnSelect, operatorSelect, valueInput, removeBtn);
// //         return row;
// //     }
// //
// //     addFilterBtn.addEventListener("click", () => {
// //         filtersList.appendChild(createFilterRow());
// //     });
// //
// //     // Start with one filter row by default
// //     filtersList.appendChild(createFilterRow());
// //
// //     const applyFilterBtn = document.createElement("button");
// //     applyFilterBtn.textContent = "Apply Filters";
// //     applyFilterBtn.addEventListener("click", () => {
// //         tableInstance.queryParams.filter = {}; // reset filters
// //
// //         filtersList.querySelectorAll(".filter-row").forEach(row => {
// //             const [columnSelect, operatorSelect, valueInput] = row.querySelectorAll("select, input");
// //             if (columnSelect.value && operatorSelect.value && valueInput.value) {
// //                 tableInstance.queryParams.filter[columnSelect.value] = {
// //                     operator: operatorSelect.value,
// //                     value: valueInput.value
// //                 };
// //             }
// //         });
// //
// //         tableInstance.queryParams.page = 1;
// //         tableInstance.loadData();
// //     });
// //
// //     filterContainer.append(filtersList, addFilterBtn, applyFilterBtn);
// //     controlsContainer.appendChild(filterContainer);
// //
// //     // ---------- SORT SECTION ----------
// //     const sortContainer = document.createElement("div");
// //     sortContainer.classList.add("sort-container");
// //
// //     const sortColumnSelect = document.createElement("select");
// //     sortColumnSelect.innerHTML = `<option value="">Select Column</option>`;
// //     tableInstance.columns.filter(c => c.isSortable).forEach(column => {
// //         const option = document.createElement("option");
// //         option.value = column.id;
// //         option.textContent = column.caption;
// //         sortColumnSelect.appendChild(option);
// //     });
// //
// //     const sortDirectionSelect = document.createElement("select");
// //     sortDirectionSelect.innerHTML = `
// //     <option value="asc">Ascending</option>
// //     <option value="desc">Descending</option>
// // `;
// //
// //     const applySortBtn = document.createElement("button");
// //     applySortBtn.textContent = "Apply Sort";
// //     applySortBtn.addEventListener("click", () => {
// //         if (!sortColumnSelect.value) return;
// //         tableInstance.queryParams.sort = `${sortColumnSelect.value} ${sortDirectionSelect.value}`;
// //         tableInstance.queryParams.page = 1;
// //         tableInstance.loadData();
// //     });
// //
// //     sortContainer.append(sortColumnSelect, sortDirectionSelect, applySortBtn);
// //     controlsContainer.appendChild(sortContainer);
// //
// //     // ---------- PAGINATION ----------
// //     const pagination = document.createElement("div");
// //     pagination.classList.add("pagination-controls");
// //
// //     const prevBtn = document.createElement("button");
// //     prevBtn.textContent = "Previous";
// //     const pageInfo = document.createElement("span");
// //     const nextBtn = document.createElement("button");
// //     nextBtn.textContent = "Next";
// //
// //     prevBtn.addEventListener("click", () => {
// //         if (tableInstance.queryParams.page > 1) {
// //             tableInstance.queryParams.page--;
// //             tableInstance.loadData();
// //         }
// //     });
// //
// //     nextBtn.addEventListener("click", () => {
// //         const maxPage = Math.ceil(tableInstance.totalCount / tableInstance.queryParams.pageSize);
// //         if (tableInstance.queryParams.page < maxPage) {
// //             tableInstance.queryParams.page++;
// //             tableInstance.loadData();
// //         }
// //     });
// //
// //     pagination.append(prevBtn, pageInfo, nextBtn);
// //     controlsContainer.appendChild(pagination);
// //
// //     tableInstance.pageInfo = pageInfo;
// //     tableInstance.prevBtn = prevBtn;
// //     tableInstance.nextBtn = nextBtn;
// //
// //     tableInstance.tableElement.parentNode.insertBefore(controlsContainer, tableInstance.tableElement);
// // }
// //Pass the dataFn
// class ReusableTableFromApi{
//     constructor(tableId,fetchDataFn,tableConfig) {
//         this.tableElement = document.getElementById(tableId)
//         this.columns = tableConfig.columns;
//         this.fetchDataFn = fetchDataFn;
//
//         // State for query params
//         this.queryParams ={
//             filter: {},
//             sort: null,
//             page: 1,
//             pageSize: 5,
//         };
//
//         this.totalCount = 0;
//         this.data = [];
//
//         renderTableControls(this);
//
//         //Load data
//         this.loadData();
//     }
//     async loadData() {
//         try{
//             const {data, totalCount} = await this.fetchDataFn(this.queryParams);
//             this.data = data;
//             this.totalCount = totalCount;
//             this.renderTable();
//
//             //Pagination
//             if (this.pageInfo) {
//                 const maxPage = Math.ceil(this.totalCount / this.queryParams.pageSize);
//                 this.pageInfo.textContent = `Page ${this.queryParams.page} of ${maxPage}`;
//             }
//
//             if (this.prevBtn) {
//                 this.prevBtn.disabled = this.queryParams.page === 1;
//             }
//             if (this.nextBtn) {
//                 const maxPage = Math.ceil(this.totalCount / this.queryParams.pageSize);
//                 this.nextBtn.disabled = this.queryParams.page >= maxPage;
//             }
//         } catch(error) {
//             console.error("Error fetching data:", error);
//         }
//     }
//
//     renderTable(){
//         // Null check for tableId
//         if(!this.tableElement){
//             //Maybe a toast message for the user here
//             console.error("No table element found");
//         }
//
//         this.tableElement.innerHTML = "";
//
//         //Create header
//         const thead =document.createElement("thead");
//         const headerRow = document.createElement("tr");
//
//
//         this.columns.forEach(column => {
//             if(!column.hide){
//                 const th = document.createElement("th");
//                 th.textContent = column.caption;
//                 headerRow.appendChild(th);
//             }
//         });
//
//         thead.appendChild(headerRow);
//         this.tableElement.appendChild(thead);
//
//
//         // Create body
//         const tbody=document.createElement("tbody");
//         this.data.forEach((row) => {
//             const tableRow = document.createElement("tr");
//
//             this.columns.forEach(column => {
//                 if(!column.hide){
//                     const td = document.createElement("td");
//
//                     if(column.render){
//                         td.innerHTML = column.render(row);
//                         console.log(row)
//                     } else{
//                         const key = column.id ?? column.field;
//                         td.textContent = row[key] ?? "-";
//                     }
//
//                     //Render active selected action
//                     if(column.onRendered){
//                         column.onRendered(td,row)
//                     }
//
//                     // The event handlers
//                     if (column.events) {
//                         Object.entries(column.events).forEach(([selector, handler]) => {
//                             td.querySelectorAll(selector).forEach(element => {
//                                 element.addEventListener("click", (event) => handler(row, event));
//                             });
//                         });
//                     }
//                     tableRow.appendChild(td);
//                 }
//             });
//             tbody.appendChild(tableRow);
//         });
//
//         this.tableElement.appendChild(tbody);
//     }
// }
//
// // Should take the tableId, table configuration
// // Pass it here
// // const table = new ReusableTable("table1", data1, table1Config);
// // const table1 = new ReusableTable("table2", data2, table2Config);
// // const table2 = new ReusableTable("table3", submissions, table3Config);
// // const table3 = new ReusableTable("table4", tickets, table4Config);
// const peopleTable = new ReusableTableFromApi(
//     "peopleTable", fetchPeopleFromApi, peopleTableConfig);
//
//