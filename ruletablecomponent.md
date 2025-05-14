# **Rules Table Component Documentation**

## **Overview**

The **Security Rules Table** is an advanced React component tailored for managing and visualizing security rules within a SOC (Security Operations Center) interface. Built atop a generic `NewTable` component, it offers robust functionality including dynamic filtering, powerful sorting, bulk operations, custom rendering, and responsive design.

This component supports advanced use cases such as:

* Security rule auditing
* Threat investigation
* Rule lifecycle management

---

## **Component Configuration**

### **Table Configuration Props**

| Prop             | Type      | Description                           | Example                  |
| ---------------- | --------- | ------------------------------------- | ------------------------ |
| `title`          | `string`  | Title of the table                    | `"Security Rules"`       |
| `url`            | `string`  | Backend API endpoint                  | `"/rules/get-rule-list"` |
| `filters`        | `object`  | Structured filter configuration       | See **Filters** section  |
| `rows`           | `array`   | Array of formatted row data           | -                        |
| `actions`        | `array`   | Row-level actions                     | Edit, View Details       |
| `hasCheckbox`    | `boolean` | Enable row selection for bulk actions | `true`                   |
| `refreshTable`   | `boolean` | Controls refresh state                | -                        |
| `totalPages`     | `number`  | Pagination pages                      | `10`                     |
| `totalDocuments` | `number`  | Total row count                       | `100`                    |

---

## **Filter System**

### **Two-Level Filtering Interface**

#### **Row 1 Filters (Primary)**

| Filter            | Type           | Description                                         |
| ----------------- | -------------- | --------------------------------------------------- |
| **Search**        | `text`         | Global full-text search                             |
| **Category**      | `multi-select` | Fetched dynamically from API                        |
| **Last Response** | `multi-select` | Status indicators: `Succeeded`, `Warning`, `Failed` |
| **Rule Type**     | `tabs`         | Filter by `All`, `NIDS`, `HIDS`                     |
| **Status**        | `tabs`         | Filter by `All`, `Enabled`, `Disabled`              |

#### **Row 2 Filters (Secondary)**

| Filter           | Type       | Description                       |
| ---------------- | ---------- | --------------------------------- |
| **Date Range**   | `date`     | From - To date selector           |
| **Bulk Actions** | `dropdown` | `Enable`, `Disable` selected rows |
| **Export**       | `button`   | Export current view data          |

---

## **Extended Filtering & Sorting System**

Beyond the default table filters, the system supports advanced filter types and custom sorters for extensibility which the user can add for further development:

### **Standard Filter Types**

| Filter Type           | Key      | Options                                     |
| --------------------- | -------- | ------------------------------------------- |
| Text Search           | `text`   | `placeholder`, `searchFields`, `debounceMs` |
| Select / Multi-Select | `select` | `options`, `isMulti`, `isClearable`         |
| Date Range            | `date`   | `minDate`, `maxDate`, `format`              |
| Toggle                | `toggle` | `onLabel`, `offLabel`                       |
| Slider                | `range`  | `min`, `max`, `step`, `marks`               |

### **Security-Specific Filters**

| Filter        | Key      | Details                          |
| ------------- | -------- | -------------------------------- |
| MITRE ATT\&CK | `mitre`  | Filter by tactics and techniques |
| IOC Match     | `ioc`    | Match IPs, domains, hashes       |
| Threat Level  | `threat` | Filter based on threat severity  |
| Log Source    | `logsrc` | Source system hierarchy          |

### **Sorting System**

| Sort Type    | Description                | Notes                          |
| ------------ | -------------------------- | ------------------------------ |
| Column Sort  | Sort by table columns      | `sortable: true`               |
| Multi-Sort   | Combine up to 3 fields     | `maxSortFields: 3`             |
| Custom Logic | External sorting functions | Via `sortFn: (a, b) => number` |

#### **Example Custom Sorter**

```javascript
const severitySorter = {
  id: 'severity',
  label: 'By Threat Level',
  compare: (a, b) => {
    const levels = { critical: 3, high: 2, medium: 1, low: 0 };
    return levels[b.severity] - levels[a.severity];
  }
};
```

---

## **Column Specifications**

| Column            | Key            | Description                     | Custom Rendering |
| ----------------- | -------------- | ------------------------------- | ---------------- |
| **ID**            | `sid`          | Hidden primary key              | -                |
| **Rule**          | `message`      | Clickable + tooltip + tag count | ✅                |
| **Rule Type**     | `type`         | Detection method                | -                |
| **Category**      | `file_name`    | Source or classification        | -                |
| **Severity**      | `severity`     | Color-coded                     | Dot indicator    |
| **Last Response** | `lastResponse` | Status feedback                 | Dot indicator    |
| **Last Update**   | `lastUpdated`  | Last modified timestamp         | -                |
| **Enabled**       | `status`       | Interactive toggle              | `ToggleSwitch`   |

---

## **Interactive UI Elements**

### **Rule Name Link**

* Navigates to detailed view
* Displays tags count with tooltip

```jsx
<span onClick={toggleTagTooltip}>
  {RuleTableIcons.TAGS} {item.tags?.length}
</span>
{showTooltip && (
  <Tooltip content={
    item.tags.map(tag => <span key={tag}>{tag}</span>)
  }/>
)}
```

### **Status Toggle**

```jsx
<ToggleSwitch
  enabled={item.status === "Enabled"}
  onChange={toggleRuleStatus}
/>
```

---

## **Bulk Operations**

| Action               | Description                |
| -------------------- | -------------------------- |
| **Enable Selected**  | Activates multiple rules   |
| **Disable Selected** | Deactivates selected rules |

```jsx
handleBulkAction({
  action: "Enable", // or "Disable"
  selectedRow: [1, 2, 3],
  refreshTable: refreshCallback
});
```

---

## **Data Formatting & Example**

```js
{
  ID: { key: "sid", value: 123 },
  Rule: { key: "rule", value: <InteractiveRuleNameComponent /> },
  "Rule Type": { key: "type", value: "NIDS" },
  // ...
}
```

### **Severity Display Example**

```jsx
<div className="flex items-center">
  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
    severity === "Major" ? "bg-orange-400" :
    severity === "Minor" ? "bg-yellow-400" : "bg-green-400"
  }`} />
  <span>{severity}</span>
</div>
```

---

## **Extensibility & Custom Filters**

### **Add a Custom Filter**

```typescript
interface CustomFilter {
  id: string;
  render: (props: FilterProps) => ReactNode;
  apply: (value: any, record: any) => boolean;
}
```

```javascript
const regexFilter = {
  id: 'regex',
  render: ({ value, onChange }) => (
    <input 
      type="text" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter regex pattern"
    />
  ),
  apply: (pattern, record) => 
    new RegExp(pattern).test(record.message)
};
```

---

## **Responsiveness & Accessibility**

### **Responsive Behavior**

* Truncated rule text with tooltips
* Mobile-friendly filter layout
* Adaptive column widths

### **Accessibility Features**

* Keyboard navigable elements
* ARIA roles on filters and buttons
* Color contrast compliant badges
* Screen reader support for toggles

---

## **Performance Optimization**

| Technique                       | Benefit                               |
| ------------------------------- | ------------------------------------- |
| Debouncing                      | Limits text input rerenders           |
| Memoization                     | Avoids re-rendering unchanged filters |
| Virtualization (`react-window`) | Handles large datasets                |
| Web Workers                     | Offloads compute-heavy sort/filter    |

---

## **Example Configuration Snippet**

```jsx
const tableConfig = {
  title: "Security Rules",
  url: "/api/rules",
  filters: {
    row1: [...],
    row2: [...]
  },
  rows: formattedData,
  actions: [{
    icon: EditIcon,
    label: "Edit",
    onClick: (rule) => navigateToEdit(rule.id)
  }],
  customElements: {
    filters: [regexFilter],
    sorters: [severitySorter]
  }
};

<NewTable tableConfig={tableConfig} />;
```

---

## **Best Practices**

* **Group filters by priority** (basic vs advanced)
* **Preserve filter/sort state via URL or context**
* **Show active filter indicators**
* **Cap multi-sort fields to 3**
* **Optimize custom logic for sort/apply**

---

## **Troubleshooting**

| Issue                   | Solution                                 |
| ----------------------- | ---------------------------------------- |
| Filters not applying    | Check `apply` logic in custom filters    |
| Missing sort arrows     | Ensure `sortable: true` in column config |
| Laggy UI                | Apply virtualization and debounce logic  |
| State resets on refresh | Use persistent keys or context           |

---

This documentation provides a comprehensive foundation for working with the Security Rules Table, giving your development and security teams the flexibility to tailor the component to varied operational, investigative, and compliance workflows.
