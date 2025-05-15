# **Complete Guide to Building a Custom Table Component in React**  
*(For Beginners & Intermediate Developers)*  

---

## **1. Introduction**  
This guide explains how to create a **fully customizable table component** (`NewTable`) in React with:  
✅ **Searching & Filtering** (Text, Dropdowns, Date Range)  
✅ **Sorting** (Ascending/Descending on columns)  
✅ **Bulk Actions** (Enable/Disable multiple rows)  
✅ **Row Actions** (Edit, Delete buttons)  
✅ **Export Data** (Download as CSV/Excel)  

Perfect for displaying data like user lists, product inventories, or (in our example) security rules.

---

## **2. Core Features Breakdown**  

### **A. Table Structure**
```javascript
const tableConfig = {
  title: "Rules Table",      // Table header
  url: "/api/rules",         // Data source
  hasCheckbox: true,         // Enable row selection
  sorting: true,             // Enable column sorting
  // ...other configurations
};
```

### **B. Available Filter Types**
| Filter Type | Purpose | Example |
|-------------|---------|---------|
| **Search** | Text search across columns | `{ type: "search", placeholder: "Search..." }` |
| **Dropdown** | Single/multi-select filter | `{ type: "select", options: ["Active", "Inactive"] }` |
| **Tabs** | Category switcher | `{ type: "tab", options: [{id: "all", label: "All"}] }` |
| **Date Range** | Filter by date | `{ type: "datePicker", names: ["startDate", "endDate"] }` |
| **Bulk Actions** | Mass update rows | `{ type: "bulk", options: ["Delete", "Archive"] }` |
| **Export** | Download data | `{ type: "export", exportUrl: "/api/export" }` |

### **C. Sorting Implementation**
1. Enable sorting in config:
   ```javascript
   sorting: true,
   sortableColumns: ["Name", "Date", "Status"],
   ```
2. API should handle:
   ```
   /api/data?sortBy=name&sortOrder=asc
   ```
3. Columns become clickable with ▲/▼ indicators.

---

## **3. Step-by-Step Setup**  

### **Step 1: Basic Table**
```javascript
const SimpleTable = () => {
  const tableConfig = {
    title: "Users",
    url: "/api/users",
    rows: users.map(user => ({
      Name: { value: user.name },
      Email: { value: user.email }
    }))
  };

  return <NewTable tableConfig={tableConfig} />;
};
```

### **Step 2: Adding Filters**
```javascript
filters: {
  row1: {
    data: [
      { type: "search", placeholder: "Find users..." },
      { type: "select", options: ["Admin", "User"], label: "Role" }
    ]
  },
  row2: {
    data: [
      { type: "datePicker", names: ["from", "to"] }
    ]
  }
}
```

### **Step 3: Implementing Sorting**
```javascript
const tableConfig = {
  // ...other configs
  sorting: true,
  rows: data.map(item => ({
    Name: { 
      value: item.name,
      sortKey: "name"  // API parameter
    },
    Date: {
      value: item.date,
      sortKey: "created_at"
    }
  }))
};
```

### **Step 4: Adding Actions**
```javascript
actions: [
  {
    icon: ICON.EDIT,
    label: "Edit",
    onClick: (item) => navigate(`/edit/${item.id}`)
  },
  {
    icon: ICON.DELETE,
    label: "Delete",
    onClick: (item) => deleteItem(item.id)
  }
]
```

---

## **4. Advanced Customization**  

### **Custom Cell Rendering**
```javascript
Status: {
  value: (
    <span className={`badge ${item.active ? 'bg-green-500' : 'bg-red-500'}`}>
      {item.active ? "Active" : "Inactive"}
    </span>
  )
}
```

### **Bulk Action Handler**
```javascript
const handleBulkAction = ({ action, selectedRows }) => {
  if (action === "Delete") {
    await api.deleteMany(selectedRows);
  }
};

// In config:
{ type: "bulk", options: ["Delete", "Archive"], onChange: handleBulkAction }
```

---

## **5. Complete Example**
```javascript
const AdvancedTable = () => {
  const tableConfig = {
    title: "Employee Directory",
    url: "/api/employees",
    sorting: true,
    sortableColumns: ["Name", "Hire Date"],
    
    filters: {
      row1: [
        { type: "search", placeholder: "Search employees..." },
        { type: "select", options: ["Full-time", "Part-time"], label: "Type" }
      ],
      row2: [
        { type: "datePicker", names: ["hiredAfter", "hiredBefore"] }
      ]
    },
    
    rows: employees.map(emp => ({
      Name: { value: emp.name, sortKey: "full_name" },
      "Hire Date": { value: emp.hire_date, sortKey: "hire_date" },
      Department: { value: emp.dept }
    })),
    
    actions: [
      {
        icon: ICON.EDIT,
        label: "Edit",
        onClick: (emp) => editEmployee(emp.id)
      }
    ]
  };

  return <NewTable tableConfig={tableConfig} />;
};
```

---

## **6. Best Practices**  
✔ **Performance**: Use `React.memo` for custom cell components  
✔ **API Design**: Ensure your backend supports:  
   - Filter parameters (`?status=active`)  
   - Sorting (`?sortBy=name&order=desc`)  
   - Pagination (`?page=2&limit=20`)  
✔ **User Experience**:  
   - Add loading states  
   - Implement error handling  
   - Provide filter reset options  

---

## **7. Troubleshooting Guide**  

| Issue | Solution |
|-------|----------|
| Filters not working | Check if `name` matches API parameters |
| Sorting not responding | Verify `sorting: true` and `sortKey` in columns |
| Bulk actions failing | Confirm selectedRows are properly passed |
| Slow performance | Implement pagination/debounce search |

---

## **8. Conclusion**  
You now have a complete blueprint for building feature-rich tables with:  
🔹 **Multiple filter types**  
🔹 **Column sorting**  
🔹 **Bulk operations**  
🔹 **Customizable appearance**  

Start with the basic example and gradually add features as needed. Happy coding! 🚀  

**Pro Tip**: Clone this example on CodeSandbox: [link]
