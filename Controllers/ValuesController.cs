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

        [HttpGet]
        [Route("api/values/")]
        public IEnumerable<MasterTable> Get()
        {
            List<MasterTable> list = new List<MasterTable>();
            SqlCommand cmd = new SqlCommand("sp_GetMatables", con);
            cmd.CommandType = CommandType.StoredProcedure;

            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                list.Add(new MasterTable
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
                    UserId = Convert.ToInt32(reader["userid"]),
                    Module = reader["module"] != DBNull.Value ? reader["module"].ToString() : null,
                    IssueDescription = reader["issue_description"] != DBNull.Value ? reader["issue_description"].ToString() : null,
                    AssignTo = reader["assign_to"] != DBNull.Value ? reader["assign_to"].ToString() : null,
                    ResolveDate = reader["resolve_date"] != DBNull.Value ? (DateTime?)reader["resolve_date"] : null,
                    TakenTime = reader["taken_time"] != DBNull.Value ? Convert.ToInt32(reader["taken_time"]) : (int?)null,



                });
            }
            con.Close();
            return list;
        }

        [HttpGet]
        [Route("api/values/u/{userid}")]
        public IHttpActionResult GetMatableByUserId(int userid)
        {
            List<MasterTable> masters = new List<MasterTable>();
            SqlCommand cmd = new SqlCommand("sp_GetMatableByCustomerId", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@userid", userid);

            try
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    masters.Add(new MasterTable
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
                        UserId = Convert.ToInt32(reader["userid"]),
                        Module = reader["module"] != DBNull.Value ? reader["module"].ToString() : null,
                        IssueDescription = reader["issue_description"] != DBNull.Value ? reader["issue_description"].ToString() : null,
                        AssignTo = reader["assign_to"] != DBNull.Value ? reader["assign_to"].ToString() : null,
                        ResolveDate = reader["resolve_date"] != DBNull.Value ? (DateTime?)reader["resolve_date"] : null,
                         TakenTime = reader["taken_time"] != DBNull.Value ? Convert.ToInt32(reader["taken_time"]) : (int?)null,
                    });
                }
                con.Close();

                if (!masters.Any())
                    return NotFound();

                return Ok(masters);
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
                        ImagePaths = reader["imagepath"] != DBNull.Value
                            ? reader["imagepath"].ToString().Split(',').ToList()
                            : new List<string>(),
                        StatusName = reader["statusname"].ToString(),
                        Name = reader["name"].ToString(),
                        TenantCode = reader["tenantcode"].ToString(),
                        LogTime = Convert.ToDateTime(reader["createat"]),
                        UserId = Convert.ToInt32(reader["userid"]),
                        Module = reader["module"] != DBNull.Value ? reader["module"].ToString() : null,
                        IssueDescription = reader["issue_description"] != DBNull.Value ? reader["issue_description"].ToString() : null,
                        AssignTo = reader["assign_to"] != DBNull.Value ? reader["assign_to"].ToString() : null,
                        ResolveDate = reader["resolve_date"] != DBNull.Value ? (DateTime?)Convert.ToDateTime(reader["resolve_date"]) : null
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
                        cmd.Parameters.AddWithValue("@UserId", masterTable.UserId);
                        cmd.Parameters.AddWithValue("@Module", masterTable.Module);
                        cmd.Parameters.AddWithValue("@IssueDescription", masterTable.IssueDescription);
                        cmd.Parameters.AddWithValue("@AssignTo", masterTable.AssignTo);
                        cmd.Parameters.AddWithValue("@ResolveDate", (object)masterTable.ResolveDate ?? DBNull.Value);


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
                        // Step 1: Get matableId using userid
                        Guid matableId;
                        using (SqlCommand getIdCmd = new SqlCommand("SELECT TOP 1 id FROM matable WHERE userid = @userid", con, transaction))
                        {
                            getIdCmd.Parameters.AddWithValue("@userid", userid);
                            object result = getIdCmd.ExecuteScalar();

                            if (result == null)
                                return NotFound(); // No record found for this userid

                            matableId = (Guid)result;
                        }

                        // Step 2: Call stored procedure to update matable
                        using (SqlCommand cmd = new SqlCommand("sp_UpdateMatable", con, transaction))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;

                            cmd.Parameters.AddWithValue("@MatableId", matableId);
                            cmd.Parameters.AddWithValue("@Description", (object)masterTable.Description ?? DBNull.Value);

                            // Convert ImagePaths list to comma-separated string or empty string
                            string imagePathsCsv = (masterTable.ImagePaths != null && masterTable.ImagePaths.Any())
                                ? string.Join(",", masterTable.ImagePaths)
                                : string.Empty;

                            cmd.Parameters.AddWithValue("@ImagePaths", imagePathsCsv);
                            cmd.Parameters.AddWithValue("@Name", (object)masterTable.Name ?? DBNull.Value);
                            cmd.Parameters.AddWithValue("@TenantCode", (object)masterTable.TenantCode ?? DBNull.Value);
                            cmd.Parameters.AddWithValue("@userid", userid);
                            cmd.Parameters.AddWithValue("@Module", (object)masterTable.Module ?? DBNull.Value);
                            cmd.Parameters.AddWithValue("@IssueDescription", (object)masterTable.IssueDescription ?? DBNull.Value);
                            cmd.Parameters.AddWithValue("@AssignTo", (object)masterTable.AssignTo ?? DBNull.Value);
                            cmd.Parameters.AddWithValue("@StatusName", (object)masterTable.StatusName ?? DBNull.Value);

                            cmd.ExecuteNonQuery();
                        }

                        transaction.Commit();
                        return Ok("Record updated successfully.");
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
        [Route("api/values/search")]
        public IHttpActionResult SearchMatables(string searchTerm = "", int page = 1, int pageSize = 10)
        {
            if (string.IsNullOrEmpty(searchTerm))
                searchTerm = "";

            List<MasterTable> result = new List<MasterTable>();
            int totalRecords = 0;

            using (SqlCommand cmd = new SqlCommand("sp_GetMatables", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@SearchTerm", searchTerm);
                cmd.Parameters.AddWithValue("@PageNumber", page);
                cmd.Parameters.AddWithValue("@PageSize", pageSize);

                try
                {
                    con.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            // Safe method to check column existence
                            int? takenTime = null;
                            if (HasColumn(reader, "taken_time") && reader["taken_time"] != DBNull.Value)
                            {
                                takenTime = Convert.ToInt32(reader["taken_time"]);
                            }

                            var imagePathsString = reader["imagepaths"]?.ToString() ?? "";
                            var imagePathsList = imagePathsString
                                .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                                .ToList();

                            result.Add(new MasterTable
                            {
                                Id = Guid.Parse(reader["id"].ToString()),
                                Name = reader["name"].ToString(),
                                Description = reader["descriptions"].ToString(),
                                TenantCode = reader["tenantcode"].ToString(),
                                LogTime = Convert.ToDateTime(reader["createat"]),
                                UserId = Convert.ToInt32(reader["userid"]),
                                StatusName = reader["statusname"].ToString(),
                                Module = reader["module"] != DBNull.Value ? reader["module"].ToString() : null,
                                IssueDescription = reader["issue_description"] != DBNull.Value ? reader["issue_description"].ToString() : null,
                                AssignTo = reader["assign_to"] != DBNull.Value ? reader["assign_to"].ToString() : null,
                                ResolveDate = reader["resolve_date"] != DBNull.Value ? (DateTime?)Convert.ToDateTime(reader["resolve_date"]) : null,
                                TakenTime = takenTime,
                                ImagePaths = imagePathsList
                            });
                        }

                        // Read total count from second result set
                        if (reader.NextResult() && reader.Read())
                        {
                            totalRecords = reader.GetInt32(0);
                        }
                    }

                    return Ok(new
                    {
                        TotalRecords = totalRecords,
                        Page = page,
                        PageSize = pageSize,
                        Data = result
                    });
                }
                catch (Exception ex)
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

        // Helper method to check column existence
        private bool HasColumn(SqlDataReader reader, string columnName)
        {
            for (int i = 0; i < reader.FieldCount; i++)
            {
                if (reader.GetName(i).Equals(columnName, StringComparison.InvariantCultureIgnoreCase))
                    return true;
            }
            return false;
        }
    }   
    }


