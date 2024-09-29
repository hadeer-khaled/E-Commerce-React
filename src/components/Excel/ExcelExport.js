import React from "react";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

const ExcelExport = ({ data, fileName }) => {
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Define Header Row
    const header = Object.keys(data[0]);
    worksheet.addRow(header);

    // Apply Header Styles
    header.forEach((headerText, index) => {
      const cell = worksheet.getRow(1).getCell(index + 1);
      cell.font = {
        bold: true,
        color: { argb: "FFFFFFFF" },
        name: "Arial",
        size: 14,
      };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4F81BD" }, 
      };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.border = {
        top: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
    });

    // Add Data Rows
    data.forEach((item) => {
      const row = worksheet.addRow(Object.values(item));
      // Apply styles to each cell in the row
      row.eachCell((cell, colNumber) => {
        cell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        if (typeof cell.value === "number") {
          cell.numFmt = "0.00"; // Two decimal places
        }
      });
    });

    // Adjust Column Widths
    worksheet.columns.forEach((column) => {
      column.width = 20; // Set all columns to a width of 20
    });

    // Generate Buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Create Blob and Save
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <button onClick={exportToExcel} className="btn btn-info">
      Export to Excel
    </button>
  );
};

export default ExcelExport;

// import React from "react";
// import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";

// const ExcelExport = ({ data, fileName }) => {
//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });
//     const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(blob, `${fileName}.xlsx`);
//   };

//   return (
//     <button onClick={exportToExcel} className="btn btn-info">
//       Export to Excel
//     </button>
//   );
// };

// export default ExcelExport;
