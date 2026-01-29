# RVTools Combiner 🚀

**RVTools Combiner** is a professional, web-based utility built on **Google Apps Script**. It automates the tedious process of merging multiple RVTools CSV exports into a single, organized Google Sheets master workbook with a modern, high-performance interface.



## 🌟 Key Features

* **Automated Batch Processing**: Point the tool at any Google Drive folder, and it automatically scans for and processes all compatible CSV files. 
* **Smart Tab Cleaning**: Automatically strips `RVTools_tab` and `.csv` extensions from filenames to create clean, readable Sheet tabs (truncated to 50 characters for compatibility). 
* **Live Progress Tracking**: Features a real-time progress bar and a "terminal-style" activity log that identifies each file during the import process. 
* **Built-in Usage Analytics**: A persistent dashboard tracks lifetime activity while respecting privacy: 
    * **Lifetime Runs**: Total consolidation jobs completed.
    * **Unique Users**: Privacy-first tracking using MD5-hashed user identities. 
    * **Files Merged**: Total count of all CSV files processed across the tool's lifetime. 
* **Modern UI/UX**: A clean, green-themed interface with a built-in shortcut to browse Google Drive for folder URLs. 

---

## ⚙️ How It Works

The application follows a three-step asynchronous architecture to prevent browser timeouts and ensure data integrity:

1.  **Initialization**: The script validates the folder URL, scans for CSV files, and creates a fresh Google Spreadsheet in your root directory.  It also records usage metrics by hashing the current user's email into a unique key. 
2.  **Sequential Processing**: To handle large datasets without hitting execution limits, the UI sends files to the server one by one. The server parses the CSV data and injects it into a dedicated tab within the target spreadsheet. 
3.  **Finalization**: Once all files are imported, the script removes the default "Sheet1," cleans up the workbook structure, and updates the global lifetime file counter. 

---

## ⚠️ Known Limitations

* **Execution Time**: Google Apps Script has a 30-minute maximum execution limit per request. While this tool uses sequential processing to bypass this, extremely large individual CSV files (tens of thousands of rows) may still encounter limits.
* **File Size**: The `Utilities.parseCsv` method and Google Sheets have a cell limit (currently 10 million cells per spreadsheet).
* **Permissions**: Users must grant the tool permission to access their Drive and Spreadsheet files during the first run.
* **CSV Format**: The tool is specifically optimized for standard RVTools CSV exports; non-standard CSV delimiters may require code adjustments.

---

## 🛠️ Setup & Deployment

1.  **Create Project**: Visit [script.google.com](https://script.google.com) and create a new project.
2.  **Add Files**:
    * Copy `RVTools Combiner.gs` into the script editor.
    * Create an HTML file named `Index.html` and paste the UI code.
3.  **Enable Services**: Ensure the **Drive API (v3)** and **Sheets API (v4)** are enabled in the "Services" section of your Apps Script project. 
4.  **Deploy**: Click **Deploy** > **New Deployment** > **Web App**. Set "Execute as" to **User accessing the web app** and access to **Anyone within your domain**. 

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
