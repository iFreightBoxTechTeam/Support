using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication1.Models;
using WebApplication2.Models;
using System.Linq;
using System.Net;
using System.Net.Http;

using System.IO;
using ClosedXML.Excel;
using System.Net.Http.Headers;

namespace WebApplication2.Controllers
{
    public class ValuesController : ApiController
    {
            
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString);

        // GET api/values
        [HttpGet]
        [Route("api/values/")]
        public IEnumerable<MasterTable> Get()
        {
            List<MasterTable> list = new List<MasterTable>();
            SqlCommand cmd = new SqlCommand("sp_GetAllMatables", con);
            cmd.CommandType = CommandType.StoredProcedure;

            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                list.Add(new MasterTable

                {
                    Id = Guid.Parse(reader["id"].ToString()),
                    Description = reader["descriptions"].ToString(),
                    ImagePaths = reader["imagepaths"].ToString().Split(',').ToList(),
                    StatusName = reader["statusname"].ToString(),
                    Name = reader["name"].ToString(),
                    TenantCode = reader["tenantcode"].ToString(),
                    LogTime = Convert.ToDateTime(reader["createat"]),
                    UserId = Convert.ToInt32(reader["userid"])
                });
            }
            con.Close();
            return list;
        }




        [HttpGet]
        [Route("api/values/u/{userid}")]
        public IHttpActionResult GetMatableByUserId(int userid)
        {
            MasterTable master = null;
            SqlCommand cmd = new SqlCommand("sp_GetMatableByCustomerId", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@userid", userid);

            try
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    master = new MasterTable
                    {
                        Id = Guid.Parse(reader["id"].ToString()),
                        Description = reader["descriptions"].ToString(),
                        ImagePaths = reader["imagepaths"] != DBNull.Value
             ? reader["imagepaths"].ToString().Split(',').ToList()
             : new List<string>(),
                        StatusName = reader["statusname"].ToString(),
                        Name = reader["name"].ToString(),
                        TenantCode = reader["tenantcode"].ToString(),
                        LogTime = Convert.ToDateTime(reader["createat"]),
                        UserId = Convert.ToInt32(reader["userid"])
                    };
                }
                con.Close();

                if (master == null)
                    return NotFound();

                return Ok(master);
            }
            catch (Exception ex)
            {
                if (con.State == ConnectionState.Open)
                    con.Close();

                return InternalServerError(ex);
            }
        }


        [HttpGet]
        [Route("api/values/logs")]
        public IEnumerable<StatusLog> GetStatusLogs()
        {
            List<StatusLog> logs = new List<StatusLog>();
            SqlCommand cmd = new SqlCommand("sp_GetAllStatusLogs", con);
            cmd.CommandType = CommandType.StoredProcedure;

            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                logs.Add(new StatusLog
                {
                    Id = Guid.Parse(reader["id"].ToString()),
                    StatusId = reader["statusid"] != DBNull.Value ? Guid.Parse(reader["statusid"].ToString()) : Guid.Empty,
                    StatusName = reader["statusname"].ToString(),
                    MatableId = Guid.Parse(reader["matableid"].ToString()),
                    MatableName = reader["matable_name"].ToString(),
                    LogTime = Convert.ToDateTime(reader["logtime"])

                });
            }
            con.Close();
            return logs;
        }






        [HttpGet]
        [Route("api/values/{matableid}")]
        public IHttpActionResult GetStatusLogsByMatableId(Guid matableid)
        {
            List<StatusLog> logs = new List<StatusLog>();
            SqlCommand cmd = new SqlCommand("sp_GetStatusLogByMatableId", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@MatableId", matableid);

            try
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    logs.Add(new StatusLog
                    {
                        Id = Guid.Parse(reader["id"].ToString()),
                        StatusId = Guid.Parse(reader["statusid"].ToString()),
                        StatusName = reader["statusname"].ToString(),
                        MatableId = Guid.Parse(reader["matableid"].ToString()),
                        MatableName = reader["matable_name"].ToString(),
                        LogTime = Convert.ToDateTime(reader["logtime"])
                    });
                }
                con.Close();

                return Ok(logs);
            }
            catch (Exception ex)
            {
                if (con.State == ConnectionState.Open)
                    con.Close();

                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/values/id/{id}")]
        public IHttpActionResult GetMatableById(Guid id)
        {
            MasterTable master = null;
            SqlCommand cmd = new SqlCommand("GetMaTableById", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Id", id);

            try
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    master = new MasterTable
                    {
                        Id = Guid.Parse(reader["id"].ToString()),
                        Description = reader["descriptions"].ToString(),
                        ImagePaths = reader["imagepaths"].ToString().Split(',').ToList(),
                        StatusName = reader["statusname"].ToString(),
                        Name = reader["name"].ToString(),
                        TenantCode = reader["tenantcode"].ToString(),
                        LogTime = Convert.ToDateTime(reader["createat"]),
                        UserId = Convert.ToInt32(reader["userid"])
                    };
                }
                con.Close();

                if (master == null)
                    return NotFound();

                return Ok(master);
            }
            catch (Exception ex)
            {
                if (con.State == ConnectionState.Open)
                    con.Close();

                return InternalServerError(ex);
            }
        }
        [HttpPost]
        [Route("api/values/register")]
        public IHttpActionResult RegisterUser([FromBody] User user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Name) || string.IsNullOrWhiteSpace(user.Email) || string.IsNullOrWhiteSpace(user.PasswordHash))
            {
                return BadRequest("Invalid user data provided.");
            }

            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString))
                using (SqlCommand cmd = new SqlCommand("InsertUser", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@name", user.Name);
                    cmd.Parameters.AddWithValue("@email", user.Email);
                    cmd.Parameters.AddWithValue("@password_hash", user.PasswordHash); // assume already hashed

                    con.Open();
                    cmd.ExecuteNonQuery();
                }

                return Ok("User registered successfully.");
            }
            catch (SqlException ex)
            {
                // SQL Server RAISERROR with severity 16 and error number 50000 triggers this
                if (ex.Number == 50000)
                {
                    return BadRequest(ex.Message);
                }

                // Other SQL exceptions
                return InternalServerError(ex);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }



        // POST api/values
        [HttpPost]
        [Route("api/values/")]
        public IHttpActionResult Post(MasterTable masterTable)
        {
            if (masterTable == null)
                return BadRequest("Invalid input");

            if (string.IsNullOrWhiteSpace(masterTable.StatusName))
                masterTable.StatusName = "Pending";

            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString))
                {
                    con.Open();
                    SqlTransaction transaction = con.BeginTransaction();

                    try
                    {
                        // Insert into matable
                        SqlCommand cmd = new SqlCommand("sp_InsertMatable", con, transaction);
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Description", masterTable.Description);
                        string imagePathCsv = string.Join(",", masterTable.ImagePaths ?? new List<string>());
                        cmd.Parameters.AddWithValue("@ImagePaths", imagePathCsv);

                        cmd.Parameters.AddWithValue("@Name", masterTable.Name);
                        cmd.Parameters.AddWithValue("@TenantCode", masterTable.TenantCode);
                        cmd.Parameters.AddWithValue("@userid", masterTable.UserId);

                        Guid matableId;

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                matableId = reader.GetGuid(0); // Get the returned MatableId
                            }
                            else
                            {
                                throw new Exception("Failed to retrieve MatableId.");
                            }
                        }

                        // Insert into statuslog
                        SqlCommand logCmd = new SqlCommand("sp_InsertStatusLog", con, transaction);
                        logCmd.CommandType = CommandType.StoredProcedure;
                        logCmd.Parameters.AddWithValue("@StatusName", masterTable.StatusName);
                        logCmd.Parameters.AddWithValue("@MatableId", matableId);
                        logCmd.ExecuteNonQuery();

                        transaction.Commit();
                        return Ok("Data inserted and status logged successfully.");
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return InternalServerError(ex);
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }



        // PUT api/values/{userid}
        [HttpPut]
        [Route("api/values/{userid}")]
        public IHttpActionResult Put(int userid, [FromBody] MasterTable masterTable)
        {
            if (masterTable == null)
                return BadRequest("Invalid input data.");

            if (string.IsNullOrWhiteSpace(masterTable.StatusName))
                return BadRequest("Status name is required.");

            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString))
                {
                    con.Open();
                    SqlTransaction transaction = con.BeginTransaction();

                    try
                    {
                        // 🔹 First, get the actual matable.id using userid
                        Guid matableId;
                        using (SqlCommand getIdCmd = new SqlCommand("SELECT TOP 1 id FROM matable WHERE userid = @userid", con, transaction))
                        {
                            getIdCmd.Parameters.AddWithValue("@userid", userid);
                            object result = getIdCmd.ExecuteScalar();

                            if (result == null)
                                return NotFound(); // No record found for this userid

                            matableId = (Guid)result;
                        }

                        // 🔹 Update matable
                        using (SqlCommand cmd = new SqlCommand("sp_UpdateMatable", con, transaction))
                        {

                            cmd.CommandType = CommandType.StoredProcedure;

                            cmd.Parameters.AddWithValue("@Description", masterTable.Description);
                            string imagePathCsv = string.Join(",", masterTable.ImagePaths ?? new List<string>());
                            cmd.Parameters.AddWithValue("@ImagePath", imagePathCsv);
                            cmd.Parameters.AddWithValue("@StatusName", masterTable.StatusName);
                            cmd.Parameters.AddWithValue("@Name", masterTable.Name);
                            cmd.Parameters.AddWithValue("@TenantCode", masterTable.TenantCode);
                            cmd.Parameters.AddWithValue("@userid", masterTable.UserId);



                            cmd.ExecuteNonQuery();
                        }

                        // 🔹 Log status change into statuslog
                        using (SqlCommand logCmd = new SqlCommand("sp_InsertStatusLog", con, transaction))
                        {
                            logCmd.CommandType = CommandType.StoredProcedure;
                            logCmd.Parameters.AddWithValue("@StatusName", masterTable.StatusName);
                            logCmd.Parameters.AddWithValue("@MatableId", matableId); // Now a real existing ID

                            logCmd.ExecuteNonQuery();
                        }

                        transaction.Commit();
                        return Ok("Record updated and status logged successfully.");
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return InternalServerError(ex);
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/export/excel")]
        public HttpResponseMessage ExportToExcel()
        {
            string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["webapi"].ConnectionString; // Replace with your actual connection string

            using (SqlConnection conn = new SqlConnection(connectionString))
            using (SqlCommand cmd = new SqlCommand("sp_ExportMatableData", conn))
            using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                DataTable dt = new DataTable();
                adapter.Fill(dt);

                using (XLWorkbook workbook = new XLWorkbook())
                {
                    workbook.Worksheets.Add(dt, "Matables");

                    using (MemoryStream stream = new MemoryStream())
                    {
                        workbook.SaveAs(stream);
                        stream.Position = 0;

                        HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK)
                        {
                            Content = new ByteArrayContent(stream.ToArray())
                        };
                        result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                        {
                            FileName = "MatableExport.xlsx"
                        };
                        result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                        return result;
                    }
                }
            }
        }
        [HttpGet]
        [Route("api/export/excellog")]
        public HttpResponseMessage ExportToExcellogs()
        {
            string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["webapi"].ConnectionString; // Replace with your actual connection string

            using (SqlConnection conn = new SqlConnection(connectionString))
            using (SqlCommand cmd = new SqlCommand("sp_GetAllStatusLogs", conn))
            using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                DataTable dt = new DataTable();
                adapter.Fill(dt);

                using (XLWorkbook workbook = new XLWorkbook())
                {
                    workbook.Worksheets.Add(dt, "statuslog");

                    using (MemoryStream stream = new MemoryStream())
                    {
                        workbook.SaveAs(stream);
                        stream.Position = 0;

                        HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK)
                        {
                            Content = new ByteArrayContent(stream.ToArray())
                        };
                        result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                        {
                            FileName = "statusExport.xlsx"
                        };
                        result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                        return result;
                    }
                }
            }
        }


        [HttpGet]
        [Route("api/values/userbyname")]
        public IHttpActionResult GetUserByName(string name)
        {
            List<User> users = new List<User>();
            SqlCommand cmd = new SqlCommand("GetUserByName", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@name", name);

            try
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    users.Add(new User
                    {
                        Id = Convert.ToInt32(reader["id"]),
                        Name = reader["name"].ToString(),
                        Email = reader["email"].ToString()
                    });
                }
                con.Close();

                if (!users.Any())
                    return NotFound();

                return Ok(users);
            }
            catch (Exception ex)
            {
                if (con.State == ConnectionState.Open)
                    con.Close();

                return InternalServerError(ex);
            }
        }


        [HttpGet]
        [Route("api/values/{matableid}/images")]
        public IHttpActionResult GetImagesByMatableId(Guid matableid)
    {
            List<string> images = new List<string>();
            SqlCommand cmd = new SqlCommand("SELECT imagepath FROM matable_images WHERE matableid = @id", con);
            cmd.Parameters.AddWithValue("@id", matableid);

            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                images.Add(reader["imagepath"].ToString());
            }
            con.Close();

            return Ok(images);
        }

        [HttpGet]
        [Route("api/values/search")]
        public IHttpActionResult SearchMatables(string searchTerm = "", int page = 1, int pageSize = 10)
        {
            List<MasterTable> result = new List<MasterTable>();
            int totalRecords = 0;

            SqlCommand cmd = new SqlCommand("sp_GetMatables", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@SearchTerm", searchTerm ?? string.Empty);
            cmd.Parameters.AddWithValue("@PageNumber", page);
            cmd.Parameters.AddWithValue("@PageSize", pageSize);

            try
            {
                con.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    // First result set: paged data
                    while (reader.Read())
                    {
                        result.Add(new MasterTable
                        {
                            Id = Guid.Parse(reader["id"].ToString()),
                            Name = reader["name"].ToString(),
                            Description = reader["descriptions"].ToString(),
                            TenantCode = reader["tenantcode"].ToString(),
                            LogTime = Convert.ToDateTime(reader["createat"]),
                            UserId = Convert.ToInt32(reader["userid"]),
                            StatusName = reader["statusname"].ToString(),
                            ImagePaths = reader["imagepaths"] != DBNull.Value
                                ? reader["imagepaths"].ToString().Split(',').ToList()
                                : new List<string>()
                        });
                    }

                    // Move to second result set: total count
                    if (reader.NextResult() && reader.Read())
                    {
                        totalRecords = reader.GetInt32(0);
                    }
                }
                con.Close();

                // Return combined data and total count
                var response = new
                {
                    TotalRecords = totalRecords,
                    Page = page,
                    PageSize = pageSize,
                    Data = result
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                if (con.State == ConnectionState.Open)
                    con.Close();

                return InternalServerError(ex);
            }
        }



        // DELETE api/values/{userid}
        [HttpDelete]
        [Route("api/values/{userid}")]
        public IHttpActionResult Delete(int userid)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("sp_DeleteMatable", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@userid", userid);

                con.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                con.Close();

                if (rowsAffected > 0)
                {
                    return Ok("Record deleted successfully.");
                }
                else
                {
                    return NotFound(); // Record not found for the given userid
                }
            }
            catch (SqlException ex)
            {
                return InternalServerError(ex);
            }
            finally
            {
                if (con.State == ConnectionState.Open)
                    con.Close();
            }
        }
    }
}
