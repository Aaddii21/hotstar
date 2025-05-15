# **Simple Guide to Creating a Table Component**  

This guide will help you understand how to create a **custom table component** (`NewTable`) in React, even if you're just starting out.  

---

## **1. What Does This Table Component Do?**  
This table displays a list of **security rules** with the following features:  
✅ **Search & Filtering** – Find rules by name, category, status, etc.  
✅ **Bulk Actions** – Enable/Disable multiple rules at once.  
✅ **Toggle Switches** – Quickly enable/disable individual rules.  
✅ **Export Data** – Download the table data.  
✅ **Responsive Design** – Works on all screen sizes.  

---

## **2. How Does the Code Work? (Step-by-Step Flow)**  

### **Step 1: Setting Up the Table**  
The `Home` component uses `NewTable` and configures it using `tableConfig`.  

### **Step 2: Defining Table Data & Filters**  
The `formatTableData` function prepares:  
- **Filters** (search bar, dropdowns, date picker, bulk actions).  
- **Rows** (how each rule is displayed).  
- **Actions** (like Edit button).  

### **Step 3: Handling User Interactions**  
- **Bulk Actions** (`handleBulkAction`) – Enable/Disable multiple rules.  
- **Toggle Switch** (`toggleRule`) – Enable/Disable a single rule.  
- **Edit Button** – Opens a details page for a rule.  

### **Step 4: Displaying the Table**  
Finally, the `NewTable` component is rendered with the `tableConfig`.  

---

## **3. How to Customize the Table for Your Needs**  

### **A. Changing the Data Source**  
- Modify the `url` in `tableConfig` to fetch your own API data.  
```javascript
url: "https://your-api.com/get-data",
```

### **B. Adding/Removing Filters**  
The table has **two filter rows**:  
1. **First Row** – Search, dropdowns, tabs.  
2. **Second Row** – Date picker, bulk actions, export button.  

**Example: Adding a New Dropdown Filter**  
```javascript
{
  type: "select",
  options: ["High", "Medium", "Low"],
  label: "Priority",
  name: "priority",
}
```

### **C. Customizing Table Rows**  
Each row can display:  
- **Simple text**  
- **Custom components** (like toggle switches, icons, tooltips)  

**Example: Adding a Custom Badge**  
```javascript
Status: {
  value: (
    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
      Active
    </span>
  ),
},
```

### **D. Adding Actions (Buttons)**  
You can add buttons like **Edit, Delete, View**.  

**Example: Adding a Delete Button**  
```javascript
actions: [
  {
    icon: ICON.DELETE,
    label: "Delete",
    onClick: (rule) => deleteRule(rule.id),
  },
],
```

---

## **4. Key Props & Configurations**  

| **Prop** | **Description** | **Example** |
|----------|----------------|-------------|
| `title` | Table title | `title: "User List"` |
| `url` | API endpoint for data | `url: "/api/users"` |
| `filters` | Search, dropdowns, etc. | (See filter examples above) |
| `rows` | How each row is displayed | `rows: data.map(...)` |
| `actions` | Buttons for each row | `actions: [{ icon: ICON.EDIT, ... }]` |
| `hasCheckbox` | Enable row selection | `hasCheckbox: true` |

---

## **5. Full Example: Creating a Simple Table**  

### **A. Basic Table Setup**  
```javascript
import React from "react";
import NewTable from "./components/NewTable";

const MyTable = () => {
  const tableConfig = {
    title: "User List",
    url: "/api/users",
    rows: [
      {
        Name: { value: "John Doe" },
        Email: { value: "john@example.com" },
      },
      {
        Name: { value: "Jane Smith" },
        Email: { value: "jane@example.com" },
      },
    ],
  };

  return <NewTable tableConfig={tableConfig} />;
};

export default MyTable;
```

### **B. Adding Filters & Actions**  
```javascript
const tableConfig = {
  title: "User List",
  url: "/api/users",
  filters: {
    row1: {
      data: [
        { type: "search", placeholder: "Search users..." },
        { type: "select", options: ["Admin", "User"], label: "Role" },
      ],
    },
  },
  actions: [
    {
      icon: ICON.EDIT,
      label: "Edit",
      onClick: (user) => editUser(user.id),
    },
  ],
};
```

---

## **6. Troubleshooting**  

❌ **Table not loading?**  
- Check if the `url` is correct.  
- Ensure the API returns data in the expected format.  

❌ **Filters not working?**  
- Verify that `name` in filters matches the API query parameters.  

❌ **Buttons not responding?**  
- Make sure `onClick` is properly defined.  

---

## **Conclusion**  
This table component is **flexible and easy to customize**. You can:  
✔ Change the data source.  
✔ Add/remove filters.  
✔ Modify how rows are displayed.  
✔ Add new actions (Edit, Delete, etc.).  

Start by copying the **basic example** and gradually add more features! 🚀  

**Need help?**  
👉 Try modifying the code step by step.  
👉 Check the console for errors.  
👉 Refer to this guide for configuration options.  

Happy coding! 😊
