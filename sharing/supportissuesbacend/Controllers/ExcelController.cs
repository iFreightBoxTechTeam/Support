using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Web.Mvc;
using ClosedXML.Excel;

namespace WebApplication2.Controllers
{
    public class ExcelController : Controller
    {
        // Route to: /api/excel/export
        [HttpGet]
        [Route("api/excel/export")]
        public void ExportDataToExcel()
        {
            string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["webapi"].ConnectionString;

            using (SqlConnection conn = new SqlConnection(connectionString))
            using (SqlCommand cmd = new SqlCommand("sp_ExportMatableData", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                {
                    DataTable dt = new DataTable();
                    adapter.Fill(dt);

                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        wb.Worksheets.Add(dt, "Matables");

                        using (MemoryStream memoryStream = new MemoryStream())
                        {
                            wb.SaveAs(memoryStream);
                            memoryStream.Position = 0;

                            Response.Clear();
                            Response.Buffer = true;
                            Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                            Response.AddHeader("content-disposition", "attachment;filename=MatableExport.xlsx");

                            memoryStream.WriteTo(Response.OutputStream);
                            Response.Flush();
                            Response.End();
                        }
                    }
                }
            }
        }
    }
}
