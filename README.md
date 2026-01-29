# RVTools Combiner 🚀

**RVTools Combiner** is a professional, web-based utility built on **Google Apps Script**. It automates the tedious process of merging multiple RVTools CSV exports into a single, organized Google Sheets master workbook with a modern, high-performance interface.



## 🌟 Key Features

* [cite_start]**Automated Batch Processing**: Point the tool at any Google Drive folder, and it automatically scans for and processes all compatible CSV files[cite: 3].
* [cite_start]**Smart Tab Cleaning**: Automatically strips `RVTools_tab` and `.csv` extensions from filenames to create clean, readable Sheet tabs (truncated to 50 characters for compatibility)[cite: 5].
* [cite_start]**Live Progress Tracking**: Features a real-time progress bar and a "terminal-style" activity log that identifies each file during the import process[cite: 41, 45].
* [cite_start]**Built-in Usage Analytics**: A persistent dashboard tracks lifetime activity while respecting privacy[cite: 39]:
    * [cite_start]**Lifetime Runs**: Total consolidation jobs completed[cite: 7].
    * [cite_start]**Unique Users**: Privacy-first tracking using MD5-hashed user identities[cite: 8].
    * [cite_start]**Files Merged**: Total count of all CSV files processed across the tool's lifetime[cite: 8].
* [cite_start]**Modern UI/UX**: A clean, green-themed interface with a built-in shortcut to browse Google Drive for folder URLs[cite: 11, 13, 38].

---

## ⚙️ How It Works

The application follows a three-step asynchronous architecture to prevent browser timeouts and ensure data integrity:

1.  [cite_start]**Initialization**: The script validates the folder URL, scans for CSV files, and creates a fresh Google Spreadsheet in your root directory[cite: 3, 4]. [cite_start]It also records usage metrics by hashing the current user's email into a unique key[cite: 8].
2.  [cite_start]**Sequential Processing**: To handle large datasets without hitting execution limits, the UI sends files to the server one by one[cite: 45]. [cite_start]The server parses the CSV data and injects it into a dedicated tab within the target spreadsheet[cite: 5].
3.  [cite_start]**Finalization**: Once all files are imported, the script removes the default "Sheet1," cleans up the workbook structure, and updates the global lifetime file counter[cite: 6, 46].

---

## ⚠️ Known Limitations

* **Execution Time**: Google Apps Script has a 6-minute maximum execution limit per request. While this tool uses sequential processing to bypass this, extremely large individual CSV files (tens of thousands of rows) may still encounter limits.
* **File Size**: The `Utilities.parseCsv` method and Google Sheets have a cell limit (currently 10 million cells per spreadsheet).
* **Permissions**: Users must grant the tool permission to access their Drive and Spreadsheet files during the first run.
* **CSV Format**: The tool is specifically optimized for standard RVTools CSV exports; non-standard CSV delimiters may require code adjustments.

---

## 🛠️ Setup & Deployment

1.  **Create Project**: Visit [script.google.com](https://script.google.com) and create a new project.
2.  **Add Files**:
    * Copy `Code.gs` into the script editor.
    * Create an HTML file named `Index.html` and paste the UI code.
3.  [cite_start]**Enable Services**: Ensure the **Drive API (v3)** and **Sheets API (v4)** are enabled in the "Services" section of your Apps Script project[cite: 1].
4.  **Deploy**: Click **Deploy** > **New Deployment** > **Web App**. [cite_start]Set "Execute as" to **User accessing the web app** and access to **Anyone within your domain**[cite: 2].

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
