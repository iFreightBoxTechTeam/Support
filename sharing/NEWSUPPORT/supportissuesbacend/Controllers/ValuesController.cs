using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Http;
using WebApplication1.Models;
using WebApplication2.Models;
using System.Linq;

namespace WebApplication2.Controllers
{
    public class ValuesController : ApiController
    {

        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString);
        [HttpGet]
        [Route("api/values/")]
        public IHttpActionResult Get(string searchTerm = "", int pageNumber = 1, int pageSize = 10)
        {
            List<issuestable> list = new List<issuestable>();

            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString))
                using (SqlCommand cmd = new SqlCommand("sp_Getissues", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@SearchTerm", searchTerm ?? "");
                    cmd.Parameters.AddWithValue("@PageNumber", pageNumber);
                    cmd.Parameters.AddWithValue("@PageSize", pageSize);

                    con.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new issuestable
                            {
                                issues_id = Guid.Parse(reader["issues_id"].ToString()),
                                Description = reader["descriptions"].ToString(),
                                ImagePaths = reader["imagepaths"] != DBNull.Value
                                    ? reader["imagepaths"].ToString().Split(',').ToList()
                                    : new List<string>(),
                                StatusName = reader["statusname"].ToString(),
                                Name = reader["name"].ToString(),
                                TenantCode = reader["tenantcode"].ToString(),
                                LogTime = Convert.ToDateTime(reader["Raised_date"]),
                                UserId = Convert.ToInt32(reader["userid"]),
                                Module = reader["module"] != DBNull.Value ? reader["module"].ToString() : null,
                                AssignTo = reader["assign_to"] != DBNull.Value ? reader["assign_to"].ToString() : null,
                                ResolveDate = reader["resolve_date"] != DBNull.Value ? (DateTime?)reader["resolve_date"] : null,
                                TakenTime = reader["taken_time"] != DBNull.Value ? Convert.ToInt32(reader["taken_time"]) : (int?)null
                            });
                        }
                    }
                }

                return Ok(list);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/values/users")]
      
        public IEnumerable<User> Getalluser()
        {
            var usertype = new List<User>();

            using (var cmd = new SqlCommand("GetUser", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        usertype.Add(new User
                        {
                            issuesid = Convert.ToInt32(reader["issuesid"]),
                            Name = reader["name"].ToString(),
                            Email = reader["email"].ToString(),
                            Mobile_number = reader["mobile_number"].ToString(),
                            Addresh = reader["addresh"].ToString(),

                        });
                    }
                }
            }

            return usertype;
        }

        [HttpGet]
        [Route("api/values/u/{UserId}")]
        public IHttpActionResult GetissuesByUserId(int UserId)
        {
            List<issuestable> masters = new List<issuestable>();
            SqlCommand cmd = new SqlCommand("sp_Getbyuserid", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserId", UserId);

            try
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    masters.Add(new issuestable
                    {
                        issues_id = Guid.Parse(reader["issues_id"].ToString()),
                        Description = reader["descriptions"].ToString(),
                        ImagePaths = reader["imagepaths"] != DBNull.Value
                            ? reader["imagepaths"].ToString().Split(',').ToList()
                            : new List<string>(),
                        StatusName = reader["statusname"].ToString(),
                        Name = reader["name"].ToString(),
                        TenantCode = reader["tenantcode"].ToString(),
                        LogTime = Convert.ToDateTime(reader["Raised_date"]),
                        UserId = Convert.ToInt32(reader["UserId"]),
                        Module = reader["module"] != DBNull.Value ? reader["module"].ToString() : null,

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
                    Id = Guid.Parse(reader["issues_id"].ToString()),
                    StatusId = reader["statusid"] != DBNull.Value ? Guid.Parse(reader["statusid"].ToString()) : Guid.Empty,
                    StatusName = reader["statusname"].ToString(),
                    issues_id = Guid.Parse(reader["issuesissues_id"].ToString()),
                    Name = reader["issues_name"].ToString(),
                    LogTime = Convert.ToDateTime(reader["logtime"])
                });
            }
            con.Close();
            return logs;
        }

        [HttpGet]
        [Route("api/values/{issues_id}")]
        public IHttpActionResult GetStatusLogsByissuesissues_id(Guid issuesissues_id)
        {
            List<StatusLog> logs = new List<StatusLog>();
            SqlCommand cmd = new SqlCommand("sp_GetStatusLogByissuesissues_id", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@issuesissues_id", issuesissues_id);

            try
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    logs.Add(new StatusLog
                    {
                        Id = Guid.Parse(reader["issues_id"].ToString()),
                        StatusId = Guid.Parse(reader["statusissues_id"].ToString()),
                        StatusName = reader["statusname"].ToString(),
                        issues_id = Guid.Parse(reader["issuesissues_id"].ToString()),
                        Name = reader["issues_name"].ToString(),
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
        [Route("api/values/issues_id/{issues_id}")]
        public IHttpActionResult GetissuesByissues_id(Guid issues_id)
        {
            issuestable master = null;
            SqlCommand cmd = new SqlCommand("GetissuesByissues_id", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@issues_id", issues_id);

            try
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    master = new issuestable
                    {

                        Description = reader["descriptions"].ToString(),
                        ImagePaths = reader["imagepath"] != DBNull.Value
                            ? reader["imagepath"].ToString().Split(',').ToList()
                            : new List<string>(),
                        StatusName = reader["statusname"].ToString(),
                        Name = reader["name"].ToString(),
                        TenantCode = reader["tenantcode"].ToString(),
                        LogTime = Convert.ToDateTime(reader["Raised_date"]),
                        UserId = Convert.ToInt32(reader["UserId"]),
                        Module = reader["module"] != DBNull.Value ? reader["module"].ToString() : null,

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
        [HttpGet]
        [Route("api/values/user/{issues_id}")]
       
        public IHttpActionResult GetuserByissues_id(int issuesid)
        {
            User master = null;
            SqlCommand cmd = new SqlCommand("GetUser", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@issuesid", issuesid);

            try
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    master = new User
                    {
                        Name = reader["name"].ToString(),
                        Email = reader["email"].ToString(),
                        Mobile_number = reader["mobile_number"].ToString(),
                        Addresh = reader["addresh"].ToString(),


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
        [Route("api/values/users")]
        public IHttpActionResult RegisterUser([FromBody] User user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Name) || string.IsNullOrWhiteSpace(user.Email) )
            {
                return BadRequest("Invalissues_id user data provissues_ided.");
            }

            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString))
                using (SqlCommand cmd = new SqlCommand("InsertUser", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@name", user.Name);
                    cmd.Parameters.AddWithValue("@email", user.Email);
                    cmd.Parameters.AddWithValue("@addresh", user.Addresh);
                    cmd.Parameters.AddWithValue("@mobile_number", user.Mobile_number);
                  

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
        public IHttpActionResult Post(issuestable issuestable)
        {
            if (issuestable == null)
                return BadRequest("Invalissues_id input");

            if (string.IsNullOrWhiteSpace(issuestable.StatusName))
                issuestable.StatusName = "Pending";

            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString))
                {
                    con.Open();
                    SqlTransaction transaction = con.BeginTransaction();

                    try
                    {
                        // Insert into issues
                        SqlCommand cmd = new SqlCommand("sp_Insertisssues", con, transaction);
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Description", issuestable.Description);
                        string imagePathCsv = string.Join(",", issuestable.ImagePaths ?? new List<string>());
                        cmd.Parameters.AddWithValue("@ImagePaths", imagePathCsv);
                        
                        cmd.Parameters.AddWithValue("@Name", issuestable.Name);
                        cmd.Parameters.AddWithValue("@TenantCode", issuestable.TenantCode);
                        cmd.Parameters.AddWithValue("@UserId", issuestable.UserId);
                        cmd.Parameters.AddWithValue("@Module", issuestable.Module );
                                                                                                     




                        Guid issuesissues_id;

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                issuesissues_id = reader.GetGuid(0); // Get the returned issuesissues_id
                            }
                            else
                            {
                                throw new Exception("Failed to retrieve issuesissues_id.");
                            }
                        }

                        // Insert into statuslog
                        SqlCommand logCmd = new SqlCommand("sp_InsertStatusLogs", con, transaction);
                        logCmd.CommandType = CommandType.StoredProcedure;
                        logCmd.Parameters.AddWithValue("@StatusName", issuestable.StatusName);
            logCmd.Parameters.AddWithValue("@issuesTableid", issuesissues_id); // ✅ this is the GUID returned from your insert


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
    [Route("api/values/{UserId}")]
    public IHttpActionResult Put(int UserId, [FromBody] issuestable issuestable)
    {
      if (issuestable == null)
        return BadRequest("Invalid input data.");

      if (string.IsNullOrWhiteSpace(issuestable.StatusName))
        return BadRequest("Status name is required.");

      try
      {
        using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString))
        {
          con.Open();
          SqlTransaction transaction = con.BeginTransaction();

          try
          {
            // Step 1: Get statusid from status name
            Guid statusId;
            using (SqlCommand statusCmd = new SqlCommand("SELECT TOP 1 statusid FROM sttabble WHERE LOWER(statusname) = LOWER(@StatusName)", con, transaction))
            {
              statusCmd.Parameters.AddWithValue("@StatusName", issuestable.StatusName);
              object result = statusCmd.ExecuteScalar();

              if (result == null)
              {
                // If status not found, create a new one
                statusId = Guid.NewGuid();
                using (SqlCommand insertStatusCmd = new SqlCommand("INSERT INTO sttabble (statusid, statusname) VALUES (@Id, @Name)", con, transaction))
                {
                  insertStatusCmd.Parameters.AddWithValue("@Id", statusId);
                  insertStatusCmd.Parameters.AddWithValue("@Name", issuestable.StatusName);
                  insertStatusCmd.ExecuteNonQuery();
                }
              }
              else
              {
                statusId = (Guid)result;
              }
            }

            // Step 2: Update the issues using your new SP
            using (SqlCommand cmd = new SqlCommand("sp_UpdateissuestableByUserId", con, transaction))
            {
              cmd.CommandType = CommandType.StoredProcedure;
              cmd.Parameters.AddWithValue("@userid", UserId);
              cmd.Parameters.AddWithValue("@statusName", issuestable.StatusName);

              string imagePathsCsv = (issuestable.ImagePaths != null && issuestable.ImagePaths.Any())
                  ? string.Join(",", issuestable.ImagePaths)
                  : string.Empty;
              cmd.Parameters.AddWithValue("@ImagePaths", imagePathsCsv);
              cmd.Parameters.AddWithValue("@assignto", (object)issuestable.AssignTo ?? DBNull.Value);

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
        public IHttpActionResult Searchissuess(string searchTerm = "", int page = 1, int pageSize = 10)
        {
            if (string.IsNullOrEmpty(searchTerm))
                searchTerm = "";

            List<issuestable> result = new List<issuestable>();
            int totalRecords = 0;

            using (SqlCommand cmd = new SqlCommand("sp_Getissuess", con))
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

                            result.Add(new issuestable
                            {
                                issues_id = Guid.Parse(reader["issues_id"].ToString()),
                                Name = reader["name"].ToString(),
                                Description = reader["descriptions"].ToString(),
                                TenantCode = reader["tenantcode"].ToString(),
                                LogTime = Convert.ToDateTime(reader["Raised_date"]),
                                UserId = Convert.ToInt32(reader["UserId"]),
                                StatusName = reader["statusname"].ToString(),
                                Module = reader["module"] != DBNull.Value ? reader["module"].ToString() : null,
                      
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

        [HttpDelete]
        [Route("api/values/{UserId}")]
        public IHttpActionResult Delete(int UserId)
        {
            if (UserId <= 0)
                return BadRequest("Invalissues_id user issues_id.");

            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand("sp_Deleteissues", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserId", UserId);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                            return Ok($"User data with UserId {UserId} deleted successfully.");
                        else
                            return NotFound();
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/values/view/{userid}")]
        public IHttpActionResult GetIssueHistory(int UserId)
        {
            

         
            using (SqlCommand cmd = new SqlCommand("sp_GetIssue ", con))
            {
                List<issuestable> history = new List<issuestable>();
   
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@userid", UserId);

                con.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        history.Add(new issuestable
                        {
                            LogTime = Convert.ToDateTime(reader["Raised_date"]),
                            StatusName = reader["statusname"].ToString(),
                            Name = reader["name"].ToString(),
                            
                        });
                    }
                }
                return Ok(history);
            }

            
        }
        [HttpDelete]
        [Route("api/values/users/{id}")]
        public IHttpActionResult DeleteUser(int UserId)
        {
            if (UserId <= 0)
                return BadRequest("Invalid user ID.");

            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("DeleteUserById", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserId", UserId);

                        con.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                            return Ok($"User with ID {UserId} deleted successfully.");
                        else
                            return NotFound();
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [HttpPut]
        [Route("api/values/users/{id}")]
        public IHttpActionResult UpdateUser(int id, [FromBody] User user)
        {
            if (user == null || id <= 0)
                return BadRequest("Invalid user data.");

            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("UpdateUser", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserId", id);
                        cmd.Parameters.AddWithValue("@Name", user.Name);
                        cmd.Parameters.AddWithValue("@Email", user.Email);
                        cmd.Parameters.AddWithValue("@Mobile_number", user.Mobile_number);
                        cmd.Parameters.AddWithValue("@Addresh", user.Addresh);

                        con.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                            return Ok("User updated successfully.");
                        else
                            return NotFound();
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


    }

}


