using support_webapi.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace support_webapi.Controllers
{
    public class ValuesController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString);


        // GET api/values
        [HttpGet]
        [Route("api/values")]
        public IHttpActionResult GetAllIssues()
        {
            List<IssueInsertRequest> issues = new List<IssueInsertRequest>();

            try
            {



                using (SqlCommand cmd = new SqlCommand("sp_GetAllIssues", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            issues.Add(new IssueInsertRequest
                            {
                                IssueId = reader["issue_id"].ToString(),
                                Users = reader["users"].ToString(),
                                RaisedDate = Convert.ToDateTime(reader["raised_date"]),
                                StatusName = reader["statusname"].ToString(),
                                AssignTo = reader["assign_to"].ToString(),
                                Description = reader["description"].ToString(),
                                Module = reader["module"].ToString(),
                                ImagePaths = reader["imagepaths"].ToString()
                            });
                        }
                    }
                }

                return Ok(issues);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        // GET api/values/5
        [HttpGet]
        [Route("api/values/{issueId}")]
        public IHttpActionResult GetIssueById(string issueId)
        {
            if (string.IsNullOrWhiteSpace(issueId))
                return BadRequest("IssueId is required.");

            IssueInsertRequest issue = null;

            try
            {

                using (SqlCommand cmd = new SqlCommand("sp_GetIssueById", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IssueId", issueId);

                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            issue = new IssueInsertRequest
                            {
                                IssueId = reader["issue_id"].ToString(),
                                Users = reader["users"].ToString(),
                                RaisedDate = Convert.ToDateTime(reader["raised_date"]),
                                StatusName = reader["statusname"].ToString(),
                                AssignTo = reader["assign_to"].ToString(),
                                Description = reader["description"].ToString(),
                                Module = reader["module"].ToString(),
                                ImagePaths = reader["imagepaths"].ToString()
                            };
                        }
                    }
                }

                if (issue == null)
                    return NotFound();

                return Ok(issue);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpPost]
        [Route("api/values")]
        public IHttpActionResult Post([FromBody] IssueInsertRequest request)
        {
            if (request == null)
                return BadRequest("Invalid data.");

            try
            {



                using (SqlCommand cmd = new SqlCommand("sp_InsertIssue", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Users", request.Users);

                    cmd.Parameters.AddWithValue("@Description", request.Description);
                    cmd.Parameters.AddWithValue("@Module", request.Module);

                    if (string.IsNullOrWhiteSpace(request.ImagePaths))
                        cmd.Parameters.AddWithValue("@ImagePaths", DBNull.Value);
                    else
                        cmd.Parameters.AddWithValue("@ImagePaths", request.ImagePaths);

                    conn.Open();
                    var issueId = cmd.ExecuteScalar();

                    return Ok(new { IssueId = issueId });
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        // PUT api/values/5
        // PUT api/values/{issueId}
        [HttpPut]
        [Route("api/values/{issueId}")]
        public IHttpActionResult Put(string issueId, [FromBody] IssueInsertRequest request)
        {
            if (string.IsNullOrWhiteSpace(issueId) || request == null)
                return BadRequest("Invalid input data.");

            try
            {
                using (SqlCommand cmd = new SqlCommand("sp_UpdateIssue", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@IssueId", issueId);
                    cmd.Parameters.AddWithValue("@Users", request.Users ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@RaisedDate", request.RaisedDate == DateTime.MinValue ? (object)DBNull.Value : request.RaisedDate);
                    cmd.Parameters.AddWithValue("@StatusName", request.StatusName ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@AssignTo", request.AssignTo ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@Description", request.Description ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@Module", request.Module ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@ImagePaths", string.IsNullOrWhiteSpace(request.ImagePaths) ? (object)DBNull.Value : request.ImagePaths);

                    conn.Open();
                    cmd.ExecuteNonQuery();
                }

                return Ok("Issue updated successfully.");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
        }



        [HttpDelete]
        [Route("api/values/{issueId}")]
        public IHttpActionResult Delete(string issueId)
        {
            if (string.IsNullOrWhiteSpace(issueId))
                return BadRequest("IssueId is required.");

            try
            {
                using (SqlCommand cmd = new SqlCommand("sp_DeleteIssue", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IssueId", issueId);

                    conn.Open();
                    int rowsAffected = cmd.ExecuteNonQuery();

                    
                }
                return Ok("Issue deleted  successfully.");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);

            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }
        }

    }
}