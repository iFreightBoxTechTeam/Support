using API.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class ValuesController : ApiController
    {
        string connStr = ConfigurationManager.ConnectionStrings["webapi_conn"].ConnectionString;

        // GET api/values
        [HttpGet]
        [Route("api/Values")]
        public IHttpActionResult GetIssues()
        {
            List<Issues> issues = new List<Issues>();

            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlDataAdapter da = new SqlDataAdapter("GetIssuesWithStatus", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                DataTable dt = new DataTable();
                da.Fill(dt);

                foreach (DataRow row in dt.Rows)
                {
                    issues.Add(new Issues
                    {
                        Id = row["ID"] != DBNull.Value ? Convert.ToInt32(row["ID"]) : 0,
                        Title = row["Title"]?.ToString(),
                        Description = row["Description"]?.ToString(),
                        UserName = row["UserName"]?.ToString(),
                        TenantCode = row["TenantCode"]?.ToString(),
                        UserId = row["UserId"] != DBNull.Value ? Convert.ToInt32(row["UserId"]) : 0,
                        Module = row["Module"]?.ToString(),
                        Image = row["Image"]?.ToString(),
                        Status = row["Status"]?.ToString(),
                        AssignTo = row["AssignTo"]?.ToString(),
                    });
                }
            }

            return Ok(issues);
        }


        [HttpGet]
        [Route("api/Values/{id}")]
        // GET api/values/5
        public IHttpActionResult GetIssueById(int id)
        {
            Issues issue = null;

            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("GetIssueById", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);
                con.Open();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        issue = new Issues
                        {
                            Id = Convert.ToInt32(reader["ID"]),
                            Title = reader["Title"]?.ToString(),
                            Description = reader["Description"]?.ToString(),
                            UserName = reader["UserName"]?.ToString(),
                            TenantCode = reader["TenantCode"]?.ToString(),
                            UserId = reader["UserId"] != DBNull.Value ? Convert.ToInt32(reader["UserId"]) : 0,
                            Module = reader["Module"]?.ToString(),
                            Image = reader["Image"]?.ToString(),
                            Status = reader["Status"]?.ToString(),
                            AssignTo = reader["AssignTo"]?.ToString(),
                        };
                    }
                }
            }

            if (issue == null)
                return NotFound();

            return Ok(issue);
        }

        [HttpPost]
        [Route("api/Values")]
        // POST api/values
        public IHttpActionResult Post([FromBody] Issues issue)
        {
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("InsertIssue", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Title", issue.Title ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Description", issue.Description ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@UserName", issue.UserName ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@TenantCode", issue.TenantCode ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@UserId", issue.UserId);
                cmd.Parameters.AddWithValue("@Module", issue.Module ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Image", issue.Image ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Status", string.IsNullOrEmpty(issue.Status) ? "Pending" : issue.Status);
                cmd.Parameters.AddWithValue("@AssignTo", issue.AssignTo ?? (object)DBNull.Value);

                con.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Issue created successfully.");
        }

        [HttpPut]
        [Route("api/Values/{id}")]
        // PUT api/values/5
        public IHttpActionResult Put(int id, Issues issue)
        {
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("UpdateIssue", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", id);
                cmd.Parameters.AddWithValue("@Title", issue.Title ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Description", issue.Description ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@UserName", issue.UserName ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@TenantCode", issue.TenantCode ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@UserId", issue.UserId);
                cmd.Parameters.AddWithValue("@Module", issue.Module ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Image", issue.Image ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Status", issue.Status ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@AssignTo", issue.AssignTo ?? (object)DBNull.Value);

                con.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Issue updated successfully.");
        }

        [HttpDelete]
        [Route("api/Values/{id}")]
        // DELETE api/values/5
        public IHttpActionResult Delete(int id)
        {
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("DeleteIssue", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);
                con.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Issue deleted successfully.");
        }

        [HttpGet]
        [Route("api/Values/issues")]
        public IHttpActionResult GetIssuesByUserAndTenant(int? userId = null, string tenantCode = null)
        {
            List<Issues> issues = new List<Issues>();

            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("GetIssuesByUserAndTenant", con);
                cmd.CommandType = CommandType.StoredProcedure;

                if (userId.HasValue)
                    cmd.Parameters.AddWithValue("@UserId", userId.Value);
                else
                    cmd.Parameters.AddWithValue("@UserId", DBNull.Value);

                if (!string.IsNullOrEmpty(tenantCode))
                    cmd.Parameters.AddWithValue("@TenantCode", tenantCode);
                else
                    cmd.Parameters.AddWithValue("@TenantCode", DBNull.Value);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);

                foreach (DataRow row in dt.Rows)
                {
                    issues.Add(new Issues
                    {
                        Id = row["Id"] != DBNull.Value ? Convert.ToInt32(row["Id"]) : 0,
                        Title = row["Title"]?.ToString(),
                        Description = row["Description"]?.ToString(),
                        UserName = row["UserName"]?.ToString(),
                        TenantCode = row["TenantCode"]?.ToString(),
                        UserId = row["UserId"] != DBNull.Value ? Convert.ToInt32(row["UserId"]) : 0,
                        Module = row["Module"]?.ToString(),
                        Image = row["Image"]?.ToString(),
                        Status = row["Status"]?.ToString(),
                        AssignTo = row["AssignTo"]?.ToString(),
                    });
                }
            }

            return Ok(issues);
        }



        [HttpGet]
        [Route("api/Values/issues/byuserortenant")]
        public IHttpActionResult GetIssuesByUserOrTenantCode(int? userId = null, string tenantCode = null)

        {
            List<Issues> issues = new List<Issues>();

            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("GetIssuesByUserOrTenantCode", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UserId", (object)userId ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@TenantCode", (object)tenantCode ?? DBNull.Value);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);

                foreach (DataRow row in dt.Rows)
                {
                    issues.Add(new Issues
                    {
                        Id = row["Id"] != DBNull.Value ? Convert.ToInt32(row["Id"]) : 0,
                        Title = row["Title"]?.ToString(),
                        Description = row["Description"]?.ToString(),
                        UserName = row["UserName"]?.ToString(),
                        TenantCode = row["TenantCode"]?.ToString(),
                        UserId = row["UserId"] != DBNull.Value ? Convert.ToInt32(row["UserId"]) : 0,
                        Module = row["Module"]?.ToString(),
                        Image = row["Image"]?.ToString(),
                        Status = row["Status"]?.ToString(),
                        AssignTo = row["AssignTo"]?.ToString(),
                    });
                }
            }

            return Ok(issues);
        }


    }
}
