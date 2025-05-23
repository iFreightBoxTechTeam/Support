using System.Web.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Web;
using System.Web.UI;
using ClosedXML.Excel;

namespace WebApplication2.Controllers
{
    public class ExcelController : Controller
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ExportDataToExcel();
        }


        [HttpGet]
        [Route("api/excel/export")]
        private void ExportDataToExcel()
        {
            string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["webapi"].ConnectionString;
            ;

            using (SqlConnection conn = new SqlConnection(connectionString))
            using (SqlCommand cmd = new SqlCommand("sp_ExportMatableData", conn))
            using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                DataTable dt = new DataTable();
                adapter.Fill(dt);

                using (XLWorkbook wb = new XLWorkbook())
                {
                    wb.Worksheets.Add(dt, "Matables");

                    Response.Clear();
                    Response.Buffer = true;
                    Response.Charset = "";
                    Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    Response.AddHeader("content-disposition", "attachment;filename=MatableExport.xlsx");

                    using (MemoryStream MyMemoryStream = new MemoryStream())
                    {
                        wb.SaveAs(MyMemoryStream);
                        MyMemoryStream.WriteTo(Response.OutputStream);
                        Response.Flush();
                        Response.End();
                    }
                }
            }
        }
    }
}